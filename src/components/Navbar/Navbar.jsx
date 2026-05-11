import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

// ── Navbar ────────────────────────────────────────────────────────────────────
// Desktop  → shows buttons inline
// Mobile   → shows hamburger ☰ that toggles a dropdown

function Navbar({ onToast }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    onToast("Signed out. See you soon! ");
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="hsg-nav">
      {/* Brand */}
      <Link to="/" className="hsg-nav-brand" onClick={closeMenu}>
        ✦ Hijab Gallery
      </Link>

      {/* ── Desktop actions (hidden on small screens) ── */}
      <div className="hsg-nav-actions desktop-actions">
        {user ? (
          <>
            <div className="user-chip">
              👤 {user.displayName || user.email?.split("@")[0]}
            </div>
            <button className="btn-outline-gold" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn-outline-gold">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn-gold">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      {/* ── Hamburger button (visible on small screens only) ── */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* ── Mobile dropdown ── */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        {user ? (
          <>
            <div className="mobile-user-chip">
              👤 {user.displayName || user.email?.split("@")[0]}
            </div>
            <button
              className="mobile-btn mobile-btn-outline"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              <button className="mobile-btn mobile-btn-outline">Log In</button>
            </Link>
            <Link to="/signup" onClick={closeMenu}>
              <button className="mobile-btn mobile-btn-gold">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
