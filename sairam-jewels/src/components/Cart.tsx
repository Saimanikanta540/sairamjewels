import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import React from "react";
import { CartItem } from "../types";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (title: string, delta: number) => void;
  onRemove: (title: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * 1250), 0); // Mock price

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-theme-bg/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-theme-bg border-l border-theme-border flex flex-col shadow-2xl h-full"
          >
            {/* Header */}
            <div className="p-8 border-b border-theme-border flex justify-between items-center bg-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-theme-accent" />
                <h2 className="text-xl font-serif text-theme-text uppercase tracking-[2px]">Your Collection</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:text-theme-accent transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="p-6 border border-theme-border rounded-full opacity-20">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <p className="text-theme-text-dim text-sm font-light italic">Your collection is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className="text-[10px] uppercase tracking-[2px] text-theme-accent border-b border-theme-accent pb-1"
                  >
                    Start Exploring
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.title} className="flex gap-6 group">
                    <div className="w-24 h-24 border border-theme-border p-1 shrink-0 bg-white/5">
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-full h-full object-cover grayscale-[0.3]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-serif text-theme-text mb-1">{item.title}</h3>
                          <p className="text-[10px] text-theme-text-dim uppercase tracking-[1px]">{item.material} / {item.type}</p>
                        </div>
                        <button 
                          onClick={() => onRemove(item.title)}
                          className="text-theme-text-dim hover:text-red-400 transition-colors"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-theme-border bg-black/20">
                          <button 
                            onClick={() => onUpdateQuantity(item.title, -1)}
                            className="p-1.5 hover:text-theme-accent transition-colors disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[10px] font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.title, 1)}
                            className="p-1.5 hover:text-theme-accent transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-xs font-mono text-theme-accent">${((item.price || 1250) * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-theme-border bg-[#1a1a1a] space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[2px] text-theme-text-dim">Subtotal Estimate</span>
                  <span className="text-xl font-serif text-theme-text">${subtotal.toLocaleString()}</span>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-theme-accent text-theme-bg text-[11px] uppercase tracking-[3px] font-bold hover:bg-transparent hover:text-theme-accent border border-theme-accent transition-all flex items-center justify-center gap-2 group">
                    Bespoke Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[9px] text-center text-theme-text-dim italic">
                    Final valuation and shipping subject to master artisan review.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
