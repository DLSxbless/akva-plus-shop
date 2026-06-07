import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/useApp";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useApp();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Заполните все поля");
      return;
    }

    if (password.length < 4) {
      setError("Пароль должен быть не короче 4 символов");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await api.register(email, password);
      localStorage.setItem("token", data.token);

      const me = await api.getMe(data.token);
      setUser(me);

      navigate(me.isAdmin ? "/admin" : "/profile");
    } catch (err) {
      setError(err.message || "Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Регистрация
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Создать аккаунт
            </h1>

            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Зарегистрируйтесь, чтобы пользоваться профилем, заказами и персональными возможностями магазина.
            </p>
          </div>

          <form onSubmit={handleRegister} className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-800">
                Email
              </label>

              <input
                type="email"
                placeholder="example@mail.ru"
                className="min-h-[50px] w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 focus:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-800">
                Пароль
              </label>

              <input
                type="password"
                placeholder="Введите пароль"
                className="min-h-[50px] w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-400 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="min-h-[50px] rounded-full bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 w-full text-center text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
          >
            Уже есть аккаунт? Войти
          </button>
        </div>

        <div className="hidden bg-neutral-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
              АКВА+
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight">
              Персональный доступ к магазину
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Создайте аккаунт, чтобы быстрее оформлять заказы и пользоваться возможностями личного кабинета.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              ["Быстрый вход", "Доступ к профилю"],
              ["Заказы", "История покупок"],
              ["Админ-доступ", "Для управляющего аккаунта"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}