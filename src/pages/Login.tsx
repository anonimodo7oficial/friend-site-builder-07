import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mlLogo from "@/assets/icons/ml-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend — just visual for now
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--marketplace-yellow))] flex flex-col">
      {/* Top bar with logo */}
      <div className="px-4 pt-4 pb-2">
        <img
          src={mlLogo}
          alt="Mercado Livre"
          className="h-10 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Login card */}
      <div className="flex-1 flex items-start justify-center px-4 pt-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
            Digite seu e-mail ou telefone para iniciar sessão
          </h1>

          <form onSubmit={handleContinue} className="space-y-5">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                E-mail ou telefone
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border rounded-lg px-4 py-3 text-foreground text-sm outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-md text-white font-semibold text-base transition-colors"
              style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
            >
              Continuar
            </button>
          </form>

          <button
            onClick={() => {}}
            className="w-full text-center text-sm font-medium"
            style={{ color: "hsl(217, 89%, 61%)" }}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
