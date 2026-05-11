import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "./Auth.css";

// ── Login Page ────────────────────────────────────────────────────────────────
const ERROR_MESSAGES = {
  "auth/wrong-password":  "Incorrect password. Please try again.",
  "auth/user-not-found":  "No account found with this email.",
  "auth/invalid-email":   "Please enter a valid email address.",
};

function Login() {
  const navigate = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");  // ← redirect to home after login
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Decorative header */}
        <div className="auth-card-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your Hijab Gallery account</p>
        </div>

        <div className="auth-card-body">
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <><span className="spinner" />Signing in...</> : "Log In"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
