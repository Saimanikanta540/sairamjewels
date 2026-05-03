import { motion, AnimatePresence } from "motion/react";
import { X, Lock, Mail, ArrowRight, User, Check } from "lucide-react";
import React, { useState, useEffect } from "react";
import api from "../lib/api";

interface EditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string, email: string } | null;
  onUpdate: (user: { name: string, email: string }) => void;
}

export default function EditProfile({ isOpen, onClose, currentUser, onUpdate }: EditProfileProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (password && password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await api.put('/auth/profile', { name, email, password });
      const data = response.data;
      
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      
      onUpdate({ name: data.name, email: data.email });
      setSuccessMsg("Profile updated successfully");
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 2000);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Profile update failed");
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-theme-bg/95 backdrop-blur-xl"
          />

          {/* Edit Profile Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#1a1a1a] border border-theme-border p-10 lg:p-12 shadow-2xl overflow-hidden"
          >
            {/* Geometric Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-theme-accent/20 -translate-y-16 translate-x-16 rotate-45" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-theme-text-dim hover:text-theme-accent transition-colors"
              aria-label="Close edit profile"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[4px] text-theme-accent font-semibold mb-4 block">
                Manage Profile
              </span>
              <h2 className="text-3xl font-serif text-theme-text">
                Update Your <br /><span className="italic">Details</span>
              </h2>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 text-red-400 text-xs text-center">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="mb-6 p-3 bg-green-900/20 border border-green-500/50 text-green-400 text-xs text-center flex items-center justify-center gap-2">
                <Check className="w-3 h-3" /> {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[1px] text-theme-text-dim block ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-accent/50" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Constance Sterling"
                    className="w-full bg-theme-bg border border-theme-border py-4 pl-12 pr-4 text-sm text-theme-text outline-none focus:border-theme-accent transition-colors placeholder:text-theme-text-dim/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[1px] text-theme-text-dim block ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-accent/50" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="constance@sterling.com"
                    className="w-full bg-theme-bg border border-theme-border py-4 pl-12 pr-4 text-sm text-theme-text outline-none focus:border-theme-accent transition-colors placeholder:text-theme-text-dim/30"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[1px] text-theme-text-dim block ml-1">New Password (Optional)</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-accent/50" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-theme-bg border border-theme-border py-4 pl-12 pr-4 text-sm text-theme-text outline-none focus:border-theme-accent transition-colors placeholder:text-theme-text-dim/30"
                  />
                </div>
              </div>

              {password && (
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[1px] text-theme-text-dim block ml-1">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-accent/50" />
                    <input 
                      type="password" 
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-theme-bg border border-theme-border py-4 pl-12 pr-4 text-sm text-theme-text outline-none focus:border-theme-accent transition-colors placeholder:text-theme-text-dim/30"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border border-theme-accent bg-theme-accent py-4 text-theme-bg text-[11px] uppercase tracking-[3px] font-bold hover:bg-transparent hover:text-theme-accent transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-theme-bg border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Update Profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
