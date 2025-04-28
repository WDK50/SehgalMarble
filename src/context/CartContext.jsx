/* eslint-disable react-refresh/only-export-components */
// src/context/CartContext.jsx
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

  // Fetch cart from Firestore when user signs in
  useEffect(() => {
    if (!user) {
      didLoadRemote.current = false;
      setCartItems([]);
      return;
    }
    (async () => {
      const ref = doc(db, 'carts', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCartItems(snap.data().items || []);
      } else {
        setCartItems([]);
      }
      didLoadRemote.current = true;
      isFirstSync.current = true;
    })();
  }, [user]);

  // Sync cartItems to Firestore (but not on logout)
  useEffect(() => {
    if (!user || !didLoadRemote.current) return;
    if (isFirstSync.current) {
      isFirstSync.current = false;
      return;
    }
    (async () => {
      const ref = doc(db, 'carts', user.uid);
      await setDoc(
        ref,
        {
          items:     cartItems,
          userName:  user.displayName || null,
          userEmail: user.email       || null
        },
        { merge: true }
      );
    })();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, user]);

  function addItemToCart(item) {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id && i.size === item.size);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += item.quantity;
        return copy;
      }
      return [...prev, item];
    });
  }

  function checkIfAlreadyInCart(id, size) {
    return cartItems.some(i => i.id === id && i.size === size);
  }

  function increaseQuantity(id, size) {
    setCartItems(prev =>
      prev.map(i =>
        i.id === id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  }

  function decreaseQuantity(id, size) {
    setCartItems(prev =>
      prev
        .map(i =>
          i.id === id && i.size === size ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
    );
  }

  function removeItemFromCart(id, size) {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addItemToCart,
      checkIfAlreadyInCart,
      increaseQuantity,
      decreaseQuantity,
      removeItemFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
