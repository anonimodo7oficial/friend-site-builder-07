import visaIcon from "@/assets/icons/icon-2.png";
import mastercardIcon from "@/assets/icons/icon-13.png";
import amexIcon from "@/assets/icons/icon-19.png";
import eloIcon from "@/assets/icons/icon-6.png";
import hipercardIcon from "@/assets/icons/icon-4.png";
import boletoIcon from "@/assets/icons/icon-7.png";
import pixIcon from "@/assets/icons/icon-12.png";
import caixaIcon from "@/assets/icons/icon-20.png";
import mercadoCreditoIcon from "@/assets/icons/icon-14.png";

const PaymentMethods = () => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">Meios de pagamento</h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Cartões de crédito</p>
          <p className="text-xs text-muted-foreground mb-1.5">Até 12x sem juros</p>
          <div className="flex flex-wrap gap-2">
            {[visaIcon, mastercardIcon, amexIcon, eloIcon, hipercardIcon].map((icon, i) => (
              <img key={i} src={icon} alt="Cartão" className="h-7 object-contain" />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Cartões de débito</p>
          <div className="flex flex-wrap gap-2">
            {[visaIcon, mastercardIcon, caixaIcon].map((icon, i) => (
              <img key={i} src={icon} alt="Débito" className="h-7 object-contain" />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">Outros meios</p>
          <div className="flex flex-wrap gap-2">
            <img src={pixIcon} alt="Pix" className="h-7 object-contain" />
            <img src={boletoIcon} alt="Boleto" className="h-7 object-contain" />
            <img src={mercadoCreditoIcon} alt="Mercado Crédito" className="h-7 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
