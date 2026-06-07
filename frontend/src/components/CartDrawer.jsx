import { useApp } from "../context/useApp";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useEffect } from "react";
import ProductImage from "./ProductImage";

function CartDrawer({ open, close }) {
  const {
    cart,
    total,
    cartCount,
    clearCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useApp();

  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleGoCheckout = useCallback(() => {
    if (cart.length === 0) return;
    close();
    navigate("/checkout");
  }, [cart.length, close, navigate]);

  const handleGoCatalog = useCallback(() => {
    close();
    navigate("/catalog");
  }, [close, navigate]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Закрыть корзину"
          className="fixed inset-0 z-40 bg-black/35"
          onClick={close}
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-none transform-gpu flex-col bg-white shadow-xl transition-transform duration-200 ease-out will-change-transform sm:max-w-[440px] sm:border-l sm:border-neutral-200 ${
  open ? "translate-x-0" : "translate-x-full"
}`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4 sm:px-5 sm:py-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-neutral-950 sm:text-xl">
              Корзина
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {cartCount > 0 ? `${cartCount} товаров` : "Корзина пока пустая"}
            </p>
          </div>

          <button
            onClick={close}
            className="rounded-full border border-neutral-200 px-3 py-2 text-sm text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-950"
          >
            Закрыть
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          {cart.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center sm:mt-10 sm:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                🛒
              </div>
              <h3 className="text-lg font-semibold text-neutral-950">
                Корзина пустая
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Добавьте товары из каталога, чтобы перейти к оформлению заказа.
              </p>
              <button
                onClick={handleGoCatalog}
                className="mt-5 min-h-[44px] rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <article
                  key={item._id}
                  className="rounded-3xl border border-neutral-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex gap-3 sm:gap-4">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      sizes="96px"
                      className="h-20 w-20 shrink-0 rounded-2xl sm:h-24 sm:w-24"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold text-neutral-950">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-neutral-500">
                        {item.category}
                      </p>

                      <p className="mt-3 text-base font-semibold text-neutral-950">
                        {item.price}₽
                      </p>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50">
                          <button
                            onClick={() => decreaseQty(item._id)}
                            className="min-h-[40px] px-3 text-lg text-neutral-700 transition hover:text-neutral-950"
                          >
                            −
                          </button>
                          <span className="min-w-[32px] text-center text-sm font-medium text-neutral-900">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => increaseQty(item._id)}
                            className="min-h-[40px] px-3 text-lg text-neutral-700 transition hover:text-neutral-950"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="min-h-[40px] text-sm font-medium text-red-500 transition hover:text-red-600"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 px-4 py-4 sm:px-5 sm:py-5">
          <div className="rounded-3xl bg-neutral-950 p-4 text-white sm:p-5">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>Товары</span>
              <span>{cartCount}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-base text-white/80">Итого</span>
              <span className="text-2xl font-semibold">{total}₽</span>
            </div>

            <div className="mt-5 grid gap-3">
              <button
                onClick={handleGoCheckout}
                disabled={cart.length === 0}
                className="min-h-[48px] rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Оформить заказ
              </button>

              <button
                onClick={clearCart}
                disabled={cart.length === 0}
                className="min-h-[48px] rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Очистить корзину
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default memo(CartDrawer);