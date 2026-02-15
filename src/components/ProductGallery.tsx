import { useState } from "react";
import stoveMain from "@/assets/product/stove-main.png";
import stoveTop from "@/assets/product/stove-top.png";
import stoveOven from "@/assets/product/stove-oven.png";
import stoveSide from "@/assets/product/stove-side.png";

const images = [stoveMain, stoveTop, stoveOven, stoveSide];

const ProductGallery = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-14 h-14 p-1 flex items-center justify-center ${
              i === selected ? "thumbnail-active" : "thumbnail-inactive"
            }`}
          >
            <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
      <div className="flex-1 bg-card rounded-lg flex items-center justify-center p-4 min-h-[400px]">
        <img
          src={images[selected]}
          alt="Produto principal"
          className="max-w-full max-h-[400px] object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
