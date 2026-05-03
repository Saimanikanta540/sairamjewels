import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Menu, X, ShoppingBag, ChevronDown, Heart, User } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  wishlistCount: number;
  cartCount: number;
  user: string | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onCartClick: () => void;
  onEditProfileClick: () => void;
}

export default function Navigation({ wishlistCount, cartCount, user, onLoginClick, onLogout, onCartClick, onEditProfileClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  interface NavItem {
    name: string;
    href: string;
    children?: { name: string; href: string; }[];
  }

  const navItems: NavItem[] = [
    { name: "Home", href: "#home" },
    { 
      name: "Collections", 
      href: "#collections"
    },
    { name: "Bespoke", href: "#custom" },
    { name: "Contact", href: "#footer" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-theme-bg/80 backdrop-blur-md border-b border-theme-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="text-theme-accent w-6 h-6" />
            <span className="text-2xl font-serif tracking-[0.2em] uppercase text-theme-accent">Sairam Jewels</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, idx) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.a
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-1 text-[11px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent transition-colors duration-300 font-medium py-8"
                >
                  {item.name}
                  {item.children && <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />}
                </motion.a>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 w-56 bg-[#1a1a1a] border border-theme-border shadow-2xl py-6"
                    >
                      <div className="flex flex-col">
                        {item.children.map((child) => (
                          <a
                            key={child.name}
                            href={child.href}
                            className="px-8 py-3 text-[10px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent hover:bg-theme-accent/5 transition-all"
                          >
                            {child.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="flex items-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-theme-text relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-theme-accent text-theme-bg text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>
              
              <div className="relative">
                {user ? (
                  <div 
                    onMouseEnter={() => setShowUserMenu(true)}
                    onMouseLeave={() => setShowUserMenu(false)}
                    className="flex items-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 text-theme-text"
                    >
                      <User className="w-5 h-5 text-theme-accent" />
                      <span className="text-[10px] uppercase tracking-[1px] hidden lg:block">{user.split('@')[0]}</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full right-0 w-40 bg-[#1a1a1a] border border-theme-border shadow-2xl py-4 mt-2"
                        >
                          <button 
                            onClick={() => { onEditProfileClick(); setShowUserMenu(false); }}
                            className="w-full text-left px-6 py-2 text-[10px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent transition-colors"
                          >
                            Edit Profile
                          </button>
                          <button 
                            onClick={onLogout}
                            className="w-full text-left px-6 py-2 text-[10px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent transition-colors"
                          >
                            Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onLoginClick}
                    className="text-[10px] uppercase tracking-[2px] text-theme-text border border-theme-border px-4 py-2 hover:border-theme-accent transition-colors"
                  >
                    Login
                  </motion.button>
                )}
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCartClick}
                className="text-theme-text relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-theme-accent text-theme-bg text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Heart className="w-5 h-5 text-theme-text" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-theme-accent text-theme-bg text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <button 
                onClick={onCartClick}
                className="relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 text-theme-text" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-theme-accent text-theme-bg text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-theme-text">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-theme-bg border-t border-theme-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {user ? (
                <div className="flex flex-col space-y-4 pb-4 border-b border-theme-border">
                  <div className="flex items-center gap-3 text-theme-accent">
                    <User className="w-5 h-5" />
                    <span className="text-[11px] uppercase tracking-[2px]">{user}</span>
                  </div>
                  <button 
                    onClick={() => { onEditProfileClick(); setIsOpen(false); }}
                    className="text-left text-[11px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => { onLogout(); setIsOpen(false); }}
                    className="text-left text-[11px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { onLoginClick(); setIsOpen(false); }}
                  className="flex items-center gap-3 text-[11px] uppercase tracking-[2px] text-theme-accent border border-theme-accent/30 py-4 px-6 justify-center"
                >
                  <User className="w-4 h-4" /> Sign In
                </button>
              )}
              {navItems.map((item) => (
                <div key={item.name} className="space-y-4">
                  <a
                    href={item.href}
                    onClick={() => !item.children && setIsOpen(false)}
                    className="flex justify-center items-center gap-2 text-[11px] uppercase tracking-[2px] text-theme-text-dim hover:text-theme-accent"
                  >
                    {item.name}
                  </a>
                  {item.children && (
                    <div className="flex flex-col space-y-3 bg-white/5 py-3">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="text-[9px] uppercase tracking-[2px] text-theme-text-dim/60"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
