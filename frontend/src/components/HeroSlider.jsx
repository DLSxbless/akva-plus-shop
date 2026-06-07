import { useEffect, useState } from "react";

const slides = [
  "/test.webp",
  "/test.webp",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] overflow-hidden">

      {/* 🔥 только текущий слайд */}
      <img
        src={slides[index]}
        width="1920"
        height="500"
        alt="Сантехника"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        className="absolute w-full h-full object-cover transition-opacity duration-700"
      />

      {/* затемнение */}
      <div className="absolute inset-0 bg-black/40" />

      {/* текст */}
      <div className="absolute z-10 text-white p-10 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">
          Премиальная сантехника
        </h1>

        <p className="text-lg">
          Качество, надежность и стиль для вашего дома
        </p>
      </div>

    </div>
  );
}