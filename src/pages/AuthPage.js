// AuthPage.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ParticlesBackground from "../Components/ParticlesBackground";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

export default function AuthPage() {
  const navigate = useNavigate();
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const reset = () => {
    setErr("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    reset();

    if (!email || !password) {
      setErr("Please enter email and password.");
      return;
    }
    if (isSignUp && password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, name || undefined);
      } else {
        await signIn(email, password);
      }
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(error.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setErr("");
      setLoading(true);
      await signInWithGoogle();
      // ✅ navigate after success
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(error.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-root">
      <ParticlesBackground />
      <div className="auth-card" role="main" aria-label="Authentication">
        <h2>{isSignUp ? "Create an account" : "Sign in to your account"}</h2>

        <button className="google-btn" onClick={handleGoogle} disabled={loading}>
          <svg viewBox="0 0 533.5 544.3" className="google-icon" aria-hidden>
            <path fill="#4285f4" d="M533.5 278.4c0-..."></path>
            {/* Use a small google svg or an icon — simplified here */}
            <GoogleIcon />
          </svg>
          Continue with Google
        </button>

        <div className="divider">or</div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {isSignUp && (
            <label className="field">
              <span>Full name (optional)</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </label>

          <label className="field">
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required />
          </label>

          {isSignUp && (
            <label className="field">
              <span>Confirm password</span>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password" />
            </label>
          )}

          {err && <div className="error">{err}</div>}

          <button type="submit" className="primary" disabled={loading}>
            {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="toggle-line">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}
          <button className="link-btn" onClick={() => { setIsSignUp(!isSignUp); setErr(""); }}>
            {isSignUp ? "Sign in" : "Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}
