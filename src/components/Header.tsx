import { Search, ShoppingCart, Menu } from "lucide-react";
import mlLogo from "@/assets/icons/ml-logo.png";

const Header = () => {
  return (
    <header>
      <div className="marketplace-header">
        <div className="max-w-[1200px] mx-auto px-3 py-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <img src={mlLogo} alt="Mercado Livre" className="h-8 sm:h-10 object-contain" />
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar produtos, marcas e muito mais…"
                className="w-full py-2 sm:py-2.5 px-3 sm:px-4 pr-10 sm:pr-12 rounded-sm bg-card text-foreground text-sm border-none outline-none shadow-sm"
              />
              <button className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-transparent border-l border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-foreground/80 cursor-pointer hover:text-foreground" />
              <Menu className="w-5 h-5 text-foreground/80 cursor-pointer hover:text-foreground md:hidden" />
            </div>
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
