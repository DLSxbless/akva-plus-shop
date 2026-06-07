import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useApp } from "../context/useApp";
import ProductImage from "../components/ProductImage";

const paymentOptions = [
  { id: "card", label: "Банковская карта", hint: "Мир" },
  { id: "sbp", label: "СБП", hint: "Мгновенный перевод по QR" },
  { id: "crypto", label: "Криптовалюта", hint: "TON, BTC, ETH" },
  { id: "cash", label: "При получении", hint: "Наличными или картой курьеру" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total, cartCount, clearCart, user } = useApp();

  const [paymentType, setPaymentType] = useState("card");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: user?.email || "",
    city: "",
    address: "",
    comment: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    sbpPhone: "",
    cryptoWallet: "",
  });

  const canSubmit = useMemo(() => {
    if (cart.length === 0) return false;
    if (!form.fullName || !form.phone || !form.city || !form.address) return false;

    if (paymentType === "card") {
      return (
        form.cardNumber.trim().length >= 16 &&
        form.cardName.trim().length >= 3 &&
        form.cardExpiry.trim().length >= 5 &&
        form.cardCvv.trim().length >= 3
      );
    }

    if (paymentType === "sbp") {
      return form.sbpPhone.trim().length >= 10;
    }

    if (paymentType === "crypto") {
      return form.cryptoWallet.trim().length >= 8;
    }

    return true;
  }, [cart.length, form, paymentType]);

  if (cart.length === 0) {
    return <Navigate to="/catalog" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === "cardNumber") {
      nextValue = value.replace(/[^\d]/g, "").slice(0, 16);
    }
    if (name === "cardCvv") {
      nextValue = value.replace(/[^\d]/g, "").slice(0, 4);
    }
    if (name === "cardExpiry") {
      nextValue = value.replace(/[^\d]/g, "").slice(0, 4);
      if (nextValue.length > 2) {
        nextValue = `${nextValue.slice(0, 2)}/${nextValue.slice(2)}`;
      }
    }
    if (name === "phone" || name === "sbpPhone") {
      nextValue = value.replace(/[^\d+]/g, "").slice(0, 18);
    }

    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      await api.createOrder(
        {
          cart,
          total,
          customer: {
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            city: form.city,
            address: form.address,
            comment: form.comment,
          },
          payment: {
            method: paymentType,
            mock: true,
          },
        },
        token
      );

      setSuccess(
        "Заказ успешно оформлен. Это моковая оплата, данные никуда реально не списываются."
      );
      clearCart();

      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      setError(err.message || "Не удалось оформить заказ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Оплата
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Оформление заказа
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
          Подтвердите контактные данные, адрес доставки и выберите удобный способ оплаты.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <aside className="order-1 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 lg:order-2 lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-500">Ваш заказ</p>
              <h2 className="mt-1 text-2xl font-semibold text-neutral-950">
                {cartCount} товаров
              </h2>
            </div>
            <span className="w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
              Оплата
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            {cart.map((item) => (
              <article
                key={item._id}
                className="flex gap-3 rounded-3xl border border-neutral-200 p-3 sm:gap-4"
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  sizes="80px"
                  className="h-20 w-20 shrink-0 rounded-2xl"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-neutral-950">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">{item.category}</p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                    <span className="text-neutral-500">
                      {item.qty} × {item.price}₽
                    </span>
                    <span className="font-semibold text-neutral-950">
                      {Number(item.price) * Number(item.qty || 1)}₽
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-neutral-950 p-5 text-white">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Товары</span>
              <span>{cartCount}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-white/70">
              <span>Доставка</span>
              <span>Рассчитывается менеджером</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-base text-white/80">Итого</span>
              <span className="text-2xl font-semibold">{total}₽</span>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="order-2 rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 lg:order-1 lg:p-8"
        >
          <div>
            <h2 className="text-xl font-semibold text-neutral-950">
              Контактные данные
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Имя и фамилия"
                className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Телефон"
                className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400 sm:col-span-2"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-neutral-950">
              Адрес доставки
            </h2>
            <div className="mt-5 grid gap-4">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Город"
                className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                required
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Адрес"
                className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                required
              />
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                rows="4"
                placeholder="Комментарий к заказу"
                className="resize-none rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-neutral-950">
              Способ оплаты
            </h2>

            <div className="mt-5 grid gap-3">
              {paymentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPaymentType(option.id)}
                  className={`rounded-3xl border p-4 text-left transition ${
                    paymentType === option.id
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold">{option.label}</p>
                      <p
                        className={`mt-1 text-sm ${
                          paymentType === option.id
                            ? "text-white/70"
                            : "text-neutral-500"
                        }`}
                      >
                        {option.hint}
                      </p>
                    </div>
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full border ${
                        paymentType === option.id
                          ? "border-white bg-white"
                          : "border-neutral-400"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {paymentType === "card" && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="Номер карты"
                  className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400 sm:col-span-2"
                />
                <input
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  placeholder="Имя на карте"
                  className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="cardExpiry"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                  />
                  <input
                    name="cardCvv"
                    value={form.cardCvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    className="min-h-[48px] rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                  />
                </div>
              </div>
            )}

            {paymentType === "sbp" && (
              <div className="mt-5">
                <input
                  name="sbpPhone"
                  value={form.sbpPhone}
                  onChange={handleChange}
                  placeholder="Телефон для СБП"
                  className="min-h-[48px] w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                />
              </div>
            )}

            {paymentType === "crypto" && (
              <div className="mt-5">
                <input
                  name="cryptoWallet"
                  value={form.cryptoWallet}
                  onChange={handleChange}
                  placeholder="Криптокошелек"
                  className="min-h-[48px] w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-400"
                />
              </div>
            )}
          </div>

          {(error || success) && (
            <div
              className={`mt-6 rounded-2xl px-4 py-3 text-sm ${
                error ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {error || success}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-8 min-h-[48px] w-full rounded-full bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Обработка..." : "Подтвердить заказ"}
          </button>
        </form>
      </div>
    </section>
  );
}