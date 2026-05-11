import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "./AuthModal.css";

// ── Error code → human message map ───────────────────────────────────────────
const ERROR_MESSAGES = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/wrong-password":       "Incorrect password.",
  "auth/user-not-found":       "No account found with this email.",
  "auth/weak-password":        "Password should be at least 6 characters.",
  "auth/invalid-email":        "Please enter a valid email address.",
};

// ── AuthModal ─────────────────────────────────────────────────────────────────
// Props:
//   initialMode  — "login" | "signup"
//   onClose      — close modal
//   onSuccess    — called with a toast message string on success

function AuthModal({ initialMode = "login", onClose, onSuccess }) {
  const [tab,      setTab]      = useState(initialMode);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const switchTab = (newTab) => { setTab(newTab); setError(""); };

  const handleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onSuccess("Welcome back! ");
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() });
        onSuccess("Account created! Welcome ");
      }
    } catch (e) {
      setError(ERROR_MESSAGES[e.code] || e.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box auth-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2>{tab === "login" ? "Welcome Back" : "Create Account"}</h2>
          <p>Join the Hijab Gallery community</p>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === "login" ? "active" : ""}`}
              onClick={() => switchTab("login")}
            >Log In</button>
            <button
              className={`auth-tab ${tab === "signup" ? "active" : ""}`}
              onClick={() => switchTab("signup")}
            >Sign Up</button>
          </div>

          {/* Error */}
          {error && <div className="auth-error">{error}</div>}

          {/* Name field (signup only) */}
          {tab === "signup" && (
            <div className="form-group">
              <label>Display Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            />
          </div>

          <button
            className="btn-submit"
            onClick={handleAuth}
            disabled={loading || !email || !password}
          >
            {loading
              ? <><span className="spinner" />Please wait...</>
              : tab === "login" ? "Log In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
