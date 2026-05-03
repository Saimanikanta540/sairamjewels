import { motion, AnimatePresence } from "motion/react";
import { Heart, Filter, X, Minus, Plus, ChevronLeft, ChevronRight, ShoppingBag, Eye, Loader2 } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { CollectionItem } from "../types";
import api from "../lib/api";

interface CollectionsProps {
  wishlist: string[];
  onToggleWishlist: (title: string) => void;
  onAddToCart: (product: CollectionItem, quantity: number) => void;
}

export default function Collections({ wishlist, onToggleWishlist, onAddToCart }: CollectionsProps) {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterMaterial, setFilterMaterial] = useState<string>("all");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await api.get('/products');
        const formattedData = response.data.map((product: any) => ({
          id: product._id,
          title: product.name,
          description: product.description,
          price: product.price,
          images: product.images && product.images.length > 0 ? product.images : ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600"],
          link: `#product/${product._id}`,
          type: product.category || 'ring',
          material: product.materials && product.materials.length > 0 ? product.materials[0].toLowerCase() : 'gold',
        }));
        setCollections(formattedData);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const types = ["all", "ring", "necklace", "earring", "bracelet", "watch", "bridal"];
  const materials = ["all", "gold", "platinum", "silver", "diamond"];

  const updateQuantity = (title: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [title]: Math.max(1, (prev[title] || 1) + delta)
    }));
  };

  const nextImage = (title: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [title]: ((prev[title] || 0) + 1) % max
    }));
  };

  const prevImage = (title: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [title]: ((prev[title] || 0) - 1 + max) % max
    }));
  };

  const filteredCollections = useMemo(() => {
    return collections.filter(item => {
      const typeMatch = filterType === "all" || item.type === filterType;
      const materialMatch = filterMaterial === "all" || item.material === filterMaterial;
      return typeMatch && materialMatch;
    });
  }, [filterType, filterMaterial, collections]);

  return (
    <section id="collections" className="bg-theme-bg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[600px]">
        {/* Collection Header & Filter Tile */}
        <div className="p-8 lg:p-16 border-r border-b border-theme-border flex flex-col justify-center space-y-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-serif mb-6 text-theme-text"
            >
              Signature <br /><span className="italic">Collections</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-theme-text-dim text-sm font-light leading-relaxed max-w-xs"
            >
              Each piece in our curated collections is a testament to our dedication to quality and meticulous craftsmanship.
            </motion.p>
          </div>

          <div className="space-y-6 pt-8 border-t border-theme-border/30">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-theme-accent mb-2">
              <Filter className="w-3 h-3" /> Filters
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="filter-type" className="text-[9px] uppercase tracking-[1px] text-theme-text-dim block">Type</label>
                <select 
                  id="filter-type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  aria-label="Filter by Jewelry Type"
                  className="w-full bg-theme-bg border border-theme-border p-2 text-[10px] uppercase tracking-[1px] text-theme-text outline-none focus:border-theme-accent transition-colors"
                >
                  {types.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="filter-material" className="text-[9px] uppercase tracking-[1px] text-theme-text-dim block">Material</label>
                <select 
                  id="filter-material"
                  value={filterMaterial}
                  onChange={(e) => setFilterMaterial(e.target.value)}
                  aria-label="Filter by Material"
                  className="w-full bg-theme-bg border border-theme-border p-2 text-[10px] uppercase tracking-[1px] text-theme-text outline-none focus:border-theme-accent transition-colors"
                >
                  {materials.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {(filterType !== "all" || filterMaterial !== "all") && (
                <button 
                  onClick={() => { setFilterType("all"); setFilterMaterial("all"); }}
                  aria-label="Clear all filters"
                  className="flex items-center gap-1 text-[9px] uppercase tracking-[1px] text-theme-accent hover:text-theme-text transition-colors pt-2"
                >
                  <X className="w-3 h-3" aria-hidden="true" /> Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col items-center justify-center min-h-[500px] border-r border-b border-theme-border">
              <Loader2 className="w-8 h-8 text-theme-accent animate-spin mb-4" />
              <p className="text-[10px] uppercase tracking-[2px] text-theme-text-dim">Curating Collections...</p>
            </div>
          ) : (
            filteredCollections.map((item, idx) => {
              const isWishlisted = wishlist.includes(item.title);
              const quantity = quantities[item.title] || 1;
              const activeIndex = activeImageIndexes[item.title] || 0;
              
              return (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group cursor-pointer border-r border-b border-theme-border relative flex flex-col justify-end h-[500px]"
              >
              {/* Carousel Background */}
              <div className="absolute inset-0 overflow-hidden" aria-roledescription="carousel" aria-label={`${item.title} image gallery`}>
                <div aria-live="polite" className="sr-only">
                  Image {activeIndex + 1} of {item.images.length}
                </div>
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={item.images[activeIndex]}
                    src={item.images[activeIndex]} 
                    alt={`${item.title} - view ${activeIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-theme-bg/40 group-hover:bg-theme-bg/20 transition-colors" />
                
                {/* Carousel Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => prevImage(item.title, item.images.length, e)}
                    aria-label={`Previous image for ${item.title}`}
                    className="p-2 border border-theme-border/50 bg-theme-bg/30 text-theme-text hover:bg-theme-accent hover:text-theme-bg transition-all focus:opacity-100 outline-none focus:ring-1 focus:ring-theme-accent"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button 
                    onClick={(e) => nextImage(item.title, item.images.length, e)}
                    aria-label={`Next image for ${item.title}`}
                    className="p-2 border border-theme-border/50 bg-theme-bg/30 text-theme-text hover:bg-theme-accent hover:text-theme-bg transition-all focus:opacity-100 outline-none focus:ring-1 focus:ring-theme-accent"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20" role="tablist" aria-label="Image navigation dots">
                  {item.images.map((_, i) => (
                    <button 
                      key={i}
                      role="tab"
                      aria-selected={i === activeIndex}
                      aria-label={`Go to image ${i + 1}`}
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndexes(prev => ({ ...prev, [item.title]: i })); }}
                      className={`h-0.5 transition-all duration-300 ${i === activeIndex ? "w-4 bg-theme-accent" : "w-2 bg-theme-border"} hover:bg-theme-accent/50 outline-none focus:ring-1 focus:ring-theme-accent`}
                    />
                  ))}
                </div>
              </div>

              {/* Wishlist Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(item.title);
                }}
                aria-label={isWishlisted ? `Remove ${item.title} from wishlist` : `Add ${item.title} to wishlist`}
                aria-pressed={isWishlisted}
                className="absolute top-6 right-6 z-20 p-3 product-meta-blur transition-all hover:scale-110 focus:ring-1 focus:ring-theme-accent outline-none"
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${
                    isWishlisted ? "fill-theme-accent text-theme-accent" : "text-theme-text-dim"
                  }`} 
                  aria-hidden="true"
                />
              </button>

              {/* Content Meta Overlay */}
              <div className="relative z-10 p-8">
                <div className="product-meta-blur p-6 transition-all group-hover:border-theme-accent">
                  <h3 className="text-xl font-serif mb-2 text-theme-text">{item.title}</h3>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mb-4" role="group" aria-label="Adjust quantity">
                    <span id={`qty-label-${idx}`} className="text-[9px] uppercase tracking-[1px] text-theme-text-dim">Qty</span>
                    <div className="flex items-center border border-theme-border bg-theme-bg/50">
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.title, -1); }}
                        aria-label={`Decrease quantity of ${item.title}`}
                        className="p-1 hover:text-theme-accent transition-colors outline-none focus:ring-1 focus:ring-theme-accent"
                      >
                        <Minus className="w-3 h-3" aria-hidden="true" />
                      </button>
                      <span 
                        aria-live="polite" 
                        aria-labelledby={`qty-label-${idx}`}
                        className="w-8 text-center text-xs font-mono text-theme-text"
                      >
                        {quantity}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.title, 1); }}
                        aria-label={`Increase quantity of ${item.title}`}
                        className="p-1 hover:text-theme-accent transition-colors outline-none focus:ring-1 focus:ring-theme-accent"
                      >
                        <Plus className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(item, quantity); }}
                      className="flex-1 bg-theme-accent text-theme-bg py-2 text-[10px] uppercase tracking-[2px] font-bold hover:bg-transparent hover:text-theme-accent border border-theme-accent transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                      Add to Collection
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <a href={item.link} className="text-[10px] uppercase tracking-[2px] text-theme-text font-semibold border-b border-theme-accent pb-1">
                      Explore
                    </a>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Quick View
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            );
          }))}
        </AnimatePresence>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-theme-bg/95 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[#1a1a1a] border border-theme-border shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-50 p-2 text-theme-text-dim hover:text-theme-accent transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Media */}
              <div className="w-full lg:w-[60%] h-[400px] lg:h-auto relative bg-theme-bg">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndexes[selectedItem.title] || 0}
                    src={selectedItem.images[activeImageIndexes[selectedItem.title] || 0]}
                    alt={selectedItem.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                  <div className="flex gap-2">
                    {selectedItem.images.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveImageIndexes(prev => ({ ...prev, [selectedItem.title]: i }))}
                        className={`h-0.5 transition-all duration-300 ${i === (activeImageIndexes[selectedItem.title] || 0) ? "w-8 bg-theme-accent" : "w-2 bg-theme-border"}`}
                      />
                    ))}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-theme-text-dim">
                    {(activeImageIndexes[selectedItem.title] || 0) + 1} / {selectedItem.images.length}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center overflow-y-auto">
                <span className="text-[10px] uppercase tracking-[4px] text-theme-accent font-semibold mb-4 block">
                  {selectedItem.material} • {selectedItem.type}
                </span>
                <h3 className="text-3xl lg:text-4xl font-serif mb-6 text-theme-text">{selectedItem.title}</h3>
                <p className="text-theme-text-dim text-base font-light leading-relaxed mb-8">
                  {selectedItem.description} This exclusive piece represents the pinnacle of our artisanal traditions, meticulously inspected for brilliance and structural integrity.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-theme-border bg-theme-bg">
                      <button 
                        onClick={() => updateQuantity(selectedItem.title, -1)}
                        className="p-3 hover:text-theme-accent transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-mono text-sm text-theme-text">
                        {quantities[selectedItem.title] || 1}
                      </span>
                      <button 
                        onClick={() => updateQuantity(selectedItem.title, 1)}
                        className="p-3 hover:text-theme-accent transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => {
                        onAddToCart(selectedItem, quantities[selectedItem.title] || 1);
                        setSelectedItem(null);
                      }}
                      className="flex-1 bg-theme-accent text-theme-bg py-4 text-[11px] uppercase tracking-[3px] font-bold hover:bg-transparent hover:text-theme-accent border border-theme-accent transition-all flex items-center justify-center gap-3"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Collection
                    </button>
                  </div>

                  <div className="pt-8 border-t border-theme-border/30 grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[2px] text-theme-text font-semibold mb-2">Materials</h4>
                      <p className="text-[11px] text-theme-text-dim font-light">Ethically sourced {selectedItem.material}, hand-polished finish.</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[2px] text-theme-text font-semibold mb-2">Availability</h4>
                      <p className="text-[11px] text-theme-text-dim font-light">Bespoke sizing available upon request.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
