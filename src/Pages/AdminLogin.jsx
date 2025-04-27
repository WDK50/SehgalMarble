import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const hardcodedID = 'smarble@gmail.com';
    const hardcodedPassword = '@smarble444';

    if (adminID === hardcodedID && password === hardcodedPassword) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/');
    } else {
      setError('Invalid admin ID or password');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/images/bg-login2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-6">
          <FaUserShield className="text-4xl text-teal-500 mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Admin Login</h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin ID"
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;