import "./StyleCard.css";

// ── Helpers ───────────────────────────────────────────────────────────────────
function avgRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

// ── StyleCard ─────────────────────────────────────────────────────────────────
// Props:
//   style    — hijab style object { id, name, description, image, tags }
//   reviews  — array of review objects for this style
//   onClick  — called when card or "Review" button is clicked

function StyleCard({ style, reviews = [], onClick }) {
  const avg = avgRating(reviews);
  const count = reviews.length;

  return (
    <div className="style-card" onClick={onClick}>
      {/* Image */}
      <div className="style-card-img-wrap">
        <img
          src={style.image}
          alt={style.name}
          className="style-card-img"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x220/6B3A2A/FBF0D0?text=${encodeURIComponent(style.name)}`;
          }}
        />
        {/* Tags overlay */}
        <div className="style-card-badge">
          {style.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="style-card-body">
        <h3>{style.name}</h3>
        <p>{style.description}</p>
      </div>

      {/* Footer: rating + review button */}
      <div className="style-card-footer">
        <div>
          <div className="stars-display">
            {"★".repeat(Math.round(avg))}{"☆".repeat(5 - Math.round(avg))}
          </div>
          <div className="review-count">
            {count
              ? `${avg.toFixed(1)} · ${count} review${count !== 1 ? "s" : ""}`
              : "No reviews yet"}
          </div>
        </div>

        <button
          className="btn-crimson"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          Review
        </button>
      </div>
    </div>
  );
}

export default StyleCard;
