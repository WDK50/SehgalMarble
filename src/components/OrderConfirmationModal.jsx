// src/components/OrderConfirmationModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { InputMask } from '@react-input/mask';
import emailjs from '@emailjs/browser';
import Toast from './Toast';
import {pakCities} from '../data/pakCities'

export default function OrderConfirmationModal({ onClose, onSubmit, cartItems, total }) {
  const [data, setData] = useState({
    fullName: '', email: '', contactNumber: '',
    receiverName: '', receiverCNIC: '', relationship: '',
    country: 'Pakistan', state: '', city: '', zipCode: '',
    completeAddress: '', landmark: '', deliveryInstructions: '',
    paymentMethod: 'cash', transactionId: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const states = ['Punjab','Sindh','Khyber Pakhtunkhwa','Balochistan','Gilgit-Baltistan','Azad Kashmir'];
  const relationships = ['Self','Family Member','Friend','Colleague','Other'];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(d => ({ ...d, [name]: value }));
    setErrors(err => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    ['fullName','contactNumber','receiverName','receiverCNIC','relationship','state','city','zipCode','completeAddress']
      .forEach(f => { if (!data[f]?.trim()) e[f] = 'Required'; });
    if (data.contactNumber && !/^03\d{9}$/.test(data.contactNumber))
      e.contactNumber = 'Format: 03XXXXXXXXX';
    if (data.receiverCNIC && !/^\d{5}-\d{7}-\d$/.test(data.receiverCNIC))
      e.receiverCNIC = 'Format: 12345-1234567-1';
    if (data.paymentMethod !== 'cash' && !data.transactionId)
      e.transactionId = 'Required';
    return e;
  };

  const sendEmails = async (orderId, orderDate) => {
    const itemsText = cartItems.map(i =>
      `• ${i.name} (${i.size||'N/A'}) x${i.quantity} — Rs ${(i.price*i.quantity).toFixed(2)}`
    ).join('\n');

    const params = {
      to_email:       data.email,
      to_name:        data.fullName,
      order_id:       orderId,
      order_date:     orderDate,
      customer_name:  data.fullName,
      customer_email: data.email || 'N/A',
      customer_phone: data.contactNumber,
      receiver_name:  data.receiverName,
      receiver_cnic:  data.receiverCNIC,
      receiver_relationship: data.relationship,
      delivery_address: `${data.completeAddress}${data.landmark?`, Lm: ${data.landmark}`:''}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.country}`,
      delivery_instructions: data.deliveryInstructions || 'None',
      payment_method: data.paymentMethod.toUpperCase(),
      transaction_id: data.transactionId || 'N/A',
      order_items:    itemsText,
      order_total:    total.toFixed(2)
    };

    // send to customer
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID,
      params
    );

    // send to owner
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID,
      { ...params,
        to_email: import.meta.env.VITE_ORDER_RECEIVER_EMAIL,
        to_name:  'Store Owner'
      }
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitting(true);

    const orderId = `SM-${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleString('en-PK');
    try {
      await sendEmails(orderId, orderDate);
      setToast({ message: 'Order confirmed!', type: 'success' });
      onSubmit({ ...data, orderId, items: cartItems, total, date: new Date().toISOString() });
    } catch (err) {
      console.error('EmailJS error:', err);
      setToast({ message: 'Submission failed.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
          <div className="sticky top-0 bg-white z-10 flex justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Complete Your Order</h2>
            <button onClick={onClose}><FiX className="h-6 w-6"/></button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Full Name *</label>
                <input name="fullName" value={data.fullName} onChange={handleChange}
                       className="w-full p-2 border rounded"/>
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block mb-1">Contact Number *</label>
                <input name="contactNumber" value={data.contactNumber} onChange={handleChange}
                       placeholder="03XXXXXXXXX" className="w-full p-2 border rounded"/>
                {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Email</label>
                <input name="email" type="email" value={data.email} onChange={handleChange}
                       className="w-full p-2 border rounded"/>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Receiver Name *</label>
                <input name="receiverName" value={data.receiverName} onChange={handleChange}
                       className="w-full p-2 border rounded"/>
                {errors.receiverName && <p className="text-red-500 text-sm">{errors.receiverName}</p>}
              </div>
              <div>
                <label className="block mb-1">Receiver CNIC *</label>
                <InputMask mask="99999-9999999-9" name="receiverCNIC" replacement={{'9':/\d/}}
                           value={data.receiverCNIC} onChange={handleChange}
                           className="w-full p-2 border rounded" placeholder="12345-1234567-1"/>
                {errors.receiverCNIC && <p className="text-red-500 text-sm">{errors.receiverCNIC}</p>}
              </div>
              <div>
                <label className="block mb-1">Relationship *</label>
                <select name="relationship" value={data.relationship} onChange={handleChange}
                        className="w-full p-2 border rounded">
                  <option value="">Select</option>{relationships.map(r=> <option key={r} value={r}>{r}</option>)}
                </select>
                {errors.relationship && <p className="text-red-500 text-sm">{errors.relationship}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">State *</label>
                <select name="state" value={data.state} onChange={handleChange}
                        className="w-full p-2 border rounded">
                  <option value="">Select State</option>{states.map(s=> <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>
              <div>
                <label className="block mb-1">City *</label>
                <select name="city" value={data.city} onChange={handleChange}
                        className="w-full p-2 border rounded">
                  <option value="">Select City</option>{pakCities.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
              <div>
                <label className="block mb-1">Zip Code *</label>
                <input name="zipCode" value={data.zipCode} onChange={handleChange}
                       className="w-full p-2 border rounded"/>
                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Complete Address *</label>
                <textarea name="completeAddress" value={data.completeAddress} onChange={handleChange}
                          className="w-full p-2 border rounded" rows="2"/>
                {errors.completeAddress && <p className="text-red-500 text-sm">{errors.completeAddress}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Payment Method *</label>
                <select name="paymentMethod" value={data.paymentMethod} onChange={handleChange}
                        className="w-full p-2 border rounded">
                  <option value="cash">Cash on Delivery</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="jazzcash">JazzCash</option>
                  <option value="easypaisa">EasyPaisa</option>
                </select>
              </div>
              {data.paymentMethod !== 'cash' && (
                <div>
                  <label className="block mb-1">Transaction ID *</label>
                  <input name="transactionId" value={data.transactionId} onChange={handleChange}
                         className="w-full p-2 border rounded"/>
                  {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId}</p>}
                </div>
              )}
            </div>
            <div>
{/* Order Summary */}
<h3 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-2">
  Order Summary
</h3>
<div className="bg-white p-4 rounded-lg shadow-sm divide-y divide-gray-200">
  {cartItems.map(i => (
    <div
      key={`${i.id}-${i.size}`}
      className="flex justify-between items-center py-3"
    >
      <span className="text-gray-700">
        {i.name} <span className="text-sm text-gray-500">({i.size||'N/A'})</span> × {i.quantity}
      </span>
      <span className="font-medium text-gray-900">
        Rs {(i.price * i.quantity).toFixed(2)}
      </span>
    </div>
  ))}

  <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
    <span className="text-base font-semibold text-gray-800">Total</span>
    <span className="text-xl font-bold text-green-600">
      Rs {total.toFixed(2)}
    </span>
  </div>
</div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" onClick={onClose} disabled={submitting}
                      className="px-5 py-2 bg-gray-300 rounded">Cancel</button>
              <button type="submit" disabled={submitting}
                      className="px-5 py-2 bg-green-600 text-white rounded">
                {submitting ? 'Processing…' : 'Confirm Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
