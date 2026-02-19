import mlLogo from "@/assets/icons/ml-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-8">
      <div className="max-w-[1200px] mx-auto px-4 py-5 flex items-center justify-center gap-3">
        <img src={mlLogo} alt="Mercado Livre" className="h-5 object-contain opacity-60" />
        <span className="text-[11px] text-muted-foreground">Copyright © 2024. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;
