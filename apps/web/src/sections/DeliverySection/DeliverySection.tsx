"use client";

import React from "react";
import { MapPin, Coffee } from "lucide-react";

interface DeliverySectionProps {
  onOpenModal: (
    productName: string,
    type: "subscription" | "single" | "question",
  ) => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  onOpenModal,
}) => {
  return (
    <section
      id="delivery"
      className="bg-[var(--bg-secondary)] py-20 border-t border-[var(--border-color)]"
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Доставка и самовывоз
          </h2>
          <p className="opacity-80 mb-6 leading-relaxed">
            Мы ценим ваше время, поэтому делаем логистику максимально простой и
            прозрачной.
          </p>
          <ul className="space-y-4 opacity-90">
            <li className="flex items-start gap-3">
              <MapPin
                className="text-[var(--accent)] shrink-0 mt-1"
                size={20}
              />
              <div>
                <strong>Самовывоз:</strong> Минск, ул. Короля, 9. Пн–Пт
                8:00–20:00, Сб–Вс 10:00–18:00.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Coffee
                className="text-[var(--accent)] shrink-0 mt-1"
                size={20}
              />
              <div>
                <strong>Доставка по Минску:</strong> Развозим по пятницам.
                Бесплатно при заказе от 50 BYN!
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-[var(--bg-primary)] p-8 rounded-3xl border border-[var(--border-color)]">
          <h3 className="text-xl font-bold mb-4">
            Остались вопросы по помолу или заказу?
          </h3>
          <p className="opacity-70 text-sm mb-6">
            Оставьте заявку, и Аня или Дмитрий перезвонят вам, чтобы подобрать
            идеальный помол под вашу кофеварку или турку.
          </p>
          <button
            onClick={() => onOpenModal("Консультация бариста", "question")}
            className="bg-[var(--accent)] text-white w-full py-3.5 rounded-full font-medium hover:opacity-90 transition"
          >
            Задать вопрос бариста
          </button>
        </div>
      </div>
    </section>
  );
};
