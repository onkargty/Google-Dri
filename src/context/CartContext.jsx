import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (course) => {
    setItems(prevItems => {
      const exists = prevItems.find(item => item.id === course.id);
      if (exists) {
        return prevItems;
      }
      return [...prevItems, course];
    });
  };

  const removeFromCart = (courseId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== courseId));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};