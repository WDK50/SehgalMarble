import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';
import { FiSearch } from 'react-icons/fi';
import { ArrowUp } from 'lucide-react';
import { allProducts, productCategories } from '../data/products';

export default function ProductsPage() {
  const { addItemToCart } = useCart();
  const [searchParams] = useSearchParams();
  const initialCategory = decodeURIComponent(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredProducts = useMemo(
    () =>
      allProducts.filter(p => {
        const q = searchQuery.toLowerCase();
        return (
          (p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) &&
          (selectedCategory ? p.category === selectedCategory : true)
        );
      }),
    [searchQuery, selectedCategory]
  );

  const categories = useMemo(
    () =>
      Array.from(
        filteredProducts.reduce((m, p) => {
          if (!m.has(p.category)) m.set(p.category, []);
          m.get(p.category).push(p);
          return m;
        }, new Map())
      ).map(([category, products]) => ({ category, products })),
    [filteredProducts]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">All Products</h1>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by name or code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {productCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {categories.map(({ category, products }) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="cursor-pointer "
                  onClick={() => setSelectedProduct(product)}
                >
                  <ProductCard product={product} onAddToCart={addItemToCart} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addItemToCart}
        />
      )}

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-md transition"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 cursor-pointer" />
        </button>
      )}
    </div>
  );
}