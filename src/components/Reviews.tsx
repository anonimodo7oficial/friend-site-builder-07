import { useState } from "react";
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
  const [helpfulClicked, setHelpfulClicked] = useState<Record<number, boolean>>({});

  const ratingDistribution = [
    { stars: 5, percent: 65 },
    { stars: 4, percent: 22 },
    { stars: 3, percent: 8 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ];

  const toggleHelpful = (i: number) => {
    setHelpfulClicked((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Opiniões do produto</h2>
      </div>

      {/* Summary - mobile optimized */}
      <div className="p-4 sm:p-5 border-b border-border">
        <div className="flex items-center gap-4">
          {/* Score */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <span className="text-4xl font-light text-foreground">{avgRating}</span>
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i <= Math.round(avgRating)
                      ? "fill-[hsl(var(--marketplace-blue))] text-[hsl(var(--marketplace-blue))]"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 text-center">{totalReviews} avaliações</span>
          </div>

          {/* Bars */}
          <div className="flex-1 space-y-1">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-1.5">
                <span className="text-[10px] text-muted-foreground w-5 text-right">{r.stars}</span>
                <Star className="w-2.5 h-2.5 fill-[hsl(var(--marketplace-blue))] text-[hsl(var(--marketplace-blue))] flex-shrink-0" />
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[hsl(var(--marketplace-blue))] rounded-full"
                    style={{ width: `${r.percent}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground w-7 text-right">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="divide-y divide-border">
        {reviews.map((review, i) => (
          <div key={i} className="p-4 sm:p-5">
            {/* Header da review */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {/* Avatar inicial */}
                <div className="w-7 h-7 rounded-full bg-[hsl(var(--marketplace-light-blue))] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-semibold text-[hsl(var(--marketplace-blue))]">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground leading-none">{review.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{review.date}</p>
                </div>
              </div>
              {/* Estrelas */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3 h-3 ${
                      s <= review.rating
                        ? "fill-[hsl(var(--marketplace-blue))] text-[hsl(var(--marketplace-blue))]"
                        : "text-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-foreground leading-relaxed mb-3">{review.text}</p>

            {/* Útil */}
            <button
              onClick={() => toggleHelpful(i)}
              className={`flex items-center gap-1.5 text-xs transition-colors px-2.5 py-1 rounded-full border ${
                helpfulClicked[i]
                  ? "border-[hsl(var(--marketplace-blue))] text-[hsl(var(--marketplace-blue))] bg-[hsl(var(--marketplace-light-blue))]"
                  : "border-border text-muted-foreground hover:border-foreground/40"
              }`}
            >
              <ThumbsUp
                className={`w-3 h-3 ${helpfulClicked[i] ? "fill-[hsl(var(--marketplace-blue))]" : ""}`}
              />
              Útil ({helpfulClicked[i] ? review.helpful + 1 : review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
