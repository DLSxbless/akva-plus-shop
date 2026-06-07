import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useApp } from "../context/useApp";
import ProductImage from "../components/ProductImage";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart, toggleFavorite, favoriteIds } = useApp();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await api.getProductById(id);
        if (active) setProduct(data);
      } catch (err) {
        if (active) setError(err.message || "Не удалось загрузить товар");
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [id]);

  const isFav = useMemo(
    () => (product ? favoriteIds.has(product._id) : false),
    [favoriteIds, product]
  );

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-6">Загрузка...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm sm:rounded-[36px]">
        <div className="grid gap-8 p-4 sm:p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8 lg:gap-10 lg:p-10">
          <div className="space-y-4">
            <ProductImage
              src={product.image}
              alt={product.name}
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="w-full rounded-[24px] bg-neutral-100"
            />

            <div className="flex flex-wrap gap-2">
              {product.category && (
                <span className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700">
                  {product.category}
                </span>
              )}
              {product.country && (
                <span className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700">
                  {product.country}
                </span>
              )}
              <span className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700">
                Гарантия качества
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 sm:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Premium выбор
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
                {product.description ||
                  "Качественная сантехника с продуманным дизайном и надёжной комплектацией для современных интерьеров."}
              </p>
            </div>

            <div className="rounded-[24px] bg-neutral-950 p-5 text-white sm:rounded-[28px] sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-white/70">Стоимость</p>
                  <p className="mt-2 text-3xl font-semibold sm:text-4xl">
                    {product.price}₽
                  </p>
                </div>

                <button
                  onClick={() => toggleFavorite(product)}
                  className="min-h-[44px] rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
                >
                  {isFav ? "В избранном" : "В избранное"}
                </button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => addToCart(product)}
                  className="min-h-[48px] rounded-full bg-white px-6 py-4 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
                >
                  Добавить в корзину
                </button>
                <button
                  className="min-h-[48px] rounded-full border border-white/15 px-6 py-4 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Быстрая консультация
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Доставка", "По городу и регионам"],
                ["Оплата", "Карта, СБП, Криптовалюта"],
                ["Поддержка", "Помощь в подборе и заказе"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[20px] border border-neutral-200 bg-neutral-50 p-5 sm:rounded-[24px]"
                >
                  <h2 className="text-base font-semibold text-neutral-950">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}