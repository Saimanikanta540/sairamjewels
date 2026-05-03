import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200",
    title: "The Celestial Solitaire",
    meta: "18K White Gold / 2.4ct D-IF"
  },
  {
    url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200",
    title: "The Sovereign Set",
    meta: "Signature Diamond Collection"
  },
  {
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200",
    title: "Midnight Elegance",
    meta: "Royal Sapphire Collection"
  }
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-stretch pt-20 overflow-hidden bg-theme-bg">
      <div className="w-full flex flex-col lg:flex-row border-b border-theme-border">
        {/* Left Section: Hero Sidebar */}
        <div className="w-full lg:w-[400px] p-8 lg:p-16 flex flex-col justify-center border-r border-theme-border bg-theme-bg">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[4px] text-theme-accent font-semibold mb-6 block">
              Established 2005
            </span>
            <h1 className="text-5xl lg:text-6xl font-serif leading-[1.1] mb-8 text-theme-text font-light">
              Rare Jewels,<br />
              <span className="italic">Refined Taste.</span>
            </h1>
            <p className="text-sm text-theme-text-dim max-w-xs mb-10 leading-relaxed font-light">
              Discover a collection of masterfully crafted pieces or collaborate with our artisans to create a legacy item unique to your story.
            </p>
            
            <div className="flex flex-col gap-4">
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="geometric-btn text-center"
              >
                Collections
              </motion.a>
              <motion.a
                href="#custom"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-center text-[11px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent transition-all underline underline-offset-4"
              >
                Start Bespoke Journey
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right Section: Visual Showcase */}
        <div className="flex-1 relative bg-theme-bg flex items-center justify-center p-8 lg:p-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-3xl"
          >
            <div className="aspect-[16/9] overflow-hidden border border-theme-border relative">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={heroImages[currentIdx].url}
                  src={heroImages[currentIdx].url} 
                  alt={heroImages[currentIdx].title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full object-cover grayscale-[0.3] brightness-90"
                />
              </AnimatePresence>
              
              {/* Image Indicators */}
              <div className="absolute top-8 right-8 flex gap-2 z-20">
                {heroImages.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-0.5 transition-all duration-700 ${i === currentIdx ? "w-8 bg-theme-accent" : "w-2 bg-theme-border"}`}
                  />
                ))}
              </div>

              {/* Product Meta Overlay from Theme */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={heroImages[currentIdx].title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-8 right-8 product-meta-blur p-4 max-w-[240px]"
                >
                  <p className="font-serif text-lg text-theme-text mb-1 italic">{heroImages[currentIdx].title}</p>
                  <p className="text-[10px] text-theme-accent uppercase tracking-widest">{heroImages[currentIdx].meta}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Geometric Accent */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border border-theme-accent/30 -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-theme-accent/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
