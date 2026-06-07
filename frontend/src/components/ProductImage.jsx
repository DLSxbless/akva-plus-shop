import { useState } from "react";

export default function ProductImage({
  src,
  alt,
  className = "",
  width = 800,
  height = 600,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  fit = "contain",
}) {
  const fallback = "/placeholder-product.webp";
  const resolvedSrc = src || fallback;

  const [loadedSrc, setLoadedSrc] = useState("");
  const isLoaded = loadedSrc === resolvedSrc;

  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!isLoaded && <div className="absolute inset-0 bg-neutral-200" />}

      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoadedSrc(resolvedSrc)}
        onError={(e) => {
          if (!e.currentTarget.src.includes(fallback)) {
            e.currentTarget.src = fallback;
          }
        }}
        className={`h-full w-full transition-opacity duration-300 ${
          fit === "cover" ? "object-cover" : "object-contain p-4"
        } ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}