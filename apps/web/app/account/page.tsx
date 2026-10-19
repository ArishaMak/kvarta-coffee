"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Coffee,
  Plus,
  CheckCircle2,
} from "lucide-react";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Состояние для формы добавления товара (админка)
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState("");
  const [roast, setRoast] = useState("Эспрессо");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("kvarta_token");
    if (savedToken) {
      setToken(savedToken);
      setRole("admin"); // Для демо считаем залогиненного с токеном админом
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin
        ? "http://localhost:4000/auth/login"
        : "http://localhost:4000/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка авторизации");

      if (isLogin) {
        localStorage.setItem("kvarta_token", data.access_token);
        setToken(data.access_token);
        setRole(data.role || "admin");
      } else {
        alert("Регистрация успешна! Теперь войдите в систему.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(
        "Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен на порту 4000.",
      );
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setError("");

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            price: Number(price),
            origin,
            roast,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Не удалось создать товар");

      setSuccessMsg(`Лот "${title}" успешно добавлен в каталог!`);
      setTitle("");
      setPrice("");
      setOrigin("");
    } catch (err: any) {
      setError(err.message || "Ошибка при создании товара");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kvarta_token");
    setToken(null);
    setRole(null);
  };

  if (role) {
    return (
      <div className="min-h-[80vh] py-20 px-6 max-w-4xl mx-auto">
        <div className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[var(--accent)]" size={32} />
              <h1 className="text-3xl font-bold font-serif">
                Личный кабинет ({role === "admin" ? "Администратор" : "Клиент"})
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl bg-red-500/10 text-red-500 text-sm font-semibold hover:bg-red-500/20 transition"
            >
              Выйти
            </button>
          </div>

          <p className="opacity-75">
            Вы авторизованы в системе обжарочной мастерской «Кварта».
          </p>

          {role === "admin" && (
            <div className="p-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Coffee size={20} /> Добавить новый спешелти-лот в каталог
              </h3>

              {successMsg && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={16} /> {successMsg}
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs opacity-60">
                      Название сортов
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Эфиопия Иргачеффе"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent)] transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs opacity-60">Цена (BYN)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="35"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent)] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs opacity-60">
                      Регион / Страна
                    </label>
                    <input
                      type="text"
                      required
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="Эфиопия"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent)] transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs opacity-60">
                      Профиль обжарки
                    </label>
                    <select
                      value={roast}
                      onChange={(e) => setRoast(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent)] transition"
                    >
                      <option value="Эспрессо">Эспрессо</option>
                      <option value="Фильтр">Фильтр</option>
                      <option value="Под молоко">Под молоко</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--accent)] text-white font-bold rounded-xl hover:opacity-90 transition flex items-center gap-2 text-sm shadow-md"
                >
                  <Plus size={16} /> Добавить лот в каталог
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-serif">
            {isLogin ? "Вход в аккаунт" : "Регистрация"}
          </h1>
          <p className="text-sm opacity-70">
            Мастерская спешелти кофе «Кварта»
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs opacity-60">Email</label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-3.5 opacity-40"
                size={18}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kvarta.by"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent)] transition"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs opacity-60">Пароль</label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-3.5 opacity-40"
                size={18}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm focus:outline-none focus:border-[var(--accent)] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[var(--accent)] text-white font-bold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20"
          >
            {isLogin ? "Войти" : "Зарегистрироваться"} <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs opacity-70 hover:opacity-100 hover:text-[var(--accent)] transition underline"
          >
            {isLogin
              ? "Нет аккаунта? Зарегистрироваться"
              : "Уже есть аккаунт? Войти"}
          </button>
        </div>
      </div>
    </div>
  );
}
