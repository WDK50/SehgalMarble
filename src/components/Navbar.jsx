// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Navbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        const name = user.displayName || user.email || '';
        const initials = name
          .split(' ')
          .map(w => w[0] || '')
          .join('')
          .substring(0, 2)
          .toUpperCase();
        setUserInitials(initials);
      } else {
        setUserInitials('');
      }
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowMenu(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <Link to="/" className="text-2xl font-bold text-gray-800">My Marble Store</Link>

        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-2xl text-gray-700 hover:text-black focus:outline-none mr-4">
            {showMobileMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div className="flex items-center space-x-6 relative">
          <button onClick={() => setShowMenu(m => !m)} className="flex items-center space-x-2 focus:outline-none">
            {userInitials ? (
              <div className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold">
                {userInitials}
              </div>
            ) : (
              <FiUser className="text-2xl text-gray-700 hover:text-black cursor-pointer" />
            )}
          </button>
          {showMenu && (
            <div className="absolute right-0 top-16 w-40 bg-white shadow-lg rounded-md border z-20">
              {userInitials ? (
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setShowMenu(false)} className="block px-4 py-2 hover:bg-gray-100">User Login</Link>
                  <Link to="/admin-login" onClick={() => setShowMenu(false)} className="block px-4 py-2 hover:bg-gray-100">Admin Login</Link>
                </>
              )}
            </div>
          )}
          <Link to="/cart" className="relative text-gray-700 hover:text-black cursor-pointer">
            <FiShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg border-t p-4 space-y-4 text-gray-700 font-medium">
          <Link to="/" onClick={() => setShowMobileMenu(false)} className="block hover:underline">Home</Link>
          <Link to="/about" onClick={() => setShowMobileMenu(false)} className="block hover:underline">About</Link>
          <Link to="/products" onClick={() => setShowMobileMenu(false)} className="block hover:underline">Products</Link>
          <Link to="/contact" onClick={() => setShowMobileMenu(false)} className="block hover:underline">Contact</Link>
        </div>
      )}
    </nav>
  );
}