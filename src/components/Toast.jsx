import React, { useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineWarning } from 'react-icons/ai';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 flex items-center gap-2 px-6 py-3 rounded-lg shadow-lg z-[1000] animate-slideIn 
        ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}
    >
      {type === 'error' ? <AiOutlineWarning className="text-2xl" /> : <AiOutlineCheckCircle className="text-2xl" />}
      <span>{message}</span>
    </div>
  );
}
