// src/components/ProductCard.jsx
import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const { name, price, imageUrl, code } = product;
  return (
    <div className="
        bg-white shadow rounded-lg p-4 flex flex-col justify-between
        hover:scale-105 transition-transform duration-200 cursor-pointer
      ">
      <div className="overflow-hidden rounded-lg mb-4">
        <img
          src={imageUrl}
          srcSet={`
            ${imageUrl}?w=300 300w,
            ${imageUrl}?w=600 600w,
            ${imageUrl}?w=900 900w
          `}
          sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
          loading="lazy"                                   
          alt={name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">#{code}</span>
        </div>
        <p className="text-gray-600 mb-4">Rs {price.toFixed(2)}</p>
        <button
          onClick={()=>onAddToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
