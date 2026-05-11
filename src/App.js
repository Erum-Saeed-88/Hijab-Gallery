import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar    from "./components/Navbar/Navbar";
import Toast     from "./components/Toast/Toast";
import Footer from './components/Footer/Footer'

// Pages
import Home   from "./pages/Home/Home";
import Login  from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

// Global styles
import "./index.css";

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navbar is always visible on every page */}
        <Navbar onToast={showToast} />

        {/* Page routes */}
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        {/* Global toast (for auth messages from Navbar) */}
        <Toast message={toast} />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
