import React, { useState } from 'react';
import { useCart } from '../context/CartContext';        // import your cart hook 

const ProductModal = ({ product, onClose }) => {
  const { addItemToCart } = useCart();                   // get addItemToCart from context 
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    const sizeToAdd = selectedSize || product.sizes?.[0] || '';  // default to first size if none selected
    addItemToCart({ ...product, quantity, size: sizeToAdd });    // add to cart with size 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
        <div className="md:w-1/2 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-contain rounded-lg"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl">&times;</button>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
          <div className="mb-4 space-y-2 text-gray-600">
            <p><strong>Code:</strong> {product.code}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>

          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded cursor-pointer transition-colors ${
                      selectedSize === size ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
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
            <p className="text-sm text-gray-500 mt-1">{product.stock} available</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={product.sizes?.length > 0 && !selectedSize}
            className="mt-auto bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {`Add to Cart${selectedSize ? ` (${selectedSize})` : ''} - $${(product.price * quantity).toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
