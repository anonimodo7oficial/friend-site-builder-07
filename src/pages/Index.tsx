import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import SellerInfo from "@/components/SellerInfo";
import PaymentMethods from "@/components/PaymentMethods";
import ProductDescription from "@/components/ProductDescription";
import RelatedProducts from "@/components/RelatedProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-4">
          <span className="marketplace-link cursor-pointer hover:underline">Voltar à lista</span>
          <span className="mx-1">|</span>
          <span className="marketplace-link cursor-pointer hover:underline">Eletrodomésticos</span>
          <span className="mx-1">›</span>
          <span className="marketplace-link cursor-pointer hover:underline">Fogões</span>
          <span className="mx-1">›</span>
          <span className="marketplace-link cursor-pointer hover:underline">Industriais</span>
        </nav>

        {/* Produto principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Galeria */}
          <div className="lg:col-span-5">
            <ProductGallery />
          </div>

          {/* Info do produto */}
          <div className="lg:col-span-4">
            <ProductInfo />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <SellerInfo />
            <PaymentMethods />
          </div>
        </div>

        {/* Descrição e produtos relacionados */}
        <div className="mt-8 space-y-6">
          <ProductDescription />
          <RelatedProducts />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
