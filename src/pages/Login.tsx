import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handshakeLogo from "@/assets/icons/handshake-logo.png";
import { User, X } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "password">("email");
  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setStep("password");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend — just visual for now
  };

  const handleBack = () => {
    setStep("email");
    setPassword("");
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
        {step === "email" ? (
          <form onSubmit={handleContinue} className="max-w-md mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-foreground leading-snug">
              Digite seu e-mail ou telefone para iniciar sessão
            </h1>

            <div>
              <label className="text-base text-foreground mb-2 block">
                E-mail ou telefone
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-4 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full text-white font-semibold text-lg transition-colors"
              style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
            >
              Continuar
            </button>

            <button
              type="button"
              onClick={() => {}}
              className="w-full text-center text-base font-semibold"
              style={{ color: "hsl(217, 89%, 61%)" }}
            >
              Criar conta
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-foreground leading-snug">
              Agora, sua senha
            </h1>

            {/* Email chip */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2.5 w-fit">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-foreground">{email}</span>
              <button type="button" onClick={handleBack}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div>
              <label className="text-base text-foreground mb-2 block">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-4 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full text-white font-semibold text-lg transition-colors"
              style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
