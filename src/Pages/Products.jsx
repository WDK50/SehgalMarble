// src/Pages/ProductsPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useCart } from '../context/CartContext';
import { FiSearch } from 'react-icons/fi';
import { ArrowUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { allProducts, productCategories } from '../data/products';

export default function ProductsPage() {
  const { addItemToCart } = useCart();
  const [searchParams] = useSearchParams();
  const initialCategory = decodeURIComponent(searchParams.get('category') || '');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const update = () => setItemsPerPage(window.innerWidth < 640 ? 5 : 12);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allProducts.filter(p =>
      (p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) &&
      (selectedCategory ? p.category === selectedCategory : true)
    );
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

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
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {paginated.map(product => (
              <div
                key={product.id}
                className="cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <ProductCard product={product} onAddToCart={addItemToCart} />
              </div>
            ))}
          </div>
        </section>

{totalPages > 1 && (
  <div className="flex items-center justify-center mt-8 px-2">
    <button
      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
      aria-label="Previous page"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>

    <div className="flex flex-wrap sm:flex-nowrap gap-1 mx-2 overflow-x-auto">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`
            min-w-[2rem] flex-shrink-0 text-center
            px-2 py-1 rounded
            ${page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'}
          `}
        >
          {page}
        </button>
      ))}
    </div>

    <button
      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="p-2 bg-gray-200 rounded-full disabled:opacity-50"
      aria-label="Next page"
    >
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
)}
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
          className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-md transition"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
