import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import stoveMain from "@/assets/product/stove-main.png";
import stoveTop from "@/assets/product/stove-top.png";
import stoveOven from "@/assets/product/stove-oven.png";
import stoveSide from "@/assets/product/stove-side.png";

const recommended = [
  { img: stoveMain, title: "Fogão Industrial 6 Bocas Inox", price: "1.299", oldPrice: "1.899", off: "31%", installment: "12x R$ 119,92" },
  { img: stoveTop, title: "Fogão 4 Bocas Branco Compacto", price: "649", oldPrice: "899", off: "27%", installment: "12x R$ 59,92" },
  { img: stoveOven, title: "Fogão Industrial 2 Bocas com Forno", price: "499", oldPrice: "749", off: "33%", installment: "10x R$ 54,90" },
  { img: stoveSide, title: "Fogão 5 Bocas Premium Preto", price: "1.599", oldPrice: "2.199", off: "27%", installment: "12x R$ 139,92" },
  { img: stoveMain, title: "Fogão Industrial 8 Bocas Pro", price: "2.199", oldPrice: "2.999", off: "26%", installment: "12x R$ 199,92" },
];

const interests = [
  { img: stoveSide, title: "Fogão Compacto 2 Bocas Mesa", price: "349", oldPrice: "499", off: "30%", installment: "6x R$ 63,17" },
  { img: stoveOven, title: "Fogão 3 Bocas Econômico", price: "429", oldPrice: "599", off: "28%", installment: "8x R$ 58,63" },
  { img: stoveTop, title: "Fogão Industrial 4 Bocas Inox", price: "899", oldPrice: "1.199", off: "25%", installment: "12x R$ 82,42" },
  { img: stoveMain, title: "Fogão 6 Bocas com Forno Duplo", price: "1.899", oldPrice: "2.499", off: "24%", installment: "12x R$ 174,92" },
];

const formatPrice = (n: number) => {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();
  const recRef = useRef<HTMLDivElement>(null);
  const intRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-[1200px] mx-auto px-3 py-8 w-full">
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-2">Seu carrinho está vazio</h2>
            <p className="text-sm text-muted-foreground mb-4">Adicione produtos para continuar comprando.</p>
            <button onClick={() => navigate("/")} className="marketplace-btn-primary max-w-xs mx-auto">
              Voltar às compras
            </button>
          </div>

          {/* Recomendados */}
          <div className="mt-6">
            <ProductCarousel title="Recomendados para você" items={recommended} scrollRef={recRef} onScroll={(d) => scrollCarousel(recRef, d)} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto px-3 py-4 w-full space-y-4">
        {/* Cart items */}
        <div className="bg-card rounded-lg border border-border divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="p-3 sm:p-4">
              <div className="flex gap-3">
                <img src={item.image} alt={item.title} className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0 bg-[hsl(var(--marketplace-gray-light))] rounded-lg p-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-foreground line-clamp-2 leading-snug">{item.title}</p>
                    <button onClick={() => removeItem(item.id)} className="flex-shrink-0 p-1">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Cor: {item.color}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border rounded overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted/50">
                        <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium text-foreground min-w-[32px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, Math.min(50, item.quantity + 1))} className="px-2 py-1 hover:bg-muted/50">
                        <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="marketplace-old-price text-[11px]">R$ {formatPrice(item.oldPrice * item.quantity)}</p>
                      <p className="text-base font-semibold text-foreground">R$ {formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-lg border border-border p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Produtos ({items.reduce((s, i) => s + i.quantity, 0)})</span>
            <span className="text-foreground">R$ {formatPrice(totalPrice)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Frete</span>
            <span className="marketplace-green font-medium">Grátis</span>
          </div>
          <div className="border-t border-border pt-2 flex items-center justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-lg text-foreground">R$ {formatPrice(totalPrice)}</span>
          </div>
          <button className="marketplace-btn-primary mt-2">Continuar a compra</button>
        </div>

        {/* Recomendados */}
        <ProductCarousel title="Recomendados para você" items={recommended} scrollRef={recRef} onScroll={(d) => scrollCarousel(recRef, d)} />

        {/* Interesses */}
        <ProductCarousel title="Produtos que podem te interessar" items={interests} scrollRef={intRef} onScroll={(d) => scrollCarousel(intRef, d)} />
      </main>
      <Footer />
    </div>
  );
};

interface CarouselProps {
  title: string;
  items: { img: string; title: string; price: string; oldPrice: string; off: string; installment: string }[];
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: (dir: "left" | "right") => void;
}

const ProductCarousel = ({ title, items, scrollRef, onScroll }: CarouselProps) => (
  <div className="bg-card rounded-lg border border-border p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <div className="flex gap-1">
        <button onClick={() => onScroll("left")} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted/50">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <button onClick={() => onScroll("right")} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted/50">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
    <div
      ref={scrollRef}
      className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {items.map((p, i) => (
        <div key={i} className="min-w-[140px] sm:min-w-[160px] snap-start flex-shrink-0">
          <div className="bg-[hsl(var(--marketplace-gray-light))] rounded-lg p-2 mb-2 flex items-center justify-center h-32">
            <img src={p.img} alt={p.title} className="max-h-full object-contain" />
          </div>
          <p className="marketplace-old-price text-[10px]">R$ {p.oldPrice}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-sm font-light text-foreground">R$ {p.price}</p>
            <span className="marketplace-discount text-[10px]">{p.off} OFF</span>
          </div>
          <p className="text-[10px] text-muted-foreground">{p.installment}</p>
          <p className="text-[10px] marketplace-green">Frete grátis</p>
          <p className="text-xs text-foreground line-clamp-2 mt-1">{p.title}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Cart;
