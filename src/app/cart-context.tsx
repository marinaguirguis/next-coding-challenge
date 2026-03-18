'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type CartItem = { name: string; quantity: number; price: number };

type CartContextType = {
  cartItems: CartItem[];
  totalItemsCount: number;
  addToCart: (product: string, price: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalItemsCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const addToCart = useCallback((product: string, price: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product);
      if (existing) {
        return prev.map(item =>
          item.name === product ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { name: product, quantity: 1, price }];
    });
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, totalItemsCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}