import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import HIJAB_STYLES from "../../data/hijabStyles";
import StyleCard   from "../../components/StyleCard/StyleCard";
import StyleModal  from "../../components/StyleModal/StyleModal";
import Toast       from "../../components/Toast/Toast";
import "./Home.css";

// ── Home Page ─────────────────────────────────────────────────────────────────
function Home() {
  // reviews[styleId] = [ ...reviewObjects ]
  const [reviews,     setReviews]     = useState({});
  const [activeStyle, setActiveStyle] = useState(null); // style object or null
  const [toast,       setToast]       = useState("");

  // ── Real-time Firestore listeners for every style ──────────────────────────
  useEffect(() => {
    const unsubs = HIJAB_STYLES.map((style) => {
      const q = query(
        collection(db, "reviews", style.id, "entries"),
        orderBy("createdAt", "desc")
      );
      return onSnapshot(q, (snap) => {
        setReviews((prev) => ({
          ...prev,
          [style.id]: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
        }));
      });
    });

    // Cleanup all listeners on unmount
    return () => unsubs.forEach((u) => u());
  }, []);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <header className="hsg-hero">
        <h1>Hijab Styles Gallery</h1>
        <p>Discover beautiful hijab styles — read reviews, share your experience, and inspire others.</p>
      </header>

      {/* Cards Grid */}
      <main className="hsg-grid">
        {HIJAB_STYLES.map((style) => (
          <StyleCard
            key={style.id}
            style={style}
            reviews={reviews[style.id] || []}
            onClick={() => setActiveStyle(style)}
          />
        ))}
      </main>

      {/* Style detail + review modal */}
      {activeStyle && (
        <StyleModal
          style={activeStyle}
          reviews={reviews[activeStyle.id] || []}
          onClose={() => setActiveStyle(null)}
          onToast={showToast}
        />
      )}

      {/* Toast */}
      <Toast message={toast} />
    </div>
  );
}

export default Home;
