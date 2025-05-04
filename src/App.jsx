// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home       = lazy(() => import("./Pages/Home"));
const Products   = lazy(() => import("./Pages/Products"));
const About      = lazy(() => import("./Pages/About"));
const Contact    = lazy(() => import("./Pages/Contact"));
const Cart       = lazy(() => import("./Pages/Cart"));
const CartList   = lazy(() => import("./components/CartList"));
const Login      = lazy(() => import("./Pages/Login"));
const AdminLogin = lazy(() => import("./Pages/AdminLogin"));

export default function App() {
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems"));
    if (Array.isArray(stored)) setCartItems(stored);
  }, []);

  const handleAddToCart = product => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />

      {/* suspense fallback while chunks load */}
      <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/login"       element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route
              path="/"
              element={<Home onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/products"
              element={<Products onAddToCart={handleAddToCart} />}
            />
            <Route path="/about"   element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} />}
            />
            <Route
              path="/cart-list"
              element={<CartList />}
            />
          </Routes>
        </div>
      </Suspense>

      <Footer />
    </Router>
  );
}
