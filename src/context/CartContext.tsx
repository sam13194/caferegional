
"use client";

import type { CartItem, Product, ProductVariant } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, selectedVariant: ProductVariant) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // This effect runs once on the client to load the cart from localStorage, preventing hydration errors.
  useEffect(() => {
    try {
      const localCart = localStorage.getItem('cafeRegionalCart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        // Handle potential parsing errors, e.g., by clearing the invalid data
        localStorage.removeItem('cafeRegionalCart');
    }
  }, []);

  // This effect persists the cart to localStorage whenever it changes.
  useEffect(() => {
    // A nested try-catch to handle potential localStorage errors (e.g., private browsing mode)
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cafeRegionalCart', JSON.stringify(cart));
        }
    } catch (error) {
        console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number, selectedVariant: ProductVariant) => {
    setCart(prevCart => {
      const cartItemId = selectedVariant.id; // Use the variant's unique ID
      const existingItemIndex = prevCart.findIndex(item => item.selectedVariant.id === cartItemId);

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        existingItem.quantity = Math.min(newQuantity, existingItem.stock); // Cap at stock
        return updatedCart;
      } else {
        const { variants, stock, ...productBase } = product;
        const newCartItem: CartItem = {
          ...productBase,
          quantity: Math.min(quantity, selectedVariant.stock),
          selectedVariant: selectedVariant,
          stock: selectedVariant.stock,
        };
        return [...prevCart, newCartItem];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.selectedVariant.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.selectedVariant.id === cartItemId) {
          const newQuantity = Math.max(0, Math.min(quantity, item.stock));
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.selectedVariant.price * item.quantity, 0);
  };
  
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
