"use client";

import React from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Coffee } from "lucide-react";

interface HeaderProps {
  onOpenModal: (
    productName: string,
    type: "subscription" | "single" | "question",
  ) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-sm">
            <Coffee size={20} />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight">
              Кварта
            </span>
            <p className="text-xs opacity-60">Мастерская обжарки • Минск</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-80">
          <a href="#about" className="hover:text-[var(--accent)] transition">
            О нас
          </a>
          <a href="#catalog" className="hover:text-[var(--accent)] transition">
            Зерно и подписка
          </a>
          <a href="#delivery" className="hover:text-[var(--accent)] transition">
            Доставка
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => onOpenModal("Консультация / Вопрос", "question")}
            className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--accent)] hover:text-white transition shadow-sm"
          >
            Связаться с нами
          </button>
        </div>
      </div>
    </header>
  );
};
