import { Search, MapPin, ShoppingCart, Heart, Bell, ChevronDown } from "lucide-react";
import mlLogo from "@/assets/icons/icon-8.png";

const Header = () => {
  return (
    <header>
      <div className="marketplace-header">
        <div className="max-w-[1200px] mx-auto px-4 py-2">
          <div className="flex items-center gap-4">
            <img src={mlLogo} alt="Logo" className="h-9 object-contain" />
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar produtos, marcas e muito mais…"
                className="w-full py-2.5 px-4 pr-12 rounded-sm bg-card text-foreground text-sm border-none outline-none shadow-sm"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-transparent border-l border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm text-foreground/80">
              <button className="flex items-center gap-1 hover:text-foreground">
                <span>Categorias</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="hover:text-foreground">Ofertas</button>
              <button className="hover:text-foreground">Histórico</button>
              <button className="hover:text-foreground">Supermercado</button>
              <button className="hover:text-foreground">Moda</button>
              <button className="hover:text-foreground">Vender</button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1.5 text-xs text-foreground/70">
            <MapPin className="w-3 h-3" />
            <span>Enviar para São Paulo - SP</span>
          </div>
        </div>
      </div>

      <div className="bg-card border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="marketplace-link hover:underline">Eletrônicos</a>
            <a href="#" className="marketplace-link hover:underline">Eletrodomésticos</a>
            <a href="#" className="marketplace-link hover:underline">Fogões</a>
          </div>
          <div className="flex items-center gap-4">
            <Heart className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
            <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground" />
              <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
