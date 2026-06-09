import React, { useState } from "react";
import { ShieldAlert, Compass } from "lucide-react";
import { api } from "../lib/api";

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  onNavigateHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please key in email and entry keys.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const res = await api.login({ email, password });
      
      if (res.success && res.token) {
        onLoginSuccess(res.token);
      } else {
        setError("Invalid administration token credentials.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid administrative entry key values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-tr from-[#fbfaf9] via-white to-[#eddee3]/30"
      id="admin-login-page"
    >
      <div 
        className="w-full max-w-md bg-white border border-[#eddee3] rounded-3xl p-8 md:p-12 shadow-xl space-y-6 relative overflow-hidden"
      >
        {/* Subtle rose gold background glow inside box */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#81314c]/5 rounded-full filter blur-2xl" />

        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#eddee3] text-[#81314c] rounded-full">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-serif text-[#1F2937] tracking-wider">
            Admin Master Control
          </h2>
          <p className="text-xs text-gray-500 font-sans">
            Only authorized personnel may enter the boutique records panel.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-sans font-medium border border-red-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-400">
              Admin Username (Email)
            </label>
            <input
              id="input-login-email"
              type="email"
              required
              placeholder="e.g. meditation@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="block text-[10px] uppercase font-sans tracking-wider font-semibold text-gray-400">
              Entry Key (Password)
            </label>
            <input
              id="input-login-password"
              type="password"
              required
              placeholder="••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#fbfaf9] border border-gray-200 focus:border-[#81314c] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#81314c]"
            />
          </div>

          {/* Action button */}
          <button
            id="btn-login-submit"
            type="submit"
            disabled={loading}
            className="w-full bg-[#1F2937] hover:bg-[#81314c] text-white text-xs font-semibold uppercase tracking-widest font-sans py-4 rounded-full transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating Authority..." : "Initialize Controls"}
          </button>
        </form>

        <div className="text-center">
          <button
            id="btn-login-to-public"
            onClick={onNavigateHome}
            className="text-xs text-gray-400 font-sans uppercase tracking-widest font-semibold hover:text-[#81314c] pr-1.5 transition-colors"
          >
            &larr; Return to Public Boutique
          </button>
        </div>

      </div>
    </div>
  );
};
