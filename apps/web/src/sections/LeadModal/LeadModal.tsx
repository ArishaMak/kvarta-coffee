"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestType: "subscription" | "single" | "question";
  initialComment: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  requestType,
  initialComment,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState(initialComment);
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
    setComment(initialComment);
  }, [initialComment]);

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

  if (!isOpen) return null;

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
    } catch (err: any) {
      setError(err.message || "Что-то пошло не так. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-[var(--border-color)]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 opacity-50 hover:opacity-100 transition"
        >
          <X size={24} />
        </button>

        {success ? (
          <div className="text-center py-8">
            <CheckCircle size={60} className="mx-auto text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Заявка принята!</h3>
            <p className="opacity-70 text-sm mb-6">
              Менеджер свяжется с вами в ближайшее время.
            </p>
            <button
              onClick={onClose}
              className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-3 rounded-full text-sm font-medium"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-2">Оформить заявку</h3>
            <p className="text-sm opacity-70 mb-6">Оплата при получении.</p>

            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1 opacity-70">
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Александр"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1 opacity-70">
                  Телефон РБ (+375 / 80)
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+375291234567"
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase mb-1 opacity-70">
                  Комментарий
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--accent)] text-white py-3.5 rounded-2xl font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
