/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import { motion } from "motion/react";
import { CartItem, CollectionItem } from "./types";
import Cart from "./components/Cart";
import api from "./lib/api";

export default function App() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Note: Since products aren't fetched from backend yet, cart items are minimal.
  // In a full implementation, you'd match backend ObjectIds. For now, we sync 
  // relying on the frontend data structure or simulate it locally if no backend sync needed immediately.
  // To keep it robust without overcomplicating the UI which uses titles:
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // In a full implementation, we would fetch /cart and /wishlist here
      // fetchUserData();
    }
  }, []);

  const handleLogin = (loggedInUser: {name: string, email: string}) => {
    setUser(loggedInUser);
    // In a full implementation, we would fetch /cart and /wishlist here
    // fetchUserData();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  // Keep state local for smooth UI, sync to backend in background if needed later
  const toggleWishlist = (title: string) => {
    setWishlist(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const addToCart = (product: CollectionItem, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.title === product.title);
      if (existing) {
        return prev.map(item => 
          item.title === product.title 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (title: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.title === title 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeFromCart = (title: string) => {
    setCart(prev => prev.filter(item => item.title !== title));
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      <Navigation 
        wishlistCount={wishlist.length} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        user={user?.name || null} 
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onCartClick={() => setIsCartOpen(true)}
        onEditProfileClick={() => setIsEditProfileOpen(true)}
      />
      <main>
        <Home 
          wishlist={wishlist} 
          onToggleWishlist={toggleWishlist} 
          onAddToCart={addToCart}
        />
      </main>
      <Footer />

      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      <EditProfile 
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={user}
        onUpdate={(updatedUser) => setUser(updatedUser)}
      />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

