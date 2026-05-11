import { useNavigate } from "react-router-dom";
import ReviewList from "../ReviewList/ReviewList";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./StyleModal.css";

// ── Helpers ───────────────────────────────────────────────────────────────────
function avgRating(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

// ── StyleModal ────────────────────────────────────────────────────────────────
// Props:
//   style    — hijab style object
//   reviews  — reviews array (real-time from Firestore)
//   onClose  — close the modal
//   onToast  — show toast notification

function StyleModal({ style, reviews = [], onClose, onToast }) {
  const navigate  = useNavigate();
  const avg       = avgRating(reviews);

  // If user presses Escape
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box">
        {/* Header */}
        <div className="modal-header">
          <h2>{style.name}</h2>
          <p>
            {reviews.length
              ? `${avg.toFixed(1)} ★ average · ${reviews.length} review${reviews.length !== 1 ? "s" : ""}`
              : "Be the first to review"}
          </p>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* All reviews */}
          <ReviewList reviews={reviews} />

          {/* Review form (handles auth state internally) */}
          <ReviewForm
            styleId={style.id}
            onToast={onToast}
            onAuthRequest={() => { onClose(); navigate("/login"); }}
          />
        </div>
      </div>
    </div>
  );
}

export default StyleModal;
