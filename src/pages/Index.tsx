import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import SellerInfo from "@/components/SellerInfo";
import PaymentMethods from "@/components/PaymentMethods";
import ProductDescription from "@/components/ProductDescription";
import RelatedProducts from "@/components/RelatedProducts";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1200px] mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Produto principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
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

        {/* Descrição, produtos relacionados e avaliações */}
        <div className="mt-6 sm:mt-8 space-y-6">
          <ProductDescription />
          <RelatedProducts />
          <Reviews />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
