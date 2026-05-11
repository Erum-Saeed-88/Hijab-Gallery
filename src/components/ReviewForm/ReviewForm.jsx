import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import "./ReviewForm.css";

// ── ReviewForm ────────────────────────────────────────────────────────────────
// Props:
//   styleId       — Firestore subcollection key
//   onToast       — show toast message
//   onAuthRequest — open auth modal if user not logged in

function ReviewForm({ styleId, onToast, onAuthRequest }) {
  const { user } = useAuth();

  const [rating,     setRating]     = useState(5);
  const [hovered,    setHovered]    = useState(0);
  const [text,       setText]       = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Guest — show login prompt
  if (!user) {
    return (
      <div className="login-prompt">
        <strong>Sign in to post a review</strong>
        <br />
        <span>Share your experience with the community!</span>
        <br />
        <button className="btn-crimson" style={{ marginTop: "0.75rem" }} onClick={onAuthRequest}>
          Log In / Sign Up
        </button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "reviews", styleId, "entries"), {
        uid:       user.uid,
        author:    user.displayName || user.email?.split("@")[0] || "Anonymous",
        rating,
        text:      text.trim(),
        createdAt: serverTimestamp(),
      });
      setText("");
      setRating(5);
      onToast("Review posted! Thank you ✨");
    } catch {
      onToast("Error posting review. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="review-form-title">Write a Review</div>

      {/* Star picker */}
      <div className="form-group">
        <label>Your Rating</label>
        <div className="star-picker">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              className={`star-btn ${s <= (hovered || rating) ? "active" : ""}`}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(s)}
            >★</button>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="form-group">
        <label>Your Review</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Share your experience with this hijab style..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button
        className="btn-submit"
        onClick={handleSubmit}
        disabled={submitting || !text.trim()}
      >
        {submitting ? <><span className="spinner" />Posting...</> : "Post Review"}
      </button>
    </>
  );
}

export default ReviewForm;
