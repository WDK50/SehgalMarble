/* eslint-disable no-unused-vars */
// src/Pages/Cart.jsx
import React, { useState } from 'react';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import OrderConfirmationModal from '../components/OrderConfirmationModal';

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    clearCart
  } = useCart();

  const [showOrderModal, setShowOrderModal] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrderSubmit = async orderDetails => {
    const itemsMessage = cartItems
      .map(
        item =>
          `• ${item.name} (${item.code}) [${item.size}] x ${item.quantity} - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join('%0A');

    const customerMessage = `
*Sehgal Marble Order Confirmation*%0A%0A
*Order ID*: ${orderDetails.orderId}%0A
*Date*: ${new Date(orderDetails.date).toLocaleDateString('en-PK')}%0A%0A
*Customer Information*%0A
Name: ${orderDetails.fullName}%0A
Contact: ${orderDetails.contactNumber}%0A
${orderDetails.email ? `Email: ${orderDetails.email}%0A` : ''}%0A
*Delivery Address*%0A
${orderDetails.completeAddress}%0A
${orderDetails.landmark ? `Landmark: ${orderDetails.landmark}%0A` : ''}
${orderDetails.city}, ${orderDetails.state}%0A
${orderDetails.zipCode}, ${orderDetails.country}%0A%0A
*Payment Method*%0A
${orderDetails.paymentMethod.toUpperCase()}%0A
${orderDetails.transactionId ? `Transaction ID: ${orderDetails.transactionId}%0A` : ''}%0A
*Order Items*%0A
${itemsMessage}%0A%0A
*Total Amount*: $${orderDetails.total.toFixed(2)}%0A%0A
Thank you for your order!
    `.replace(/\s+/g, ' ')
      .trim();

    const whatsappUrl = `https://wa.me/923278600444?text=${customerMessage}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    alert(
      `Order #${orderDetails.orderId} confirmed!\n\nA confirmation has been sent to ${
        orderDetails.email || 'your phone number'
      }`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <FiShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-700">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id + item.size} className="p-4">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-5 flex items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.code}</p>
                        <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                      </div>
                    </div>

                    <div className="col-span-2 text-center text-gray-700">
                      ${item.price.toFixed(2)}
                    </div>

                    <div className="col-span-3">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id, item.size)}
                          className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition cursor-pointer"
                        >
                          {item.quantity === 1 ? (
                            <FiTrash2 className="w-4 h-4 text-red-500" />
                          ) : (
                            <FiMinus className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id, item.size)}
                          className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition cursor-pointer"
                        >
                          <FiPlus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-gray-50 border-t">
              <div className="flex justify-end">
                <div className="text-right space-y-2">
                  <div className="flex justify-between w-64">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between w-64">
                    <span className="text-gray-600">Delivery:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between w-64 font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-gray-200 rounded-md hover:bg-gray-300 transition text-center cursor-pointer"
            >
              Continue Shopping
            </Link>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition cursor-pointer"
              >
                Clear Cart
              </button>
              <button
                onClick={() => setShowOrderModal(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex-1 cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {showOrderModal && (
        <OrderConfirmationModal
          onClose={() => setShowOrderModal(false)}
          onSubmit={handleOrderSubmit}
          cartItems={cartItems}
          total={total}
        />
      )}
    </div>
  );
}
