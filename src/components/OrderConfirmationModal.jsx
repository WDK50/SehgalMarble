import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const OrderConfirmationModal = ({ onClose, onSubmit, cartItems, total }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    contactNumber: '',
    
    // Receiver Information
    receiverName: '',
    receiverCNIC: '',
    relationship: '',
    
    // Delivery Information
    country: 'Pakistan',
    state: '',
    city: '',
    zipCode: '',
    landmark: '',
    completeAddress: '',
    deliveryInstructions: '',
    
    // Payment Information
    paymentMethod: 'cash',
    transactionId: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pakistaniStates = [
    'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 
    'Balochistan', 'Gilgit-Baltistan', 'Azad Kashmir'
  ];

  const relationships = [
    'Self', 'Family Member', 'Friend', 
    'Colleague', 'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'fullName', 'contactNumber', 'receiverName',
      'receiverCNIC', 'relationship', 'country',
      'state', 'city', 'zipCode', 'completeAddress'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').trim()} is required`;
      }
    });

    // CNIC validation
    if (!/^\d{5}-\d{7}-\d$/.test(formData.receiverCNIC)) {
      newErrors.receiverCNIC = 'Invalid CNIC format (XXXXX-XXXXXXX-X)';
    }

    // Phone validation
    if (!/^03\d{9}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid format (03XXXXXXXXX)';
    }

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Transaction ID validation for non-cash payments
    if (formData.paymentMethod !== 'cash' && !formData.transactionId) {
      newErrors.transactionId = 'Transaction ID is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendConfirmationEmails = async () => {
    const orderId = `SM-${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleDateString('en-PK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Customer Email
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
      {
        order_id: orderId,
        order_date: orderDate,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.contactNumber,
        receiver_name: formData.receiverName,
        receiver_relationship: formData.relationship,
        delivery_address: `
          ${formData.completeAddress}
          ${formData.landmark ? `Landmark: ${formData.landmark}` : ''}
          ${formData.city}, ${formData.state}
          ${formData.zipCode}
          ${formData.country}
        `,
        delivery_instructions: formData.deliveryInstructions || 'None',
        payment_method: formData.paymentMethod.toUpperCase(),
        transaction_id: formData.transactionId || 'N/A',
        order_total: total.toFixed(2),
        order_items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price.toFixed(2),
          total: (item.price * item.quantity).toFixed(2)
        }))
      },
      import.meta.env.VITE_EMAILJS_USER_ID
    );

    // Owner Email
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
      {
        order_id: orderId,
        order_date: orderDate,
        customer_name: formData.fullName,
        customer_contact: formData.contactNumber,
        customer_email: formData.email || 'Not provided',
        receiver_info: `
          Name: ${formData.receiverName}
          CNIC: ${formData.receiverCNIC}
          Relationship: ${formData.relationship}
        `,
        delivery_info: `
          Address: ${formData.completeAddress}
          Landmark: ${formData.landmark || 'None'}
          City: ${formData.city}
          State: ${formData.state}
          Zip: ${formData.zipCode}
          Country: ${formData.country}
          Instructions: ${formData.deliveryInstructions || 'None'}
        `,
        payment_info: `
          Method: ${formData.paymentMethod.toUpperCase()}
          ${formData.transactionId ? `Transaction ID: ${formData.transactionId}` : ''}
        `,
        order_summary: cartItems.map(item => `
          • ${item.name}
            - Quantity: ${item.quantity}
            - Price: $${item.price.toFixed(2)}
            - Total: $${(item.price * item.quantity).toFixed(2)}
        `).join('\n'),
        order_total: total.toFixed(2),
        urgent: cartItems.some(item => item.category === 'Marble') ? 'URGENT: Marble order' : 'Standard order'
      },
      import.meta.env.VITE_EMAILJS_USER_ID
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      await sendConfirmationEmails();
      onSubmit({
        ...formData,
        orderId: `SM-${Date.now().toString().slice(-6)}`,
        items: cartItems,
        total,
        date: new Date().toISOString()
      });
    } catch (error) {
      alert('Failed to process order. Please try again or contact support.');
      console.error('Order submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Complete Your Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="03XXXXXXXXX"
                  className="w-full p-2 border rounded"
                />
                {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
              </div>
            </div>
          </div>

          {/* Receiver Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Receiver Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Receiver Name *</label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.receiverName && <p className="text-red-500 text-sm mt-1">{errors.receiverName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Receiver CNIC *</label>
                <input
                  type="text"
                  name="receiverCNIC"
                  value={formData.receiverCNIC}
                  onChange={handleChange}
                  placeholder="XXXXX-XXXXXXX-X"
                  className="w-full p-2 border rounded"
                />
                {errors.receiverCNIC && <p className="text-red-500 text-sm mt-1">{errors.receiverCNIC}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Relationship *</label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Relationship</option>
                  {relationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
                {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Delivery Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State/Province *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select State</option>
                  {pakistaniStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Complete Address *</label>
                <textarea
                  name="completeAddress"
                  value={formData.completeAddress}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  placeholder="House #, Street, Area"
                />
                {errors.completeAddress && <p className="text-red-500 text-sm mt-1">{errors.completeAddress}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Near famous place/building"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Delivery Instructions</label>
                <textarea
                  name="deliveryInstructions"
                  value={formData.deliveryInstructions}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="2"
                  placeholder="Any special instructions"
                />
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">EasyPaisa</option>
                </select>
              </div>
              {formData.paymentMethod !== 'cash' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Transaction ID *</label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter transaction reference"
                  />
                  {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Confirm Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;