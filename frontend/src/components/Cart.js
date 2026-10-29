
import React from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";

function Cart({
  isOpen,
  onClose,
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  isPaying,
}) {
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70">
      <button
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        aria-label="Close cart"
      />

      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#090d0b] text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              Your Powers ⚡
            </p>
            <h2 className="mt-1 text-2xl font-black">YOUR CART</h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 hover:bg-white/10"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={48} className="text-emerald-400/60" />

            <h3 className="mt-5 text-xl font-bold">
              Your cart is empty
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your next collectible is waiting.
            </p>

            <button
              onClick={onClose}
              className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-black"
            >
              <ArrowLeft size={16} />
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id || item.name}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-white/5 p-2">
                    {item.image ? (
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : item.image.startsWith("/")
                              ? item.image
                              : `/images/${item.image}`
                        }
                        alt={item.name}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <ShoppingBag
                        size={28}
                        className="text-emerald-400/50"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-bold">
                      {item.name}
                    </h3>

                    <p className="mt-2 font-black text-emerald-400">
                      ₹{Number(item.price || 0).toLocaleString("en-IN")}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-lg border border-white/10 px-2 py-1">
                        <button
                          onClick={() => onDecrease(item)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-4 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => onIncrease(item)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Subtotal</span>

                <span className="text-2xl font-black text-emerald-400">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <ShieldCheck size={16} className="text-emerald-400" />
                Secure Razorpay Test Mode payment
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Test Mode only — no real money is charged.
              </p>

              <button
                onClick={onCheckout}
                disabled={isPaying || cartItems.length === 0}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 py-4 text-sm font-black text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPaying ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    PREPARING PAYMENT...
                  </>
                ) : (
                  "PAY SECURELY WITH RAZORPAY"
                )}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default Cart;
