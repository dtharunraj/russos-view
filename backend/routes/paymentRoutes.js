
const express = require("express");
const crypto = require("crypto");

const Razorpay = require("razorpay");
const Product = require("../models/Product");

const PaymentOrder = require("../models/PaymentOrder");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPaise = 0;
    const verifiedItems = [];

    for (const item of items) {
      const quantity = Number(item.quantity);
      const productId = item.productId;

      if (
        !productId ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return res.status(400).json({
          message: "Invalid cart item",
        });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const itemPaise = Math.round(Number(product.price) * 100);

      if (!Number.isSafeInteger(itemPaise) || itemPaise < 0) {
        return res.status(400).json({
          message: "Invalid product price",
        });
      }

      totalPaise += itemPaise * quantity;

      verifiedItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    if (
      !Number.isSafeInteger(totalPaise) ||
      totalPaise <= 0 ||
      totalPaise > 100000000
    ) {
      return res.status(400).json({
        message: "Invalid order amount",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: totalPaise,
      currency: "INR",
      receipt: `rv_${crypto.randomUUID().replace(/-/g, "").slice(0, 20)}`,
    });

    await PaymentOrder.create({
      razorpayOrderId: razorpayOrder.id,
      amount: totalPaise,
      currency: "INR",
      items: verifiedItems,
      status: "created",
    });

    return res.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Create order error:", error.message);
    return res.status(500).json({
      message: "Unable to create payment order",
    });
  }
});

// Verify payment signature on the server
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      typeof razorpay_order_id !== "string" ||
      typeof razorpay_payment_id !== "string" ||
      typeof razorpay_signature !== "string"
    ) {
      return res.status(400).json({
        message: "Missing payment verification details",
      });
    }

    // Find the order created by our backend
    const savedOrder = await PaymentOrder.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!savedOrder) {
      return res.status(400).json({
        message: "Order not found",
      });
    }

    if (savedOrder.status === "paid") {
      return res.status(409).json({
        message: "This order has already been verified",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${savedOrder.razorpayOrderId}|${razorpay_payment_id}`)
      .digest("hex");

    const signatureBuffer = Buffer.from(razorpay_signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (
      signatureBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
    ) {
      return res.status(400).json({
        message: "Payment signature verification failed",
      });
    }

    // Confirm payment details with Razorpay too
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.order_id !== savedOrder.razorpayOrderId ||
      payment.amount !== savedOrder.amount ||
      payment.currency !== savedOrder.currency ||
      !["authorized", "captured"].includes(payment.status)
    ) {
      return res.status(400).json({
        message: "Payment details do not match the order",
      });
    }

    savedOrder.paymentId = razorpay_payment_id;
    savedOrder.status = payment.status === "captured" ? "paid" : "authorized";
    await savedOrder.save();

    return res.json({
      success: true,
      status: savedOrder.status,
      message:
        savedOrder.status === "paid"
          ? "Payment verified successfully"
          : "Payment authorized; capture confirmation is still required",
    });
  } catch (error) {
    console.error("Payment verification error:", error.message);
    return res.status(500).json({
      message: "Unable to verify payment",
    });
  }
});

module.exports = router;
