"use client";

import React from "react";
import { ShieldCheck, Clock, MapPin } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-[var(--bg-secondary)]/50 py-20 border-y border-[var(--border-color)]"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Почему свежесть важнее всего
        </h2>
        <p className="text-lg opacity-80 leading-relaxed mb-8">
          Мы — Аня и Дмитрий, бывшие бариста. Мы открыли «Кварту», чтобы варить
          и пить по-настоящему живой кофе. Обжарка по 5 кг позволяет
          контролировать каждый грамм. Зерно попадает к вам на пике своего
          вкуса, сохраняя всю палитру аромата.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)]">
            <ShieldCheck className="text-[var(--accent)] mb-3" size={28} />
            <h3 className="font-bold text-lg mb-2">Микро-партии по 5 кг</h3>
            <p className="text-sm opacity-70">
              Никаких промышленных масштабов. Только ручной контроль обжарщика.
            </p>
          </div>
          <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)]">
            <Clock className="text-[var(--accent)] mb-3" size={28} />
            <h3 className="font-bold text-lg mb-2">Обжарка по четвергам</h3>
            <p className="text-sm opacity-70">
              В пятницу свежее зерно отправляется прямо к вашему порогу или на
              самовывоз.
            </p>
          </div>
          <div className="bg-[var(--bg-primary)] p-6 rounded-2xl border border-[var(--border-color)]">
            <MapPin className="text-[var(--accent)] mb-3" size={28} />
            <h3 className="font-bold text-lg mb-2">Минская мастерская</h3>
            <p className="text-sm opacity-70">
              Ул. Короля, 9 — заходите за пачкой свежего зерна и чашкой
              разговора.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
