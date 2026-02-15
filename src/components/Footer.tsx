import handshakeIcon from "@/assets/icons/icon-16.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-8">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-2">Sobre</p>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline">Mercado Livre</a></li>
              <li><a href="#" className="hover:underline">Investor relations</a></li>
              <li><a href="#" className="hover:underline">Tendências</a></li>
              <li><a href="#" className="hover:underline">Sustentabilidade</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Outros sites</p>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline">Developers</a></li>
              <li><a href="#" className="hover:underline">Mercado Pago</a></li>
              <li><a href="#" className="hover:underline">Mercado Envios</a></li>
              <li><a href="#" className="hover:underline">Mercado Shops</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Contato</p>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline">Comprar</a></li>
              <li><a href="#" className="hover:underline">Vender</a></li>
              <li><a href="#" className="hover:underline">Segurança</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-2">Redes sociais</p>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={handshakeIcon} alt="Logo" className="h-5" />
            <span className="text-[11px] text-muted-foreground">Copyright © 2024. Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
