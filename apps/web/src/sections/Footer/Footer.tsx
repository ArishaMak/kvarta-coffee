"use client";

import React from "react";
import { MapPin, Phone, Mail, Globe, Send, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Бренд */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              К
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight">
                Кварта
              </span>
              <p className="text-xs opacity-60">Мастерская обжарки • Минск</p>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Свежеобжаренный спешелти кофе в микро-партиях по 5 кг. Варим с
            любовью и доставляем прямо к вашему порогу.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-90">
            Навигация
          </h4>
          <ul className="space-y-2.5 text-sm opacity-75">
            <li>
              <a
                href="#about"
                className="hover:text-[var(--accent)] transition"
              >
                О мастерской
              </a>
            </li>
            <li>
              <a
                href="#catalog"
                className="hover:text-[var(--accent)] transition"
              >
                Ассортимент зерна
              </a>
            </li>
            <li>
              <a
                href="#catalog"
                className="hover:text-[var(--accent)] transition"
              >
                Кофейная подписка
              </a>
            </li>
            <li>
              <a
                href="#delivery"
                className="hover:text-[var(--accent)] transition"
              >
                Доставка и самовывоз
              </a>
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-90">
            Контакты
          </h4>
          <ul className="space-y-3 text-sm opacity-75">
            <li className="flex items-start gap-2.5">
              <MapPin
                size={18}
                className="text-[var(--accent)] shrink-0 mt-0.5"
              />
              <span>г. Минск, ул. Короля, 9</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={18} className="text-[var(--accent)] shrink-0" />
              <a
                href="tel:+375291234567"
                className="hover:text-[var(--accent)] transition"
              >
                +375 (29) 123-45-67
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={18} className="text-[var(--accent)] shrink-0" />
              <a
                href="mailto:hello@kvarta-coffee.by"
                className="hover:text-[var(--accent)] transition"
              >
                hello@kvarta-coffee.by
              </a>
            </li>
          </ul>
        </div>

        {/* Соцсети и Подписка */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider mb-4 opacity-90">
            Мы в соцсетях
          </h4>
          <p className="text-xs opacity-70 mb-4">
            Следите за графиком обжарок и новыми лотами в нашем Instagram
            (@ichbinrisha) и Telegram.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/ichbinrisha"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @ichbinrisha"
              className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition"
            >
              <Globe size={18} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition"
            >
              <Send size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between text-xs opacity-60 gap-4">
        <p>© 2019–2026 Обжарочная мастерская «Кварта». Все права защищены.</p>
        <p className="flex items-center gap-1">
          Сделано с{" "}
          <Heart
            size={14}
            className="text-[var(--accent)] fill-[var(--accent)]"
          />{" "}
          для любителей хорошего кофе
        </p>
      </div>
    </footer>
  );
};
