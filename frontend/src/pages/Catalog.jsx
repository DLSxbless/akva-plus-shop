import { useEffect, useState, useMemo } from "react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import SkeletonCard from "../components/SkeletonCard";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await api.getProducts();
        if (active) {
          setProducts(data);
        }
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

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(timer);
  }, [search]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const countries = useMemo(
    () => [...new Set(products.map((p) => p.country).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return products
      .filter((p) =>
        normalizedSearch ? p.name.toLowerCase().includes(normalizedSearch) : true
      )
      .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
      .filter((p) => (selectedCountry ? p.country === selectedCountry : true))
      .filter((p) => (minPrice ? Number(p.price) >= Number(minPrice) : true))
      .filter((p) => (maxPrice ? Number(p.price) <= Number(maxPrice) : true));
  }, [products, debouncedSearch, selectedCategory, selectedCountry, minPrice, maxPrice]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Premium Каталог
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-neutral-950">
            Каталог сантехники
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600 sm:text-base">
            Подбор смесителей, раковин, душевых систем, инсталляций и комплектующих в едином премиальном каталоге.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-sm lg:w-[420px]">
          <input
            placeholder="Поиск товаров..."
            className="w-full rounded-[20px] px-4 py-3 text-sm text-neutral-900 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Filter
          categories={categories}
          countries={countries}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />

        <div className="flex-1">
          <div className="mb-5 flex items-center justify-between rounded-3xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm text-neutral-500">Найдено товаров</p>
            <p className="text-lg font-semibold text-neutral-950">
              {loading ? "..." : filteredProducts.length}
            </p>
          </div>

          <div className="min-h-[900px]">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-neutral-300 bg-white px-6 py-16 text-center shadow-sm">
                <h2 className="text-2xl font-semibold text-neutral-950">
                  Ничего не найдено
                </h2>
                <p className="mt-3 text-sm text-neutral-500">
                  Попробуй изменить фильтры или очистить поиск.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}