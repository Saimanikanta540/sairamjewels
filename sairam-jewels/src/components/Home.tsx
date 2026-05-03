import React from "react";
import Hero from "./Hero";
import Collections from "./Collections";
import CustomOrder from "./CustomOrder";
import { CollectionItem } from "../types";

interface HomeProps {
  wishlist: string[];
  onToggleWishlist: (title: string) => void;
  onAddToCart: (product: CollectionItem, quantity: number) => void;
}

export default function Home({ wishlist, onToggleWishlist, onAddToCart }: HomeProps) {
  return (
    <>
      <Hero />
      <Collections 
        wishlist={wishlist} 
        onToggleWishlist={onToggleWishlist} 
        onAddToCart={onAddToCart}
      />
      <CustomOrder />
    </>
  );
}
