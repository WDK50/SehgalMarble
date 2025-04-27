// src/components/ProductSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductSection = ({ title, products, onAddToCart }) => {
  // Only take first 3 items
  const preview = products.slice(0, 3);

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Link
          to="/products"
          className="text-blue-600 hover:underline inline-flex items-center"
        >
          View All&nbsp;
          <span className="transform translate-y-[1px]">→</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {preview.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
