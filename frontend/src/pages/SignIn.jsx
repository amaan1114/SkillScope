import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function SignIn() {

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const userId = localStorage.getItem("UserId");
    useEffect(()=>{
      if(userId){
        window.location.href = "/profile";
      }
    },[localStorage.getItem("UserId")])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      if (!formData.email || !formData.password) {

        setError("Please fill in all fields.");
        return;
      }
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,{
        password: formData.password,
        email: formData.email
      })
      localStorage.setItem("UserId", res.data[0].id);
      window.location.href = "/profile";
    }catch(err)
    {
      setError(err.response?.data?.message || err.message || "Sign in failed");
    }finally{
      setLoading(false)
    }
  

    // TODO: plug in your auth logic here (Firebase, Supabase, JWT, etc.)

  };

  return (
    <div className="min-h-screen w-screen bg-[#070d0d] flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,200,220,0.08) 0%, transparent 70%)" }}
      />

      <div className="absolute top-6 left-8">
        <span className="text-white font-bold text-lg tracking-widest uppercase">
          SKILL<span className="text-cyan-400">SCOPE</span>
        </span>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-cyan-900/40 bg-[#0d1717]/80 backdrop-blur-sm p-8 shadow-2xl">

          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-xs text-cyan-400/70 mb-8 tracking-wide uppercase">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-cyan-400/60 tracking-widest uppercase" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="rounded-xl border border-cyan-900/50 bg-[#0a1414] px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500/60 transition-colors text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-cyan-400/60 tracking-widest uppercase" htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="rounded-xl border border-cyan-900/50 bg-[#0a1414] px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500/60 transition-colors text-sm"
              />
            </div>

            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 rounded-xl px-4 py-3 text-sm font-semibold text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #00e5ff, #00b8cc)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Signing in…
                </span>
              ) : "Sign In"}
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}