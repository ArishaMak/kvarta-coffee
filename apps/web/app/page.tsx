"use client";

import React, { useState, useEffect } from "react";
import {
  Coffee,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const PRODUCTS = [
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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<
    "subscription" | "single" | "question"
  >("single");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [utm, setUtm] = useState({
    source: "",
    medium: "",
    campaign: "",
    content: "",
    term: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      content: params.get("utm_content") || "",
      term: params.get("utm_term") || "",
    });
  }, []);

  const openModal = (
    productName: string,
    type: "subscription" | "single" | "question",
  ) => {
    setRequestType(type);
    setComment(`Интересует: ${productName}`);
    setIsModalOpen(true);
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, type: requestType, comment, utm }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка отправки заявки");

      setSuccess(true);
      setName("");
      setPhone("");
      setComment("");
    } catch (err: any) {
      setError(err.message || "Что-то пошло не так. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C221E]">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FDFBF7]/90 border-b border-[#2C221E]/10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C86D33] text-white flex items-center justify-center font-bold text-lg">
              К
            </div>
            <div>
              <span className="font-serif text-xl font-bold">Кварта</span>
              <p className="text-xs text-[#2C221E]/60">
                Мастерская обжарки • Минск
              </p>
            </div>
          </div>
          <button
            onClick={() => openModal("Консультация / Вопрос", "question")}
            className="bg-[#2C221E] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#C86D33] transition"
          >
            Связаться с нами
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#C86D33]/10 text-[#C86D33] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
            <Sparkles size={14} /> Свежая обжарка каждый четверг
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.15] mb-6">
            Свежий кофе из Минска. У вас через 1–3 дня.
          </h1>
          <p className="text-lg text-[#2C221E]/80 mb-8 leading-relaxed">
            Маленькая мастерская Ани и Дмитрия. Обжариваем партиями по 5 кг с
            2019 года. Никаких складов — только чистый вкус.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#catalog"
              className="bg-[#C86D33] text-white px-8 py-4 rounded-full font-medium text-center hover:bg-[#b05d29] transition flex items-center justify-center gap-2"
            >
              Выбрать кофе <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="aspect-square rounded-3xl bg-[#2C221E]/5 border border-[#2C221E]/10 flex items-center justify-center p-8">
          <div className="text-center">
            <Coffee size={80} className="mx-auto text-[#C86D33] mb-4" />
            <p className="text-2xl font-bold">1–3 дня</p>
            <p className="text-sm text-[#2C221E]/60 mt-1">
              от ростера до вашей чашки
            </p>
          </div>
        </div>
      </section>

      <section id="catalog" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Наш ассортимент
          </h2>
          <p className="text-[#2C221E]/70">
            Выберите свой идеальный вкус или оформите ежемесячную подписку.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-[#2C221E]/10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-semibold bg-[#F3E9DC] px-3 py-1 rounded-full">
                    {item.weight}
                  </span>
                  <span className="font-bold text-xl text-[#C86D33]">
                    {item.price}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="text-[#2C221E]/70 text-sm mb-6">{item.desc}</p>
              </div>
              <button
                onClick={() =>
                  openModal(
                    item.name,
                    item.type === "subscription" ? "subscription" : "single",
                  )
                }
                className="w-full bg-[#2C221E] text-white py-3 rounded-2xl font-medium hover:bg-[#C86D33] transition"
              >
                {item.type === "subscription"
                  ? "Хочу подписку"
                  : "Заказать пачку"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-[#2C221E]/10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[#2C221E]/50 hover:text-[#2C221E]"
            >
              <X size={24} />
            </button>

            {success ? (
              <div className="text-center py-8">
                <CheckCircle
                  size={60}
                  className="mx-auto text-green-600 mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
                <p className="text-[#2C221E]/70 text-sm mb-6">
                  Менеджер свяжется с вами в ближайшее время.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#2C221E] text-white px-8 py-3 rounded-full text-sm font-medium"
                >
                  Закрыть
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold mb-2">Оформить заявку</h3>
                <p className="text-sm text-[#2C221E]/70 mb-6">
                  Оплата при получении.
                </p>

                {error && (
                  <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4">
                    {error}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1 text-[#2C221E]/70">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Александр"
                      className="w-full bg-white border border-[#2C221E]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C86D33]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1 text-[#2C221E]/70">
                      Телефон РБ (+375 / 80)
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+375291234567"
                      className="w-full bg-white border border-[#2C221E]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C86D33]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase mb-1 text-[#2C221E]/70">
                      Комментарий
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full bg-white border border-[#2C221E]/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C86D33]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C86D33] text-white py-3.5 rounded-2xl font-medium hover:bg-[#b05d29] disabled:opacity-50"
                >
                  {loading ? "Отправка..." : "Отправить заявку"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
