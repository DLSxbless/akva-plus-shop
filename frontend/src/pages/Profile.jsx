import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useApp } from "../context/useApp";
import ProductImage from "../components/ProductImage";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, authLoading } = useApp();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    if (!user) return;

    let active = true;

    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await api.getMyOrders(token);

        if (active) {
          setOrders(data);
        }
      } catch (err) {
        if (active) {
          setOrdersError(err.message || "Не удалось загрузить заказы");
        }
      } finally {
        if (active) {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      active = false;
    };
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (authLoading || !user) {
    return <div className="p-6">Загрузка профиля...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Профиль
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Личный кабинет
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">
              Здесь отображается информация об аккаунте и история оформленных заказов.
            </p>
          </div>

          <button
            onClick={logout}
            className="w-fit rounded-full border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Выйти
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm text-neutral-500">Email</p>
            <p className="mt-1 break-all text-lg font-semibold text-neutral-950">
              {user.email}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm text-neutral-500">Роль</p>
            <p className="mt-1 text-lg font-semibold text-neutral-950">
              {user.isAdmin ? "Администратор" : "Пользователь"}
            </p>
          </div>
        </div>

        {user.isAdmin && (
          <button
            onClick={() => navigate("/admin")}
            className="mt-5 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Открыть админку
          </button>
        )}
      </div>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Заказы
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
            Мои заказы
          </h2>
        </div>

        <div className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700">
          {orders.length}
        </div>
      </div>

      {ordersLoading ? (
        <div className="rounded-[28px] border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-neutral-500">Загрузка заказов...</p>
        </div>
      ) : ordersError ? (
        <div className="rounded-[28px] border border-red-100 bg-red-50 p-8 text-center shadow-sm">
          <p className="text-sm text-red-600">{ordersError}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-neutral-950">
            Заказов пока нет
          </h3>
          <p className="mt-2 text-sm text-neutral-500">
            После оформления заказа он появится в этом разделе.
          </p>

          <button
            onClick={() => navigate("/catalog")}
            className="mt-6 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-neutral-500">
                    Заказ от{" "}
                    {new Date(order.createdAt).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold text-neutral-950">
                    № {order._id.slice(-6).toUpperCase()}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white">
                    {order.total}₽
                  </span>

                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700">
                    {order.status === "new" ? "Новый" : order.status}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 p-5">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 rounded-3xl border border-neutral-200 p-3"
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      width={160}
                      height={160}
                      sizes="80px"
                      fit="contain"
                      className="h-20 w-20 shrink-0 rounded-2xl"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 text-sm font-semibold text-neutral-950">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-xs text-neutral-500">
                        {item.category || "Сантехника"}
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                        <span className="text-neutral-500">
                          {item.qty} × {item.price}₽
                        </span>

                        <span className="font-semibold text-neutral-950">
                          {Number(item.qty || 1) * Number(item.price)}₽
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
                <p>
                  Доставка: {order.customer?.city}, {order.customer?.address}
                </p>
                <p className="mt-1">
                  Оплата: {getPaymentLabel(order.payment?.method)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function getPaymentLabel(method) {
  if (method === "card") return "Банковская карта";
  if (method === "sbp") return "СБП";
  if (method === "crypto") return "Криптовалюта";
  if (method === "cash") return "При получении";
  return "Не указана";
}