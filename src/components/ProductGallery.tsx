import { useState, useRef, useEffect } from "react";
import stoveMain from "@/assets/product/stove-main.png";
import stoveTop from "@/assets/product/stove-top.png";
import stoveOven from "@/assets/product/stove-oven.png";
import stoveSide from "@/assets/product/stove-side.png";

const images = [stoveMain, stoveTop, stoveOven, stoveSide];

const ProductGallery = () => {
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: selected * scrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [selected]);

  const handleScroll = () => {
    if (scrollRef.current && !isDragging) {
      const index = Math.round(
        scrollRef.current.scrollLeft / scrollRef.current.offsetWidth
      );
      if (index !== selected && index >= 0 && index < images.length) {
        setSelected(index);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX;
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    handleScroll();
  };

  return (
    <div className="w-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-card rounded-lg"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="min-w-full snap-center flex items-center justify-center p-4 min-h-[300px] sm:min-h-[400px]"
          >
            <img
              src={img}
              alt={`Produto ${i + 1}`}
              className="max-w-full max-h-[300px] sm:max-h-[400px] object-contain"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === selected
                ? "bg-[hsl(var(--marketplace-blue))] w-4"
                : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
