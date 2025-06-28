"use client";

import type { CartItem, Product } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, selectedGrind?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const localCart = localStorage.getItem('cafeRegionalCart');
      return localCart ? JSON.parse(localCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cafeRegionalCart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product, quantity: number, selectedGrind?: string) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id && item.selectedGrind === selectedGrind);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        if (updatedCart[existingItemIndex].quantity > product.stock) {
             updatedCart[existingItemIndex].quantity = product.stock; // Cap at stock
        }
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: Math.min(quantity, product.stock), selectedGrind }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(0, Math.min(quantity, item.stock)) } : item
      ).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
