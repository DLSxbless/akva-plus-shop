import { useNavigate } from "react-router-dom";
import { useApp } from "../context/useApp";
import { memo, useCallback } from "react";
import ProductImage from "./ProductImage";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favoriteIds } = useApp();

  const isFav = favoriteIds.has(product._id);

  const handleFav = useCallback(() => {
    toggleFavorite(product);
  }, [product, toggleFavorite]);

  const handleCart = useCallback(() => {
    addToCart(product);
  }, [product, addToCart]);

  const goToProduct = useCallback(() => {
    navigate(`/product/${product._id}`);
  }, [navigate, product._id]);

  return (
    <article className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <button
          onClick={handleFav}
          className="absolute left-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm"
          aria-label="Добавить в избранное"
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        <button onClick={goToProduct} className="block w-full text-left">
          <ProductImage
  src={product.image}
  alt={product.name}
  width={800}
  height={600}
  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
  fit="contain"
  className="w-full"
/>
        </button>
      </div>

      <div className="flex min-h-[176px] flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
              {product.category || "Сантехника"}
            </p>

            <h3
              className="mt-2 line-clamp-2 cursor-pointer text-lg font-semibold tracking-tight text-neutral-950 transition hover:text-neutral-700"
              onClick={goToProduct}
            >
              {product.name}
            </h3>
          </div>

          {product.country && (
            <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">
              {product.country}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <p className="text-sm text-neutral-500">Цена</p>
            <p className="text-2xl font-semibold text-neutral-950">{product.price}₽</p>
          </div>

          <button
            onClick={handleCart}
            className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            В корзину
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);