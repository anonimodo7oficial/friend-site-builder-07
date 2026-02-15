import handshakeIcon from "@/assets/icons/icon-16.png";
import shieldSmIcon from "@/assets/icons/icon-5.png";

const ProductDescription = () => {
  return (
    <div className="space-y-6">
      {/* Garantias */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <img src={handshakeIcon} alt="" className="h-6" />
          <div>
            <p className="text-sm font-semibold text-foreground">Compra Garantida com o Mercado Pago</p>
            <p className="text-xs text-muted-foreground">Receba o produto que está esperando ou devolvemos o dinheiro</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img src={shieldSmIcon} alt="" className="h-5" />
          <div>
            <p className="text-sm font-medium text-foreground">Devolução grátis</p>
            <p className="text-xs text-muted-foreground">Você tem 30 dias a partir do recebimento</p>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Descrição</h2>
        <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
          <p>
            Fogão Industrial 4 Bocas com Forno, ideal para quem busca praticidade e potência no dia a dia da cozinha. 
            Com design moderno em preto, combina com qualquer ambiente.
          </p>
          <p className="font-medium text-foreground">Características:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>4 queimadores industriais de alta performance</li>
            <li>Forno amplo com grill</li>
            <li>Acendimento automático</li>
            <li>Grades de ferro fundido removíveis</li>
            <li>Bandeja coletora de resíduos</li>
            <li>Sistema de segurança contra vazamento de gás</li>
            <li>Baixa pressão - funciona com gás de cozinha (GLP)</li>
          </ul>
          <p className="font-medium text-foreground">Dimensões:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Altura: 84 cm</li>
            <li>Largura: 56 cm</li>
            <li>Profundidade: 60 cm</li>
            <li>Peso: 28 kg</li>
          </ul>
        </div>
      </div>

      {/* Ficha técnica */}
      <div className="rounded-lg overflow-hidden border border-border">
        <h2 className="text-lg font-semibold text-foreground p-4 bg-card">Ficha técnica</h2>
        <div>
          {[
            ["Marca", "Industrial Cook"],
            ["Modelo", "IC-4000P"],
            ["Cor", "Preto"],
            ["Material", "Aço inox"],
            ["Número de bocas", "4"],
            ["Tipo de forno", "Convencional com grill"],
            ["Tipo de gás", "GLP (baixa pressão)"],
            ["Voltagem", "Bivolt"],
            ["Garantia", "12 meses"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`flex py-3 px-4 text-sm ${
                index % 2 === 0 ? "bg-[hsl(var(--marketplace-gray-light))]" : "bg-card"
              }`}
            >
              <span className="w-1/2 text-muted-foreground font-medium">{label}</span>
              <span className="w-1/2 text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
