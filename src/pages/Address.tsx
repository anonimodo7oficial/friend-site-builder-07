import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handshakeLogo from "@/assets/icons/handshake-logo.png";

const STATES = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG",
  "PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

const Address = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/frete");
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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
          <h1 className="text-2xl font-bold text-foreground leading-snug mb-6">
            Adicione um endereço
          </h1>

          <Field label="Nome completo" value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Telefone" value={form.phone} onChange={(v) => update("phone", v)} type="tel" />

          <div className="pt-2">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-base text-foreground font-medium">CEP</span>
              <button type="button" className="text-sm font-semibold" style={{ color: "hsl(217, 89%, 61%)" }}>
                Não sei meu CEP
              </button>
            </div>
            <input
              type="text"
              value={form.cep}
              onChange={(e) => update("cep", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
              required
            />
          </div>

          <Field label="Rua/Avenida" value={form.street} onChange={(v) => update("street", v)} />
          <Field label="Número" value={form.number} onChange={(v) => update("number", v)} />
          <Field label="Complemento (opcional)" value={form.complement} onChange={(v) => update("complement", v)} required={false} />
          <Field label="Bairro" value={form.neighborhood} onChange={(v) => update("neighborhood", v)} />
          <Field label="Cidade" value={form.city} onChange={(v) => update("city", v)} />

          {/* State select */}
          <div>
            <label className="text-base text-foreground font-medium mb-2 block">Estado</label>
            <select
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              className="w-fit min-w-[80px] border border-gray-300 rounded-lg px-4 py-3.5 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors bg-white"
              required
            >
              <option value="">UF</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-full text-white font-semibold text-lg transition-colors"
              style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
            >
              Continuar
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center leading-relaxed pt-2">
            Termos e condições Como cuidamos da sua privacidade Acessibilidade Informações sobre seguros Blog Afiliados Tendências
            <br />
            Mercado Livre LTDA 03.007.331/0001-41
          </p>
        </form>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) => (
  <div>
    <label className="text-base text-foreground font-medium mb-2 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-3.5 text-foreground text-base outline-none focus:border-[hsl(var(--marketplace-blue))] transition-colors"
      required={required}
    />
  </div>
);

export default Address;
