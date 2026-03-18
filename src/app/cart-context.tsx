'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type CartItem = { id: number; name: string; quantity: number; price: number };

type CartContextType = {
  cartItems: CartItem[];
  totalItemsCount: number;
  addToCart: (id: number, name: string, price: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const totalItemsCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const addToCart = useCallback((id: number, name: string, price: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, name, quantity: 1, price }];
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