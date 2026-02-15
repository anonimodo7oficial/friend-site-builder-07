import { Star, ThumbsUp } from "lucide-react";

const reviews = [
  {
    name: "Carlos M.",
    date: "Há 3 dias",
    rating: 5,
    text: "Excelente fogão! Muito potente e bonito. Chegou antes do prazo e muito bem embalado. Recomendo demais!",
    helpful: 12,
  },
  {
    name: "Ana Paula S.",
    date: "Há 1 semana",
    rating: 4,
    text: "Bom produto, funciona muito bem. Só achei que poderia vir com mais acessórios. Mas no geral, ótimo custo-benefício.",
    helpful: 8,
  },
  {
    name: "Roberto L.",
    date: "Há 2 semanas",
    rating: 5,
    text: "Melhor fogão que já tive! Super potente, as grades são de ferro fundido de verdade. Forno aquece muito rápido.",
    helpful: 23,
  },
  {
    name: "Fernanda C.",
    date: "Há 3 semanas",
    rating: 4,
    text: "Atendeu minhas expectativas. Bonito e funcional. A entrega foi rápida. Só tirei uma estrela pelo manual que é meio confuso.",
    helpful: 5,
  },
];

const Reviews = () => {
  const avgRating = 4.2;
  const totalReviews = 142;
  const ratingDistribution = [
    { stars: 5, percent: 65 },
    { stars: 4, percent: 22 },
    { stars: 3, percent: 8 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];

  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-5">Opiniões do produto</h2>

      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-border">
        <div className="flex flex-col items-center justify-center min-w-[120px]">
          <span className="text-5xl font-light text-foreground">{avgRating}</span>
          <div className="flex gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i <= Math.round(avgRating) ? "fill-primary text-primary" : "text-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground mt-1">{totalReviews} avaliações</span>
        </div>

        <div className="flex-1 space-y-1.5">
          {ratingDistribution.map((r) => (
            <div key={r.stars} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-12">{r.stars} estrelas</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[hsl(var(--marketplace-blue))] rounded-full transition-all"
                  style={{ width: `${r.percent}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">{r.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-5">
        {reviews.map((review, i) => (
          <div key={i} className={`${i < reviews.length - 1 ? "pb-5 border-b border-border" : ""}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${
                      s <= review.rating ? "fill-primary text-primary" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-2">{review.text}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{review.name}</span>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ThumbsUp className="w-3 h-3" />
                Útil ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-5 py-2.5 text-sm marketplace-link font-medium hover:underline">
        Ver todas as {totalReviews} avaliações
      </button>
    </div>
  );
};

export default Reviews;
