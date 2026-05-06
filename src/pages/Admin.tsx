import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { toast } from "@/hooks/use-toast";
import { Trash2, Plus, LogOut, ImagePlus, Star } from "lucide-react";

interface Product {
  id: string;
  title: string;
  description: string | null;
  features: any;
  price: number;
  old_price: number | null;
  installments: number | null;
  seller_name: string | null;
  rating: number | null;
  reviews_count: number | null;
  sales_count: number | null;
  stock: number | null;
  is_active: boolean;
}

interface Variant {
  id: string;
  product_id: string;
  option_name: string;
  option_value: string;
  extra_price: number;
  stock: number;
}

interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  comment: string | null;
  images: any;
}

interface Image {
  id: string;
  product_id: string;
  url: string;
  position: number;
}

const emptyProduct: Omit<Product, "id"> = {
  title: "",
  description: "",
  features: [],
  price: 0,
  old_price: null,
  installments: 12,
  seller_name: "",
  rating: 0,
  reviews_count: 0,
  sales_count: 0,
  stock: 0,
  is_active: true,
};

const Admin = () => {
  const navigate = useNavigate();
  const { loading: authLoading, isAdmin } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Product, "id">>(emptyProduct);
  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate("/admin/login", { replace: true });
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) loadProducts();
  }, [isAdmin]);

  const loadProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts((data as Product[]) ?? []);
  };

  const selectProduct = async (p: Product) => {
    setSelected(p);
    setCreating(false);
    const [v, r, i] = await Promise.all([
      supabase.from("product_variants").select("*").eq("product_id", p.id),
      supabase.from("product_reviews").select("*").eq("product_id", p.id).order("created_at", { ascending: false }),
      supabase.from("product_images").select("*").eq("product_id", p.id).order("position"),
    ]);
    setVariants((v.data as Variant[]) ?? []);
    setReviews((r.data as Review[]) ?? []);
    setImages((i.data as Image[]) ?? []);
  };

  const startCreate = () => {
    setCreating(true);
    setSelected(null);
    setDraft(emptyProduct);
    setFeaturesText("");
  };

  const saveProduct = async () => {
    const features = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);
    if (creating) {
      const { data, error } = await supabase.from("products").insert({ ...draft, features }).select().single();
      if (error) return toast({ title: "Erro", description: error.message, variant: "destructive" });
      toast({ title: "Produto criado" });
      await loadProducts();
      selectProduct(data as Product);
    } else if (selected) {
      const { error } = await supabase.from("products").update({ ...draft, features }).eq("id", selected.id);
      if (error) return toast({ title: "Erro", description: error.message, variant: "destructive" });
      toast({ title: "Produto atualizado" });
      await loadProducts();
    }
  };

  useEffect(() => {
    if (selected) {
      const { id, ...rest } = selected;
      setDraft(rest);
      setFeaturesText(Array.isArray(selected.features) ? selected.features.join("\n") : "");
    }
  }, [selected]);

  const deleteProduct = async (id: string) => {
    if (!confirm("Excluir produto?")) return;
    await supabase.from("products").delete().eq("id", id);
    setSelected(null);
    loadProducts();
  };

  const uploadImage = async (file: File, bucket: "product-images" | "review-images") => {
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file);
    if (error) {
      toast({ title: "Falha no upload", description: error.message, variant: "destructive" });
      return null;
    }
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  };

  const addProductImage = async (file: File) => {
    if (!selected) return;
    const url = await uploadImage(file, "product-images");
    if (!url) return;
    await supabase.from("product_images").insert({ product_id: selected.id, url, position: images.length });
    selectProduct(selected);
  };

  const removeProductImage = async (id: string) => {
    await supabase.from("product_images").delete().eq("id", id);
    if (selected) selectProduct(selected);
  };

  const addVariant = async () => {
    if (!selected) return;
    await supabase.from("product_variants").insert({
      product_id: selected.id,
      option_name: "Cor",
      option_value: "Novo",
      extra_price: 0,
      stock: 0,
    });
    selectProduct(selected);
  };

  const updateVariant = async (id: string, patch: Partial<Variant>) => {
    await supabase.from("product_variants").update(patch).eq("id", id);
    if (selected) selectProduct(selected);
  };

  const removeVariant = async (id: string) => {
    await supabase.from("product_variants").delete().eq("id", id);
    if (selected) selectProduct(selected);
  };

  const [newReview, setNewReview] = useState({ author_name: "", rating: 5, comment: "" });
  const [reviewFiles, setReviewFiles] = useState<File[]>([]);

  const addReview = async () => {
    if (!selected || !newReview.author_name) return;
    const urls: string[] = [];
    for (const f of reviewFiles) {
      const u = await uploadImage(f, "review-images");
      if (u) urls.push(u);
    }
    await supabase.from("product_reviews").insert({
      product_id: selected.id,
      author_name: newReview.author_name,
      rating: newReview.rating,
      comment: newReview.comment,
      images: urls,
    });
    setNewReview({ author_name: "", rating: 5, comment: "" });
    setReviewFiles([]);
    selectProduct(selected);
  };

  const removeReview = async (id: string) => {
    await supabase.from("product_reviews").delete().eq("id", id);
    if (selected) selectProduct(selected);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (authLoading) return <div className="p-8 text-center text-muted-foreground">Carregando...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-lg font-bold text-foreground">Painel Admin</h1>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </header>

      <div className="grid lg:grid-cols-[280px_1fr] gap-4 p-4 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="bg-card border border-border rounded-lg p-3 h-fit">
          <button
            onClick={startCreate}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md font-medium text-white mb-3"
            style={{ backgroundColor: "hsl(217, 89%, 61%)" }}
          >
            <Plus className="w-4 h-4" /> Novo produto
          </button>
          <div className="space-y-1 max-h-[60vh] overflow-y-auto">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => selectProduct(p)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selected?.id === p.id ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {p.title || "(sem título)"}
              </button>
            ))}
            {products.length === 0 && <p className="text-xs text-muted-foreground p-3">Nenhum produto ainda.</p>}
          </div>
        </aside>

        {/* Editor */}
        <main className="space-y-4">
          {(creating || selected) ? (
            <>
              <section className="bg-card border border-border rounded-lg p-4 space-y-3">
                <h2 className="font-semibold text-foreground">{creating ? "Novo produto" : "Editar produto"}</h2>
                <Field label="Título" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Preço" type="number" value={String(draft.price)} onChange={(v) => setDraft({ ...draft, price: parseFloat(v) || 0 })} />
                  <Field label="Preço antigo" type="number" value={String(draft.old_price ?? "")} onChange={(v) => setDraft({ ...draft, old_price: v ? parseFloat(v) : null })} />
                  <Field label="Parcelas" type="number" value={String(draft.installments ?? 12)} onChange={(v) => setDraft({ ...draft, installments: parseInt(v) || 12 })} />
                  <Field label="Estoque" type="number" value={String(draft.stock ?? 0)} onChange={(v) => setDraft({ ...draft, stock: parseInt(v) || 0 })} />
                  <Field label="Vendedor" value={draft.seller_name ?? ""} onChange={(v) => setDraft({ ...draft, seller_name: v })} />
                  <Field label="Nota (0-5)" type="number" value={String(draft.rating ?? 0)} onChange={(v) => setDraft({ ...draft, rating: parseFloat(v) || 0 })} />
                  <Field label="Nº avaliações" type="number" value={String(draft.reviews_count ?? 0)} onChange={(v) => setDraft({ ...draft, reviews_count: parseInt(v) || 0 })} />
                  <Field label="Vendas" type="number" value={String(draft.sales_count ?? 0)} onChange={(v) => setDraft({ ...draft, sales_count: parseInt(v) || 0 })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Descrição</label>
                  <textarea value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={4} className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Características (uma por linha)</label>
                  <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} rows={4} className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm" placeholder="Ex: 4 bocas\nForno embutido\nBivolt" />
                </div>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={draft.is_active} onChange={(e) => setDraft({ ...draft, is_active: e.target.checked })} />
                  Produto ativo
                </label>
                <div className="flex gap-2">
                  <button onClick={saveProduct} className="px-4 py-2 rounded-md text-white font-medium" style={{ backgroundColor: "hsl(217, 89%, 61%)" }}>
                    Salvar
                  </button>
                  {selected && !creating && (
                    <button onClick={() => deleteProduct(selected.id)} className="px-4 py-2 rounded-md border border-destructive text-destructive font-medium">
                      Excluir
                    </button>
                  )}
                </div>
              </section>

              {selected && !creating && (
                <>
                  {/* Images */}
                  <section className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Imagens</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {images.map((img) => (
                        <div key={img.id} className="relative aspect-square bg-muted rounded-md overflow-hidden group">
                          <img src={img.url} alt="" className="w-full h-full object-contain" />
                          <button onClick={() => removeProductImage(img.id)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <label className="aspect-square border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center text-xs text-muted-foreground cursor-pointer hover:bg-muted/50">
                        <ImagePlus className="w-5 h-5 mb-1" /> Adicionar
                        <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && addProductImage(e.target.files[0])} />
                      </label>
                    </div>
                  </section>

                  {/* Variants */}
                  <section className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">Variações</h3>
                      <button onClick={addVariant} className="text-sm flex items-center gap-1 text-primary"><Plus className="w-4 h-4" /> Adicionar</button>
                    </div>
                    <div className="space-y-2">
                      {variants.map((v) => (
                        <div key={v.id} className="grid grid-cols-[1fr_1fr_90px_70px_auto] gap-2 items-center">
                          <input value={v.option_name} onChange={(e) => updateVariant(v.id, { option_name: e.target.value })} placeholder="Opção" className="border border-border rounded px-2 py-1.5 text-sm bg-background" />
                          <input value={v.option_value} onChange={(e) => updateVariant(v.id, { option_value: e.target.value })} placeholder="Valor" className="border border-border rounded px-2 py-1.5 text-sm bg-background" />
                          <input type="number" value={v.extra_price} onChange={(e) => updateVariant(v.id, { extra_price: parseFloat(e.target.value) || 0 })} placeholder="+R$" className="border border-border rounded px-2 py-1.5 text-sm bg-background" />
                          <input type="number" value={v.stock} onChange={(e) => updateVariant(v.id, { stock: parseInt(e.target.value) || 0 })} placeholder="Est" className="border border-border rounded px-2 py-1.5 text-sm bg-background" />
                          <button onClick={() => removeVariant(v.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      {variants.length === 0 && <p className="text-xs text-muted-foreground">Nenhuma variação.</p>}
                    </div>
                  </section>

                  {/* Reviews */}
                  <section className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Avaliações</h3>
                    <div className="border border-border rounded-md p-3 space-y-2 mb-4 bg-muted/30">
                      <div className="grid grid-cols-2 gap-2">
                        <input value={newReview.author_name} onChange={(e) => setNewReview({ ...newReview, author_name: e.target.value })} placeholder="Nome do autor" className="border border-border rounded px-2 py-1.5 text-sm bg-background" />
                        <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })} className="border border-border rounded px-2 py-1.5 text-sm bg-background">
                          {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} estrelas</option>)}
                        </select>
                      </div>
                      <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} placeholder="Comentário" rows={2} className="w-full border border-border rounded px-2 py-1.5 text-sm bg-background" />
                      <input type="file" accept="image/*" multiple onChange={(e) => setReviewFiles(Array.from(e.target.files ?? []))} className="text-xs" />
                      <button onClick={addReview} className="px-3 py-1.5 text-sm rounded text-white" style={{ backgroundColor: "hsl(217, 89%, 61%)" }}>
                        Adicionar avaliação
                      </button>
                    </div>
                    <div className="space-y-3">
                      {reviews.map((r) => (
                        <div key={r.id} className="border border-border rounded-md p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">{r.author_name}</p>
                              <div className="flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-blue-500 text-blue-500" />)}</div>
                            </div>
                            <button onClick={() => removeReview(r.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                          </div>
                          {r.comment && <p className="text-sm text-muted-foreground mt-1">{r.comment}</p>}
                          {Array.isArray(r.images) && r.images.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {r.images.map((u: string, i: number) => (
                                <img key={i} src={u} alt="" className="w-16 h-16 object-cover rounded" />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {reviews.length === 0 && <p className="text-xs text-muted-foreground">Sem avaliações.</p>}
                    </div>
                  </section>
                </>
              )}
            </>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center text-muted-foreground">
              Selecione um produto ou crie um novo.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
    />
  </div>
);

export default Admin;
