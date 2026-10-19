"use client";

import React from "react";

export const PRODUCTS = [
  {
    id: "1",
    name: "Эфиопия Иргачеффе",
    price: "32 BYN",
    weight: "250 г",
    desc: "Цветочный, бергамот, светлая обжарка",
    type: "single",
  },
  {
    id: "2",
    name: "Колумбия Уила",
    price: "29 BYN",
    weight: "250 г",
    desc: "Карамель, красное яблоко",
    type: "single",
  },
  {
    id: "3",
    name: "Бразилия Серрадо",
    price: "26 BYN",
    weight: "250 г",
    desc: "Орех, шоколад, под эспрессо",
    type: "single",
  },
  {
    id: "4",
    name: "Дрип-пакеты ассорти",
    price: "18 BYN",
    weight: "10 штук",
    desc: "Удобно дома, в офисе и в поездке",
    type: "single",
  },
  {
    id: "5",
    name: "Кофейная Подписка",
    price: "54 BYN / мес",
    weight: "2 пачки по 250г",
    desc: "Свежее зерно раз в месяц, доставка бесплатно",
    type: "subscription",
  },
];

interface CatalogSectionProps {
  onOpenModal?: (
    productName: string,
    type: "subscription" | "single" | "question",
  ) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onOpenModal,
}) => {
  return (
    <section id="catalog" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Наш ассортимент</h2>
        <p className="opacity-70">
          Выберите свой идеальный вкус или оформите ежемесячную подписку с
          бесплатной доставкой.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {PRODUCTS.map((item) => (
          <div
            key={item.id}
            className="bg-[var(--bg-secondary)]/30 rounded-3xl p-8 border border-[var(--border-color)] shadow-sm flex flex-col justify-between hover:border-[var(--accent)] transition"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-semibold bg-[var(--bg-secondary)] px-3 py-1 rounded-full">
                  {item.weight}
                </span>
                <span className="font-bold text-xl text-[var(--accent)]">
                  {item.price}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
              <p className="opacity-70 text-sm mb-6">{item.desc}</p>
            </div>
            <button
              onClick={() =>
                onOpenModal &&
                onOpenModal(
                  item.name,
                  item.type === "subscription" ? "subscription" : "single",
                )
              }
              className="w-full bg-[var(--text-primary)] text-[var(--bg-primary)] py-3 rounded-2xl font-medium hover:bg-[var(--accent)] hover:text-white transition text-center"
            >
              {item.type === "subscription"
                ? "Хочу подписку"
                : "Заказать пачку"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
