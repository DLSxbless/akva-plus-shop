export default function BrandsSlider() {
  const brands = [
    "Grohe", "Cersanit", "Roca", "Hansgrohe",
    "Ideal", "Vitra", "AM.PM", "Vidima"
  ];

  const loop = [...brands, ...brands];

  return (
    <div className="overflow-hidden py-12 bg-gray-50 border-t">

      <h2 className="text-3xl font-bold text-center mb-10">
        Популярные бренды
      </h2>

      <div className="relative overflow-hidden">

        <div
          className="flex gap-10 whitespace-nowrap will-change-transform"
          style={{
            animation: "scroll 20s linear infinite"
          }}
        >
          {loop.map((brand, i) => (
            <div
              key={i}
              className="bg-white px-6 py-3 rounded-xl shadow min-w-max"
            >
              {brand}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}