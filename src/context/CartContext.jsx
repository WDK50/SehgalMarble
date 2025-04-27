/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const user = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const didLoadRemote = useRef(false);
  const isFirstSync = useRef(true);

  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }
    const fetchCart = async () => {
      const ref = doc(db, 'carts', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const remote = snap.data().items || [];
        setCartItems(remote);
      } else {
        const local = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(local);
      }
      didLoadRemote.current = true;
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    if (!user || !didLoadRemote.current) return;
    if (isFirstSync.current) {
      isFirstSync.current = false;
      return;
    }
    const saveCart = async () => {
      const ref = doc(db, 'carts', user.uid);
      await setDoc(ref, { items: cartItems });
    };
    saveCart();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, user]);

  function addItemToCart(item) {
    setCartItems(prev => {
      const index = prev.findIndex(p => p.id===item.id && p.size===item.size);
      if (index >= 0) {
        const newCart = [...prev];
        newCart[index].quantity += item.quantity;
        return newCart;
      }
      return [...prev, item];
    });
  }

  function increaseQuantity(id, size) {
    setCartItems(prev =>
      prev.map(item =>
        item.id===id && item.size===size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(id, size) {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id===id && item.size===size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function removeItemFromCart(id, size) {
    setCartItems(prev => prev.filter(item => !(item.id===id && item.size===size)));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addItemToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItemFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}