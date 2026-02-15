import chatIcon from "@/assets/icons/icon-11.png";
import clockIcon from "@/assets/icons/icon-15.png";
import medalIcon from "@/assets/icons/icon-10.png";
import shieldIcon from "@/assets/icons/icon-17.png";

const SellerInfo = () => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">Informações sobre o vendedor</h3>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <span className="text-lg font-bold text-muted-foreground">E</span>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">ELETRO CASA OFICIAL</p>
          <p className="text-xs marketplace-link">MercadoLíder Platinum</p>
        </div>
      </div>

      <div className="bg-[hsl(var(--marketplace-gray-light))] rounded-lg p-3 mb-3">
        <div className="flex justify-between text-center">
          <div>
            <p className="text-lg font-bold text-foreground">+10mil</p>
            <p className="text-[10px] text-muted-foreground">Vendas nos últimos<br />60 dias</p>
          </div>
          <div className="border-l border-border" />
          <div>
            <p className="text-lg font-bold marketplace-green">Bom</p>
            <p className="text-[10px] text-muted-foreground">Atendimento</p>
          </div>
          <div className="border-l border-border" />
          <div>
            <p className="text-lg font-bold marketplace-green">No prazo</p>
            <p className="text-[10px] text-muted-foreground">Entregas</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <img src={medalIcon} alt="" className="w-4 h-4" />
          <span className="text-xs text-muted-foreground">MercadoLíder Platinum</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={chatIcon} alt="" className="w-4 h-4" />
          <span className="text-xs text-muted-foreground">Boa reputação</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={clockIcon} alt="" className="w-4 h-4" />
          <span className="text-xs text-muted-foreground">Entrega dentro do prazo</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={shieldIcon} alt="" className="w-4 h-4" />
          <span className="text-xs text-muted-foreground">Compra Garantida</span>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
