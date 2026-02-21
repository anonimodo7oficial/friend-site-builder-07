import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handshakeLogo from "@/assets/icons/handshake-logo.png";
import { MapPin } from "lucide-react";

const Shipping = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"standard" | "express">("standard");

  // Calculate delivery dates
  const today = new Date();
  const standardDate = new Date(today);
  standardDate.setDate(today.getDate() + 5);
  const expressDate = new Date(today);
  expressDate.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    const days = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    return `${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Yellow header */}
      <div className="bg-[hsl(var(--marketplace-yellow))] px-5 py-4">
        <img
          src={handshakeLogo}
          alt="Mercado Livre"
          className="h-12 w-12 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* White content */}
      <div className="flex-1 bg-white px-6 pt-8 pb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-foreground leading-snug mb-4">
            Escolha a forma de entrega
          </h1>

          {/* Address reference */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Envio para seu endereço</span>
          </div>

          {/* Shipping options card */}
          <div className="border border-gray-200 rounded-xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-foreground text-base">Envio</span>
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                ⚡ FULL
              </span>
            </div>

            {/* Standard - Free */}
            <label className="flex items-start gap-3 cursor-pointer mb-4">
              <input
                type="radio"
                name="shipping"
                checked={selected === "standard"}
                onChange={() => setSelected("standard")}
                className="mt-1 w-5 h-5 accent-[hsl(217,89%,61%)]"
              />
              <div className="flex-1 flex items-start justify-between">
                <span className="text-sm text-foreground leading-snug">
                  Chegará {formatDate(standardDate)}
                </span>
                <span className="text-sm font-semibold text-green-600 ml-2 flex-shrink-0">
                  Grátis
                </span>
              </div>
            </label>

            {/* Express */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                checked={selected === "express"}
                onChange={() => setSelected("express")}
                className="mt-1 w-5 h-5 accent-[hsl(217,89%,61%)]"
              />
              <div className="flex-1 flex items-start justify-between">
                <span className="text-sm font-semibold" style={{ color: "hsl(217, 89%, 61%)" }}>
                  Chegará amanhã
                </span>
                <span className="text-sm text-foreground ml-2 flex-shrink-0">
                  R$ 19,90
                </span>
              </div>
            </label>
          </div>

          {/* Frete summary */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg text-foreground">Frete</span>
            <span className="text-lg font-semibold text-green-600">
              {selected === "standard" ? "Grátis" : "R$ 19,90"}
            </span>
          </div>

          <button
            onClick={() => {
              // For now just go back to home
              navigate("/");
            }}
            className="w-full py-4 rounded-full text-white font-semibold text-lg transition-colors"
            style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
          >
            Continuar
          </button>

          <p className="text-xs text-gray-400 text-center leading-relaxed pt-6">
            Termos e condições Como cuidamos da sua privacidade Acessibilidade Informações sobre seguros Blog Afiliados Tendências
            <br />
            Mercado Livre LTDA 03.007.331/0001-41
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
