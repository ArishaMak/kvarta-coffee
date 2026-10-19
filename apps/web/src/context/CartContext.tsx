"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  grind: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, grind: string) => void;
  updateQuantity: (id: string, grind: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kvarta_cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kvarta_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.grind === newItem.grind,
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.grind === newItem.grind
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, grind: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.grind === grind)));
  };

  const updateQuantity = (id: string, grind: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, grind);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.grind === grind ? { ...i, quantity } : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
