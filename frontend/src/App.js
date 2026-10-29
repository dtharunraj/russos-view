
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import ProductSection from "./components/ProductSection";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const API_URL = "https://russos-view-api.onrender.com";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);

        setProducts(
          Array.isArray(response.data)
            ? response.data
            : response.data.products || []
        );
      } catch (error) {
        console.error("Unable to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addToCart = (product) => {
    setCartItems((items) => {
      const id = product._id || product.id;

      const existing = items.find(
        (item) => (item._id || item.id) === id
      );

      if (existing) {
        return items.map((item) =>
          (item._id || item.id) === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const increaseQuantity = (product) => {
    setCartItems((items) =>
      items.map((item) =>
        (item._id || item.id) === (product._id || product.id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCartItems((items) =>
      items
        .map((item) =>
          (item._id || item.id) === (product._id || product.id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (product) => {
    setCartItems((items) =>
      items.filter(
        (item) => (item._id || item.id) !== (product._id || product.id)
      )
    );
  };

  const handleCheckout = async () => {
    if (isPaying || cartItems.length === 0) return;

    setIsPaying(true);

    try {
      // Load Razorpay's official checkout script.
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error(
          "Razorpay could not load. Check your internet connection and try again."
        );
      }

      // Send product IDs and quantities only.
      // The backend calculates the trusted amount using MongoDB prices.
      const orderResponse = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          items: cartItems.map((item) => ({
            productId: item._id || item.id,
            quantity: item.quantity,
          })),
        }
      );

      const order = orderResponse.data;

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Russo's View",
        description: "Marvel Collectibles",
        order_id: order.orderId,

        handler: async (paymentResponse) => {
          try {
            // Verify payment signature on our backend.
            const verifyResponse = await axios.post(
              `${API_URL}/api/payment/verify`,
              {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }
            );

            if (
              verifyResponse.data.success &&
              verifyResponse.data.status === "paid"
            ) {
              alert("Payment verified successfully! Thank you for your order.");

              setCartItems([]);
              setIsCartOpen(false);
            } else {
              alert(
                "Payment was verified, but it is not yet captured. Check the Razorpay payment status before treating the order as paid."
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);

            alert(
              error.response?.data?.message ||
              "We could not verify the payment. Please check the payment status before retrying."
            );
          } finally {
            setIsPaying(false);
          }
        },

        modal: {
          ondismiss: () => {
            setIsPaying(false);
          },
        },

        theme: {
          color: "#34d399",
        },
      };

      const paymentWindow = new window.Razorpay(options);

      paymentWindow.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);

        alert(
          response.error?.description ||
          "Test payment failed. Please try again."
        );

        setIsPaying(false);
      });

      paymentWindow.open();
    } catch (error) {
      console.error("Unable to start payment:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Unable to start payment. Please try again."
      );

      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050706]">
      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <ProductSection
        products={products}
        loading={loading}
        search={search}
        selectedCategory={selectedCategory}
        onAddToCart={addToCart}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        isPaying={isPaying}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
