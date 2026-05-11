import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import "../Login/Auth.css";

// ── Signup Page ───────────────────────────────────────────────────────────────
const ERROR_MESSAGES = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password":        "Password should be at least 6 characters.",
  "auth/invalid-email":        "Please enter a valid email address.",
};

function Signup() {
  const navigate = useNavigate();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() });
      navigate("/"); // ← redirect to home after signup
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-header">
          <h2>Create Account</h2>
          <p>Join the Hijab Gallery community</p>
        </div>

        <div className="auth-card-body">
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSignup}>
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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <><span className="spinner" />Creating account...</> : "Sign Up"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
