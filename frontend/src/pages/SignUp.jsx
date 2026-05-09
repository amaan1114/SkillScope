import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("UserId");
  useEffect(()=>{
    if(userId){
      window.location.href = "/profile";
    }
  })
  // window=browser
  // location=current URL/address
  //href=change the address


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);

      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all fields.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      
      
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      localStorage.setItem("UserId", response.data[0].id);
      window.location.href = "/profile";
    }catch(err){
      setError(err.response?.data?.message || err.message || "Sign up failed");
    }
    finally{
      setLoading(false);
    }
   





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

          <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
          <p className="text-xs text-cyan-400/70 mb-8 tracking-wide uppercase">Start your job search today</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-cyan-400/60 tracking-widest uppercase" htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-zinc-500 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-cyan-400/60 tracking-widest uppercase" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="rounded-xl border border-cyan-900/50 bg-[#0a1414] px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500/60 transition-colors text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-cyan-400/60 tracking-widest uppercase" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="rounded-xl border border-cyan-900/50 bg-[#0a1414] px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-cyan-500/60 transition-colors text-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-cyan-400/60 tracking-widest uppercase" htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
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
                  Creating account…
                </span>
              ) : "Create Account"}
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <button onClick={() => navigate("/signin")} className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}