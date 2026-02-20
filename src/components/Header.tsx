import { Search, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mlLogo from "@/assets/icons/ml-logo.png";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40">
      <div className="marketplace-header">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            <img
              src={mlLogo}
              alt="Mercado Livre"
              className="h-7 object-contain flex-shrink-0 cursor-pointer"
              onClick={() => navigate("/")}
            />

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar produtos…"
                className="w-full py-2 px-3 pr-9 rounded-md bg-white text-foreground text-sm outline-none shadow-sm"
              />
              <button className="absolute right-0 top-0 h-full px-3">
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <button className="relative flex-shrink-0 p-1" onClick={() => navigate("/carrinho")}>
              <ShoppingCart className="w-6 h-6 text-foreground/80" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[hsl(var(--destructive))] text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-5 mt-2 text-xs text-foreground/80">
            <button className="hover:text-foreground">Categorias</button>
            <button className="hover:text-foreground">Ofertas</button>
            <button className="hover:text-foreground">Histórico</button>
            <button className="hover:text-foreground">Supermercado</button>
            <button className="hover:text-foreground">Moda</button>
            <button className="hover:text-foreground">Vender</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
