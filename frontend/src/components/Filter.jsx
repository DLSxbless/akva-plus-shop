export default function Filter({
  categories,
  countries,
  selectedCategory,
  setSelectedCategory,
  selectedCountry,
  setSelectedCountry,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
}) {
  const hasActiveFilters =
    selectedCategory || selectedCountry || minPrice || maxPrice;

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedCountry("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <aside className="w-full rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-24 lg:w-[290px] lg:self-start lg:rounded-[28px]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Каталог
          </p>
          <h2 className="mt-2 text-xl font-semibold text-neutral-950 sm:text-2xl">
            Фильтры
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="shrink-0 rounded-full border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-950"
          >
            Сбросить
          </button>
        )}
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Категория
          </label>
          <select
            className="min-h-[48px] w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Все категории</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Страна
          </label>
          <select
            className="min-h-[48px] w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Все страны</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-800">
            Цена
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              inputMode="numeric"
              placeholder="От"
              className="min-h-[48px] w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              inputMode="numeric"
              placeholder="До"
              className="min-h-[48px] w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}