// CartList.js
import React from 'react';
import { useCart } from '../context/CartContext';

const CartList = () => {
  const { cartItems } = useCart();

  return (
    <div className="container mt-12 mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Cart Items</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map(({ id, name, price, quantity, imageUrl }) => (
            <div
              key={id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="font-semibold text-xl text-gray-800">{name}</h2>
              <p className="text-gray-600">Price: ${price.toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {quantity}</p>
              <p className="text-gray-800 font-semibold">
                Total: ${(price * quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartList;
