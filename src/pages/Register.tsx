import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handshakeLogo from "@/assets/icons/handshake-logo.png";
import { Mail, User, Smartphone, Lock } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual only — navigate to address
    navigate("/endereco");
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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-7">
          <h1 className="text-2xl font-bold text-foreground leading-snug">
            Complete os dados para criar sua conta
          </h1>

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="mt-8 flex-shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-[hsl(217,89%,61%)] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[hsl(217,89%,61%)]" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-base font-semibold text-foreground mb-2 block">
                Adicione seu e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: seuemail@exemplo.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
                required
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex items-start gap-3">
            <div className="mt-8 flex-shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-[hsl(217,89%,61%)] flex items-center justify-center">
                <User className="w-5 h-5 text-[hsl(217,89%,61%)]" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-base font-semibold text-foreground mb-2 block">
                Seu nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Maria da Silva"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="mt-8 flex-shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-[hsl(217,89%,61%)] flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[hsl(217,89%,61%)]" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-base font-semibold text-foreground mb-2 block">
                Adicione seu telefone/WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 11 9 9999-9999"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex items-start gap-3">
            <div className="mt-8 flex-shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-[hsl(217,89%,61%)] flex items-center justify-center">
                <Lock className="w-5 h-5 text-[hsl(217,89%,61%)]" />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-base font-semibold text-foreground mb-2 block">
                Crie sua senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
                required
              />
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <button
              type="submit"
              className="w-full py-4 rounded-full text-white font-semibold text-lg transition-colors"
              style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
            >
              Criar minha conta
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full text-center text-base font-semibold"
              style={{ color: "hsl(217, 89%, 61%)" }}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
