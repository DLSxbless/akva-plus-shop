import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/useApp";
import { useMemo, useState, useCallback } from "react";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, favorites, user } = useApp();

  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Каталог", to: "/catalog" },
      { label: "Доставка", to: "/delivery" },
      { label: "Оплата", to: "/payment" },
      { label: "Гарантия", to: "/guarantee" },
      { label: "Контакты", to: "/contacts" },
    ],
    []
  );

  const goTo = useCallback(
    (path) => {
      setOpenMenu(false);
      navigate(path);
    },
    [navigate]
  );

  const handleLogoClick = useCallback(() => {
    setOpenMenu(false);
    navigate("/");
  }, [navigate]);

  const handleOpenCart = useCallback(() => {
    setOpenMenu(false);
    setOpenCart(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setOpenMenu((prev) => !prev);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleLogoClick}
              className="shrink-0 text-left text-xl font-semibold tracking-[0.14em] text-neutral-950 sm:text-2xl"
            >
              АКВА+
            </button>

            <nav className="hidden items-center gap-2 text-sm font-medium text-neutral-600 lg:flex">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;

                return (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className={`rounded-full px-4 py-2 transition ${
                      isActive
                        ? "bg-neutral-950 text-white"
                        : "hover:bg-neutral-100 hover:text-neutral-950"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {user?.isAdmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className={`rounded-full px-4 py-2 transition ${
                    location.pathname === "/admin"
                      ? "bg-neutral-950 text-white"
                      : "hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  Админка
                </button>
              )}
            </nav>

            <div className="hidden items-center gap-3 text-sm md:flex">
              <button
                onClick={() => navigate("/favorites")}
                className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950"
              >
                Избранное ({favorites.length})
              </button>

              <button
                onClick={handleOpenCart}
                className="rounded-full bg-neutral-950 px-4 py-2 text-white transition hover:bg-neutral-800"
              >
                Корзина ({cartCount})
              </button>

              {user ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950"
                >
                  Профиль
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-full border border-neutral-200 px-4 py-2 text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950"
                >
                  Войти
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => goTo("/favorites")}
                className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-full border border-neutral-200 px-3 text-sm text-neutral-700"
                aria-label="Избранное"
              >
                ❤
              </button>

              <button
                onClick={handleOpenCart}
                className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-4 text-sm font-medium text-white"
              >
                {cartCount}
              </button>

              <button
                onClick={toggleMenu}
                className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-full border border-neutral-200 px-3 text-sm font-medium text-neutral-900"
                aria-label="Открыть меню"
              >
                {openMenu ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {openMenu && (
            <div className="mt-3 rounded-3xl border border-neutral-200 bg-white p-3 shadow-sm lg:hidden">
              <div className="grid gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;

                  return (
                    <button
                      key={item.to}
                      onClick={() => goTo(item.to)}
                      className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                        isActive
                          ? "bg-neutral-950 text-white"
                          : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {user?.isAdmin && (
                  <button
                    onClick={() => goTo("/admin")}
                    className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                      location.pathname === "/admin"
                        ? "bg-neutral-950 text-white"
                        : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100"
                    }`}
                  >
                    Админка
                  </button>
                )}

                {user ? (
                  <button
                    onClick={() => goTo("/profile")}
                    className="rounded-2xl bg-neutral-50 px-4 py-3 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    Профиль
                  </button>
                ) : (
                  <button
                    onClick={() => goTo("/login")}
                    className="rounded-2xl bg-neutral-50 px-4 py-3 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-100"
                  >
                    Войти
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <CartDrawer open={openCart} close={() => setOpenCart(false)} />
    </>
  );
}