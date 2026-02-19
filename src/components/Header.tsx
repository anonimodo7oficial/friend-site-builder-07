import { Search, ShoppingCart, ChevronLeft } from "lucide-react";
import mlLogo from "@/assets/icons/ml-logo.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-40">
      <div className="marketplace-header">
        <div className="px-3 py-2">
          {/* Mobile: logo + search + cart */}
          <div className="flex items-center gap-2">
            <img src={mlLogo} alt="Mercado Livre" className="h-7 object-contain flex-shrink-0" />
            
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

            <button className="relative flex-shrink-0 p-1">
              <ShoppingCart className="w-6 h-6 text-foreground/80" />
            </button>
          </div>

          {/* Desktop nav */}
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
