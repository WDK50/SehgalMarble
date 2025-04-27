import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import CartList from "./components/CartList";
import Login from "./Pages/Login";
import AdminLogin from "./Pages/AdminLogin";
import Footer from "./components/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems"));
    if (Array.isArray(stored)) {
      setCartItems(stored);
    }
  }, []);

  const handleAddToCart = (product) => {
    const updated = [...cartItems, product];
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route
            path="/products"
            element={<Products onAddToCart={handleAddToCart} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/cart-list" element={<CartList />} />
          {/* <Route path="/admin/*" element={<AdminApp />} /> */}
        </Routes>
    <Footer/>
      </div>
    </Router>
  );
}

export default App;