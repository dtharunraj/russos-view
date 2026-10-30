import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                 "https://russos-view-api.onrender.com/api/auth/signup",
                {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    password: form.password,
                }
            );

            localStorage.setItem("rv_token", response.data.token);
            localStorage.setItem("rv_user", JSON.stringify(response.data.user));

            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to create account. Please check your backend."
            );
        } finally {
            setLoading(false);
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
                        Join the collection
                    </p>
                    <h1 className="mt-2 text-3xl font-black">Create your account.</h1>
                    <p className="mt-3 text-sm leading-6 text-gray-400">
                        Create your Russo's View account to start your collection.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold">Full name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                autoComplete="name"
                                required
                                maxLength={80}
                                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-emerald-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-emerald-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <div className="flex items-center rounded-xl border border-white/10 bg-black pr-3 focus-within:border-emerald-400">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="At least 8 characters"
                                    autoComplete="new-password"
                                    minLength={8}
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

                        <div>
                            <label className="mb-2 block text-sm font-semibold">Confirm password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter password again"
                                autoComplete="new-password"
                                required
                                className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none focus:border-emerald-400"
                            />
                        </div>

                        {error && (
                            <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-emerald-400 py-3.5 font-black text-black transition hover:bg-emerald-300 disabled:opacity-60"
                        >
                            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                        </button>
                    </form>

                    <p className="mt-7 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-emerald-400 hover:text-emerald-300"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}