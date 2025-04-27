//    src/components/RecommendedProducts.jsx
import React from 'react';
import ProductCard from './ProductCard';
import rec1 from '/assets/Floor/Floor-1.jpg';
import rec3 from '/assets/Floor/Floor-2.jpg';
import rec2 from '/assets/Floor/Floor-3.jpg';

const recommendedProducts = [
  { id: 1, name: 'Recommended Product 1', price: 29.99, imageUrl: rec1 },
  { id: 2, name: 'Recommended Product 2', price: 39.99, imageUrl: rec2 },
  { id: 2, name: 'Recommended Product 2', price: 39.99, imageUrl: rec2 },
  { id: 2, name: 'Recommended Product 2', price: 39.99, imageUrl: rec2 },
  { id: 3, name: 'Recommended Product 3', price: 49.99, imageUrl: rec3 },
];

const RecommendedProducts = ({ onAddToCart }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
