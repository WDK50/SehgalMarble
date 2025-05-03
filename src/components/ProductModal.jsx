// src/components/ProductModal.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { ArrowUp } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  const { addItemToCart, checkIfAlreadyInCart } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  if (!product) return null;

  const handleAddToCart = () => {
    const finalSize = selectedSize;
  
    if (product.sizes?.length && !finalSize) {
      setToast({ show: true, message: 'Please select a size first', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2000);
      return;
    }
  
    if (checkIfAlreadyInCart(product.id, finalSize)) {
      setToast({ show: true, message: 'Product already in cart!', type: 'error' });
      setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 2000);
      return;
    }
  
    addItemToCart({ ...product, quantity, size: finalSize });
    setToast({ show: true, message: 'Added to Cart!', type: 'success' });
  
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
      onClose();
      navigate('/cart');
    }, 800);
  };
  
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full flex flex-col md:flex-row max-h-[90vh] overflow-y-auto shadow-lg">
          
          <div className="md:w-1/2 p-4 bg-gray-50 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 mt-4 object-contain rounded-lg"
            />
          </div>

          <div className="md:w-1/2 p-6 flex flex-col relative">
          <button 
            onClick={onClose} 
            className="fixed overflow-hidden top-10 right-6 md:right-5 md:top-2 md:absolute  text-gray-500 hover:text-gray-700 text-2xl cursor-pointer scrolkjl-smooth "
          >
            &times;
          </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <div className="space-y-1 text-gray-700 mb-4">
              <p><strong>Code:</strong> {product.code}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> Rs {product.price.toFixed(2)}</p>
            </div>

            {product.sizes?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >−</button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={product.stock}
                  onChange={e => {
                    let v = parseInt(e.target.value, 10);
                    if (isNaN(v) || v < 1) v = 1;
                    if (v > product.stock) v = product.stock;
                    setQuantity(v);
                  }}
                  className="w-16 text-center border rounded focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >+</button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{product.stock} available</p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.sizes?.length > 0 && !selectedSize}
              className="mt-auto bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              Add to Cart{selectedSize ? ` (${selectedSize})` : ''} – Rs {(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}
    </>
  );
}
