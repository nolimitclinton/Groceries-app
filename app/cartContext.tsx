import React, { createContext, useState, useContext, ReactNode } from "react";
import { IMAGES } from "assets/images"; 

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: any;
}

interface CartContextProps {
  cart: CartItem[];
  totalCost: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    // { id: "1", name: "Bell Pepper Red", description: "1kg, Price", price: 4.99, image: IMAGES.redpepper, quantity: 1 },
    // { id: "2", name: "Egg Chicken Red", description: "4pcs, Price", price: 1.99, image: IMAGES.egg, quantity: 1 },
    // { id: "3", name: "Organic Bananas", description: "12kg, Price", price: 3.00, image: IMAGES.banana, quantity: 1 },
    // { id: "4", name: "Ginger", description: "250gm, Price", price: 2.99, image: IMAGES.ginger, quantity: 1 },
  ]);

  const calculateTotalCost = (cartItems: CartItem[]) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );

      return prevCart.some(cartItem => cartItem.id === item.id)
        ? updatedCart
        : [...updatedCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalCost: calculateTotalCost(cart),
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};