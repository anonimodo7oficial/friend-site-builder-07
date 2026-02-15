import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import stoveMain from "@/assets/product/stove-main.png";
import stoveTop from "@/assets/product/stove-top.png";
import stoveOven from "@/assets/product/stove-oven.png";
import stoveSide from "@/assets/product/stove-side.png";

const products = [
  { img: stoveMain, title: "Fogão Industrial 6 Bocas Inox", price: "1.299", installment: "12x R$ 119,92" },
  { img: stoveTop, title: "Fogão 4 Bocas Branco Compacto", price: "649", installment: "12x R$ 59,92" },
  { img: stoveOven, title: "Fogão Industrial 2 Bocas com Forno", price: "499", installment: "10x R$ 54,90" },
  { img: stoveSide, title: "Fogão 5 Bocas Premium Preto", price: "1.599", installment: "12x R$ 139,92" },
  { img: stoveMain, title: "Fogão Industrial 8 Bocas Pro", price: "2.199", installment: "12x R$ 199,92" },
  { img: stoveTop, title: "Fogão Compacto 2 Bocas Mesa", price: "349", installment: "6x R$ 63,17" },
];

const RelatedProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Produtos Relacionados</h2>
        <div className="flex gap-1">
          <button onClick={() => scroll("left")} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted/50">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <button onClick={() => scroll("right")} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted/50">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((p, i) => (
          <div key={i} className="cursor-pointer group min-w-[150px] sm:min-w-[180px] snap-start flex-shrink-0">
            <div className="bg-[hsl(var(--marketplace-gray-light))] rounded-lg p-3 mb-2 flex items-center justify-center h-36">
              <img src={p.img} alt={p.title} className="max-h-full object-contain group-hover:scale-105 transition-transform" />
            </div>
            <p className="text-xs text-foreground line-clamp-2 mb-1">{p.title}</p>
            <p className="text-base font-light text-foreground">R$ {p.price}</p>
            <p className="text-[11px] marketplace-green">{p.installment}</p>
            <p className="text-[10px] marketplace-green">Frete grátis</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
