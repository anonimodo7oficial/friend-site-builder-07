import { useState } from "react";
import { Star, Share2, Heart, X, Minus, Plus } from "lucide-react";
import fullIcon from "@/assets/icons/icon-18.png";

const colors = ["Preto", "Branco", "Inox"];

const ProductInfo = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="marketplace-badge">MAIS VENDIDO</span>
          <span className="text-muted-foreground">Novo | +500 vendidos</span>
        </div>

        <h1 className="text-xl font-semibold text-foreground leading-snug">
          Fogão Industrial 4 Bocas Com Forno Baixa Pressão - {colors[selectedColor]}
        </h1>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
            ))}
            <Star className="w-3.5 h-3.5 text-border" />
          </div>
          <span className="text-xs marketplace-link">(142)</span>
        </div>

        <div>
          <p className="marketplace-old-price text-sm">R$ 1.299,00</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl marketplace-price">R$ 849</span>
            <span className="text-lg marketplace-price">,90</span>
            <span className="marketplace-discount text-base">34% OFF</span>
          </div>
          <p className="text-sm marketplace-green font-medium mt-1">
            em 12x R$ 79,16
          </p>
          <p className="text-xs marketplace-link mt-0.5 cursor-pointer hover:underline">
            Ver os meios de pagamento
          </p>
        </div>

        <div className="flex items-center gap-2 py-2">
          <img src={fullIcon} alt="Full" className="h-4" />
          <span className="text-xs text-muted-foreground">Enviado pelo</span>
          <span className="text-xs marketplace-green font-medium">FULL</span>
        </div>

        <div className="bg-card rounded-lg p-3 border border-border">
          <p className="text-sm marketplace-green font-medium">Chegará grátis amanhã</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Comprando nas próximas 3h 24min
          </p>
          <p className="text-xs marketplace-link mt-1 cursor-pointer hover:underline">
            Ver mais formas de entrega
          </p>
        </div>

        <div>
          <p className="text-sm text-foreground font-medium">Cor: <span className="font-normal">{colors[selectedColor]}</span></p>
          <div className="flex gap-2 mt-2">
            {colors.map((cor, i) => (
              <button
                key={cor}
                onClick={() => setSelectedColor(i)}
                className={`px-3 py-1.5 text-xs rounded border transition-all ${
                  i === selectedColor
                    ? "border-[hsl(var(--marketplace-blue))] marketplace-link font-medium bg-[hsl(var(--marketplace-light-blue))]"
                    : "border-border text-muted-foreground hover:border-foreground"
                }`}
              >
                {cor}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-foreground font-medium">Estoque disponível</p>
          <button
            onClick={() => setShowQuantitySheet(true)}
            className="mt-2 flex items-center gap-2 border border-border rounded px-3 py-2 text-sm bg-card hover:bg-muted/50 transition-colors"
          >
            <span className="text-muted-foreground">Quantidade:</span>
            <span className="font-medium text-foreground">{quantity} {quantity === 1 ? "unidade" : "unidades"}</span>
            <span className="text-xs text-muted-foreground">(+50 disponíveis)</span>
          </button>
        </div>

        <div className="space-y-2 pt-2">
          <button className="marketplace-btn-primary">Comprar agora</button>
          <button className="marketplace-btn-secondary">Adicionar ao carrinho</button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <button className="flex items-center gap-1 text-xs marketplace-link hover:underline">
            <Heart className="w-4 h-4" />
            Favoritar
          </button>
          <button className="flex items-center gap-1 text-xs marketplace-link hover:underline">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Bottom Sheet - Quantity Selector */}
      {showQuantitySheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setShowQuantitySheet(false)}
          />
          <div className="relative w-full max-w-lg bg-card rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Selecionar quantidade</h3>
              <button onClick={() => setShowQuantitySheet(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Minus className="w-4 h-4 text-foreground" />
              </button>
              <span className="text-3xl font-semibold text-foreground w-16 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(50, quantity + 1))}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Plus className="w-4 h-4 text-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-4">(+50 disponíveis)</p>
            <button
              onClick={() => setShowQuantitySheet(false)}
              className="marketplace-btn-primary"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
