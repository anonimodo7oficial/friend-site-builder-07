import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAdmin) navigate("/admin", { replace: true });
  }, [loading, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let { error } = await supabase.auth.signInWithPassword({ email, password });

    // First-time setup: try to create the account if it doesn't exist yet
    if (error && /Invalid login credentials/i.test(error.message)) {
      const signUp = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (!signUp.error) {
        const retry = await supabase.auth.signInWithPassword({ email, password });
        error = retry.error;
      } else {
        error = signUp.error;
      }
    }

    setSubmitting(false);

    if (error) {
      toast({ title: "Falha no acesso", description: "Credenciais inválidas.", variant: "destructive" });
      return;
    }

    // Verify admin
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) return;
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .eq("role", "admin")
      .maybeSingle();
    if (!role) {
      await supabase.auth.signOut();
      toast({ title: "Acesso negado", description: "Esta conta não é administradora.", variant: "destructive" });
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
        <h1 className="text-xl font-bold text-foreground text-center">Acesso restrito</h1>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          className="w-full border border-border rounded-lg px-3 py-3 bg-background text-foreground outline-none focus:border-foreground/40"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="w-full border border-border rounded-lg px-3 py-3 bg-background text-foreground outline-none focus:border-foreground/40"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
        >
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
