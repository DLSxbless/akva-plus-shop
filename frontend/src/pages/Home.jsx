import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

const STATS = [
  ["500+", "Товаров в каталоге"],
  ["24/7", "Поддержка и подбор"],
  ["1 день", "Быстрая доставка"],
];

const FEATURES = [
  ["Доставка", "По городу и регионам"],
  ["Гарантия", "Официальная и магазинная"],
  ["Оплата", "Карта, СБП и Криптовалюта"],
  ["Сервис", "Подбор и консультация"],
];

const BENEFITS = [
  ["Быстрая доставка", "От 1 дня по городу"],
  ["Премиальный подбор", "Решения под интерьер"],
  ["Безопасная оплата", "Удобные способы оплаты и доставка"],
  ["Поддержка", "На связи по заказу и подбору"],
];

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await api.getProducts();

        if (active) {
          setProducts(data.slice(0, 8));
        }
      } catch {
        console.error("Ошибка загрузки товаров");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const featured = useMemo(() => products.slice(0, 8), [products]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.98) 0%,
                rgba(255,255,255,0.94) 42%,
                rgba(255,255,255,0.56) 100%
              ),
              url('/rec1.webp')
            `,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
            backgroundSize: "cover",
          }}
        />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Premium сантехника
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Современная сантехника для интерьеров высокого уровня
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
              Коллекции для ванной комнаты, кухни и коммерческих объектов — с акцентом на эстетику,
              надёжность и удобство выбора.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/catalog")}
                className="rounded-full bg-neutral-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Перейти в каталог
              </button>

              <button
                onClick={() => navigate("/contacts")}
                className="rounded-full border border-neutral-200 bg-white px-6 py-4 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
              >
                Получить консультацию
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {STATS.map(([num, text]) => (
                <div
                  key={num}
                  className="rounded-[24px] border border-neutral-200 bg-white/95 p-5 shadow-sm"
                >
                  <p className="text-2xl font-semibold text-neutral-950">{num}</p>
                  <p className="mt-1 text-sm text-neutral-500">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-neutral-200 bg-white/90 p-6 shadow-sm sm:col-span-2">
              <p className="text-sm font-medium text-neutral-500">Подбор под проект</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
                Решения для квартир, домов и коммерческих пространств
              </h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                От минималистичных смесителей до полноценных душевых систем, инсталляций и
                комплектующих в едином стиле.
              </p>
            </div>

            {FEATURES.map(([title, text]) => (
              <div
                key={title}
                className="rounded-[24px] border border-neutral-200 bg-white/90 p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Рекомендуемые
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Популярные позиции
            </h2>
          </div>

          <button
            onClick={() => navigate("/catalog")}
            className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
          >
            Смотреть всё
          </button>
        </div>

        <div className="min-h-[520px]">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white px-6 py-14 text-center shadow-sm">
              <h3 className="text-2xl font-semibold text-neutral-950">
                Товары пока не добавлены
              </h3>
              <p className="mt-3 text-sm text-neutral-500">
                Добавьте товары через административную панель.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white [content-visibility:auto] [contain-intrinsic-size:600px]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {BENEFITS.map(([title, text]) => (
            <div
              key={title}
              className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-500">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}