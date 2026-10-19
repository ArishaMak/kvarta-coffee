"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    try {
      // Отправляем лид (заказ) на бэкенд NestJS
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            items,
            totalPrice,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Не удалось отправить заказ");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        clearCart();
        setIsSubmitted(false);
        setIsCartOpen(false);
        setPhone("");
      }, 3000);
    } catch (error) {
      console.error("Ошибка оформления заказа:", error);
      alert("Не удалось отправить заказ. Убедитесь, что бэкенд запущен.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-primary)] border-l border-[var(--border-color)] shadow-2xl flex flex-col">
          {/* Шапка корзины */}
          <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-[var(--accent)]" size={24} />
              <h2 className="text-xl font-bold font-serif">Ваша Корзина</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-[var(--bg-secondary)] rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Содержимое */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2
                  size={64}
                  className="text-emerald-500 animate-bounce"
                />
                <h3 className="text-2xl font-bold font-serif">Заказ принят!</h3>
                <p className="text-sm opacity-70">
                  Мы уже связываемся с вами для подтверждения доставки по
                  Минску.
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-60">
                <ShoppingBag size={48} />
                <p>Ваша корзина пока пуста</p>
              </div>
            ) : (
              items.map((item: any) => (
                <div
                  key={`${item.id}-${item.grind}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-xs opacity-60">
                      {item.weight} • {item.grind}
                    </p>
                    <p className="text-sm font-semibold text-[var(--accent)]">
                      {item.price * item.quantity} BYN
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[var(--border-color)] rounded-lg bg-[var(--bg-primary)]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.grind, item.quantity - 1)
                        }
                        className="p-1.5 hover:text-[var(--accent)]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.grind, item.quantity + 1)
                        }
                        className="p-1.5 hover:text-[var(--accent)]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.grind)}
                      className="text-red-400 hover:text-red-600 p-1 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Подвал с оформлением */}
          {!isSubmitted && items.length > 0 && (
            <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Итого к оплате:</span>
                <span className="text-[var(--accent)]">{totalPrice} BYN</span>
              </div>

              <form onSubmit={handleCheckout} className="space-y-3">
                <input
                  type="tel"
                  required
                  placeholder="+375 (29) 000-00-00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent)] transition"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--accent)] text-white font-bold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20"
                >
                  Оформить заказ <ArrowRight size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
