import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useApp();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Желаемые товары
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Избранное
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            Сохраняйте понравившиеся товары, чтобы быстро вернуться к ним позже.
          </p>
        </div>

        <div className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
          Товаров: {favorites.length}
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white px-6 py-14 text-center shadow-sm sm:px-8 sm:py-16">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-2xl">
            ❤
          </div>

          <h2 className="text-2xl font-semibold text-neutral-950">
            В избранном пока пусто
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Добавляйте товары в избранное, чтобы сравнить варианты и вернуться к покупке позже.
          </p>

          <button
            onClick={() => navigate("/catalog")}
            className="mt-6 min-h-[48px] rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}