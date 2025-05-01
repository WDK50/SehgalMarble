import React from "react";

const ProductCard = ({ product, onAddToCart, onClick }) => {
  const { name, price, imageUrl, code } = product;

  return (
    <div
      onClick={onClick} 
      className="bg-white hover:scale-105 hover:bg-amber-300 shadow rounded-lg p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition"
    >
      <div className="overflow-hidden rounded-lg mb-4 group">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            #{code}
          </span>
        </div>
        <p className="text-gray-600 mb-4">
          Rs {price.toFixed(2)}
        </p>
        <button
          onClick={() => {
            onAddToCart(product);
          }}
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        >
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
