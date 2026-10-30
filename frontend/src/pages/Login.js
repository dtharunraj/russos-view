import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const API_URL = "https://russos-view-api.onrender.com/api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Existing email and password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, form);

      localStorage.setItem("rv_token", response.data.token);
      localStorage.setItem("rv_user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google login through Firebase, then backend verification
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Backend must verify this Firebase token and return the app JWT.
      const response = await axios.post(`${API_URL}/google`, {
        idToken,
      });

      if (!response.data.token || !response.data.user) {
        throw new Error("The backend did not return a login token.");
      }

      localStorage.setItem("rv_token", response.data.token);
      localStorage.setItem("rv_user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Google sign-in failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050706] px-4 py-10 text-white">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400"
        >
          <ArrowLeft size={16} /> Back to Russo's View
        </Link>

        <div className="rounded-3xl border border-white/10 bg-[#0b0f0d] p-6 shadow-2xl sm:p-9">
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-2xl font-black text-black">
            R
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
            Welcome back
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Enter the multiverse.
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            Log in to your Russo's View account to continue your collection.
          </p>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white py-3.5 font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.61v2.77h3.87c2.27-2.09 3.57-5.17 3.57-8.41Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.08 7.95-2.92l-3.87-3a7.18 7.18 0 0 1-10.69-3.77H1.39v3.09A12 12 0 0 0 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.39 14.31a7.21 7.21 0 0 1 0-4.62V6.6H1.39a12 12 0 0 0 0 10.8l4-3.09Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45A11.54 11.54 0 0 0 12 0 12 12 0 0 0 1.39 6.6l4 3.09A7.16 7.16 0 0 1 12 4.75Z"
              />
            </svg>
            {googleLoading ? "CONNECTING TO GOOGLE..." : "CONTINUE WITH GOOGLE"}
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-semibold text-gray-500">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-white/10 bg-black pr-3 focus-within:border-emerald-400">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-transparent px-4 py-3 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full rounded-xl bg-emerald-400 py-3.5 font-black text-black transition hover:bg-emerald-300 disabled:opacity-60"
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck size={15} className="text-emerald-400" />
            Your login is verified through secure authentication.
          </div>

          <p className="mt-7 text-center text-sm text-gray-400">
            New to the collection?{" "}
            <Link
              to="/signup"
              className="font-bold text-emerald-400 hover:text-emerald-300"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}