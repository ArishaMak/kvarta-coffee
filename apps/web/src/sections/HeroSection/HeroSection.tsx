"use client";

import React, { useState } from "react";
import { Coffee, ArrowRight, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onOpenModal: (
    productName: string,
    type: "subscription" | "single" | "question",
  ) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden max-w-6xl mx-auto px-6 pt-16 pb-20 md:py-28 grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Мягкий световой пятно-эффект, следующий за мышкой */}
      <div
        className="pointer-events-none absolute -z-10 w-96 h-96 rounded-full bg-[var(--accent)]/15 blur-3xl transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePos.x - 192}px, ${mousePos.y - 192}px)`,
        }}
      />

      <div>
        <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
          <Sparkles size={14} /> Свежая обжарка каждый четверг
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.15] mb-6">
          Свежий кофе из Минска. У вас через 1–3 дня.
        </h1>
        <p className="text-lg opacity-80 mb-8 leading-relaxed">
          Маленькая мастерская Ани и Дмитрия. Обжариваем небольшими партиями по
          5 кг с 2019 года. Никаких складов и залежавшегося зерна — только
          чистый вкус.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#catalog"
            className="bg-[var(--accent)] text-white px-8 py-4 rounded-full font-medium text-center hover:opacity-90 transition shadow-md flex items-center justify-center gap-2"
          >
            Выбрать кофе <ArrowRight size={18} />
          </a>
          <button
            onClick={() => onOpenModal("Кофейная подписка", "subscription")}
            className="border-2 border-[var(--border-color)] px-8 py-4 rounded-full font-medium text-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
          >
            Оформить подписку
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="aspect-square rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-xl flex items-center justify-center p-8 backdrop-blur-sm">
          <div className="text-center">
            <Coffee
              size={80}
              className="mx-auto text-[var(--accent)] mb-4 animate-bounce"
            />
            <p className="text-2xl font-bold">1–3 дня</p>
            <p className="text-sm opacity-60 mt-1">от ростера до вашей чашки</p>
          </div>
        </div>
      </div>
    </section>
  );
};
