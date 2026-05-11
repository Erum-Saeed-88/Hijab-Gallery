import "./ReviewList.css";

// ── Helper: relative time ─────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = (Date.now() - d) / 1000;
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString();
}

// ── ReviewList ────────────────────────────────────────────────────────────────
// Props:
//   reviews  — array of review objects

function ReviewList({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <div className="no-reviews">No reviews yet — be the first! 🌸</div>
    );
  }

  return (
    <div className="reviews-list">
      {reviews.map((r) => (
        <div key={r.id} className="review-item">
          <div className="review-meta">
            <span className="review-author">{r.author}</span>
            <span className="review-stars">
              {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
            </span>
          </div>
          <div className="review-text">{r.text}</div>
          <div className="review-date">{timeAgo(r.createdAt)}</div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
