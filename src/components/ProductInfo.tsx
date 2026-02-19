import { useState } from "react";
import { Star, Share2, Heart, X, Minus, Plus, MapPin, Truck, Clock, ChevronRight } from "lucide-react";
import fullIcon from "@/assets/icons/icon-18.png";

const colors = ["Preto", "Branco", "Inox"];

const ProductInfo = () => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySheet, setShowQuantitySheet] = useState(false);
  const [showDeliverySheet, setShowDeliverySheet] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

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
          <button
            onClick={() => setShowDeliverySheet(true)}
            className="text-xs marketplace-link mt-1 cursor-pointer hover:underline block"
          >
            Ver mais formas de entrega
          </button>
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
          <button
            onClick={() => setFavorited((v) => !v)}
            className="flex items-center gap-1 text-xs marketplace-link hover:underline transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
            {favorited ? "Favoritado" : "Favoritar"}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-xs marketplace-link hover:underline"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Toast: link copiado */}
      {showShareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background text-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <Share2 className="w-4 h-4" />
          Link do produto copiado!
        </div>
      )}

      {/* Bottom Sheet - Quantidade */}
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

      {/* Bottom Sheet - Entrega */}
      {showDeliverySheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setShowDeliverySheet(false)}
          />
          <div className="relative w-full max-w-lg bg-card rounded-t-2xl animate-in slide-in-from-bottom duration-300">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-muted rounded-full" />
            </div>

            <div className="px-5 pb-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-foreground">Formas de entrega</h3>
                <button onClick={() => setShowDeliverySheet(false)}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* CEP */}
              <div className="flex items-center gap-2 bg-muted/40 rounded-lg px-3 py-2.5 mb-5 border border-border">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-muted-foreground flex-1">Calcular para seu CEP</span>
                <button className="text-xs marketplace-link font-medium">Alterar</button>
              </div>

              {/* Única opção */}
              <div className="border border-[hsl(var(--marketplace-blue))] rounded-xl p-4 bg-[hsl(var(--marketplace-light-blue))]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[hsl(var(--marketplace-blue))] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Truck className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">Entregas do Mercado Livre</p>
                      <span className="text-sm marketplace-green font-bold">Grátis</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs marketplace-green font-medium">Chegará amanhã</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      Entrega realizada pela frota própria do Mercado Livre, com rastreamento em tempo real e garantia de entrega.
                    </p>
                    <div className="flex items-center gap-1.5 mt-2.5 bg-white/70 rounded-lg px-2.5 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--marketplace-green))]" />
                      <span className="text-[11px] text-muted-foreground">Disponível para sua localização</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                No momento, apenas a entrega via <span className="font-medium text-foreground">Entregas do Mercado Livre</span> está disponível para este produto.
              </p>

              <button
                onClick={() => setShowDeliverySheet(false)}
                className="marketplace-btn-primary mt-5"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
