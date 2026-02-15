import stoveMain from "@/assets/product/stove-main.png";
import stoveTop from "@/assets/product/stove-top.png";
import stoveOven from "@/assets/product/stove-oven.png";
import stoveSide from "@/assets/product/stove-side.png";

const products = [
  { img: stoveMain, title: "Fogão Industrial 6 Bocas Inox", price: "1.299", installment: "12x R$ 119,92" },
  { img: stoveTop, title: "Fogão 4 Bocas Branco Compacto", price: "649", installment: "12x R$ 59,92" },
  { img: stoveOven, title: "Fogão Industrial 2 Bocas com Forno", price: "499", installment: "10x R$ 54,90" },
  { img: stoveSide, title: "Fogão 5 Bocas Premium Preto", price: "1.599", installment: "12x R$ 139,92" },
];

const RelatedProducts = () => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quem viu também comprou</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <div key={i} className="cursor-pointer group">
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
