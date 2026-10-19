"use client";

import React from "react";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, User, Coffee } from "lucide-react";

interface HeaderProps {
  onOpenModal?: (
    productName?: string,
    type?: "subscription" | "single" | "question",
  ) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-color)] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Логотип с зерном */}
        <div className="flex items-center gap-2 font-serif text-xl font-bold">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-md">
            <Coffee size={18} />
          </div>
          <span>Кварта</span>
        </div>

        {/* Навигация */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium opacity-80">
          <a href="#catalog" className="hover:text-[var(--accent)] transition">
            Каталог
          </a>
          <a href="#about" className="hover:text-[var(--accent)] transition">
            О мастерской
          </a>
          <a href="#delivery" className="hover:text-[var(--accent)] transition">
            Доставка
          </a>
        </nav>

        {/* Правая часть: Корзина и Кабинет */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent)] transition flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            <span className="text-xs font-semibold hidden sm:inline">
              Корзина
            </span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          <a
            href="/account"
            className="p-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--accent)] transition flex items-center gap-2 text-sm font-medium"
          >
            <User size={18} />
            <span className="hidden sm:inline">Кабинет</span>
          </a>
        </div>
      </div>
    </header>
  );
};
