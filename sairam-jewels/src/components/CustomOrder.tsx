import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hammer, Sparkles, Send, Loader2, CheckCircle2 } from "lucide-react";
import api from "../lib/api";

export default function CustomOrder() {
  const [basicIdea, setBasicIdea] = useState("");
  const [refinedIdea, setRefinedIdea] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) {
      return "Email is required";
    } else if (!emailRegex.test(val)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleRefine = async () => {
    if (!basicIdea.trim()) return;
    setIsRefining(true);
    try {
      // Must be logged in for this endpoint
      const response = await api.post('/custom-order', { userPrompt: basicIdea });
      setRefinedIdea(response.data.aiResponse);
    } catch (error: any) {
      console.error("Failed to refine idea", error);
      if (error.response?.status === 401) {
         setRefinedIdea("Please sign in to use the AI Design Assistant.");
      } else {
         setRefinedIdea("Something went wrong with the AI consultant. Please try again later.");
      }
    }
    setIsRefining(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="custom" className="py-24 bg-theme-bg border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[4px] text-theme-accent font-semibold mb-6 block">
              Bespoke Commissions
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif mb-8 leading-tight text-theme-text font-light">
              Bring Your Unique <br /> <span className="italic underline underline-offset-8 decoration-theme-accent/30">Vision</span> To Life
            </h2>
            <p className="text-theme-text-dim mb-10 leading-relaxed font-light text-sm">
              Our master artisans specialize in turning your dreams into tangible reality. From initial sketch to the final polish, we collaborate with you to create a piece that is uniquely yours.
            </p>

            <ul className="space-y-6">
              {[
                { title: "Initial Consultation", desc: "Share your inspiration and preferences with our design team." },
                { title: "Design Rendering", desc: "View detailed 3D renderings and material selections." },
                { title: "Handcrafting", desc: "Our artisans meticulously craft your piece in our local atelier." }
              ].map((step, idx) => (
                <motion.li 
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 pb-6 border-b border-theme-border last:border-0"
                >
                  <div className="flex-shrink-0 w-12 h-12 border border-theme-accent/30 flex items-center justify-center text-theme-accent font-serif italic text-lg">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg mb-1 text-theme-text">{step.title}</h4>
                    <p className="text-[13px] text-theme-text-dim font-light">{step.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-[#1a1a1a] p-8 lg:p-12 border border-theme-border relative"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-theme-accent/10 border border-theme-accent/20 text-theme-accent mb-4">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-theme-text">Design Assistant</h3>
                    <p className="text-[11px] text-theme-text-dim uppercase tracking-[2px] mt-2 font-light">Describe your legacy piece</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[2px] font-semibold text-theme-text-dim">Your Basic Idea</label>
                    <textarea 
                      value={basicIdea}
                      onChange={(e) => setBasicIdea(e.target.value)}
                      placeholder="e.g., An emerald ring with a vintage feel..."
                      className="w-full h-32 p-4 bg-theme-bg border border-theme-border focus:border-theme-accent outline-none transition-colors text-sm font-light resize-none text-theme-text"
                    />
                    <button 
                      type="button"
                      onClick={handleRefine}
                      disabled={isRefining || !basicIdea}
                      className="w-full py-4 geometric-btn disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hammer className="w-4 h-4" />}
                      Refine Brief
                    </button>
                  </div>

                  {refinedIdea && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-theme-accent/5 border border-theme-accent/10 italic text-[13px] text-theme-text-dim leading-relaxed font-light"
                    >
                      {refinedIdea}
                    </motion.div>
                  )}

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-[2px] font-semibold text-theme-text-dim text-center block">Name</label>
                           <input type="text" required className="w-full p-3 bg-theme-bg border border-theme-border focus:border-theme-accent outline-none text-sm text-theme-text" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] uppercase tracking-[2px] font-semibold text-theme-text-dim text-center block">Email</label>
                           <input 
                            type="email" 
                            required 
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (emailError) setEmailError(validateEmail(e.target.value));
                            }}
                            onBlur={() => setEmailError(validateEmail(email))}
                            className={`w-full p-3 bg-theme-bg border ${emailError ? 'border-red-500/50 focus:border-red-500' : 'border-theme-border focus:border-theme-accent'} outline-none text-sm text-theme-text transition-colors`} 
                           />
                           {emailError && (
                             <p className="text-[9px] text-red-400 uppercase tracking-wider mt-1">{emailError}</p>
                           )}
                        </div>
                      </div>
                    </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-theme-accent text-theme-bg text-[11px] uppercase tracking-[3px] font-bold hover:bg-[#b08d4a] transition-colors flex items-center justify-center gap-2"
                  >
                    Send Commission <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20"
                >
                  <CheckCircle2 className="w-16 h-16 text-theme-accent mx-auto mb-6" />
                  <h3 className="text-3xl font-serif mb-4 text-theme-text">Request Received</h3>
                  <p className="text-theme-text-dim font-light max-w-xs mx-auto text-sm">
                    Thank you for your interest. Our master designer will contact you within 24 hours to schedule your consultation.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-[11px] uppercase tracking-widest font-bold border-b border-theme-accent pb-1 text-theme-text"
                  >
                    Start New Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
