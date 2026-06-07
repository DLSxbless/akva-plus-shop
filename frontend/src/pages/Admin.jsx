import { useEffect, useMemo, useState, useCallback } from "react";
import { api } from "../api";
import ProductImage from "../components/ProductImage";

const initialForm = {
  name: "",
  price: "",
  category: "",
  country: "",
  image: "",
  description: "",
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);

  const token = localStorage.getItem("token");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Не удалось загрузить товары");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name, "ru")),
    [products]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      const created = await api.createProduct(
        {
          ...form,
          price: Number(form.price),
        },
        token
      );

      setProducts((prev) => [created, ...prev]);
      setForm(initialForm);
      setMessage("Товар успешно добавлен");
    } catch (err) {
      setError(err.message || "Не удалось добавить товар");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Удалить этот товар?");
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await api.deleteProduct(id, token);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setMessage("Товар удалён");
    } catch (err) {
      setError(err.message || "Не удалось удалить товар");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Админка</h1>
        <p className="text-gray-500 mt-2">Простое управление товарами: добавление и удаление.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-start">
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-2xl p-6 space-y-4 sticky top-6">
          <h2 className="text-xl font-semibold">Добавить товар</h2>

          <input name="name" value={form.name} onChange={handleChange} placeholder="Название" className="w-full border rounded-lg p-3" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Цена" type="number" min="0" className="w-full border rounded-lg p-3" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Категория" className="w-full border rounded-lg p-3" required />
          <input name="country" value={form.country} onChange={handleChange} placeholder="Страна" className="w-full border rounded-lg p-3" required />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Ссылка на изображение" className="w-full border rounded-lg p-3" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" rows="5" className="w-full border rounded-lg p-3 resize-none" />

          <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-70">
            {submitting ? "Сохранение..." : "Добавить товар"}
          </button>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        <section className="space-y-4">
          <div className="bg-white shadow rounded-2xl p-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Товары</h2>
            <span className="text-sm text-gray-500">Всего: {sortedProducts.length}</span>
          </div>

          {loading ? (
            <div className="bg-white shadow rounded-2xl p-6">Загрузка товаров...</div>
          ) : sortedProducts.length === 0 ? (
            <div className="bg-white shadow rounded-2xl p-6">Пока нет товаров</div>
          ) : (
            <div className="grid gap-4">
              {sortedProducts.map((product) => (
                <article key={product._id} className="bg-white shadow rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    width="120"
                    height="120"
                    className="w-full sm:w-[120px] h-[120px] rounded-xl object-cover bg-gray-100"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.category} • {product.country}</p>
                    <p className="font-bold mt-2">{product.price}₽</p>
                    {product.description && (
                      <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                    )}
                  </div>

                  <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg shrink-0">
                    Удалить
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
