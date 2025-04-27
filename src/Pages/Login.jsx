/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginWithFacebook
} from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useAuth();

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
        navigate('/');
      } else {
        if (password !== confirm) throw new Error('Passwords must match');
        await registerWithEmail(email, password, `${firstName} ${lastName}`);
        // after registering, stay on login page
        navigate('/login');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundImage: "url('/images/bg-login.jpg')", backgroundSize: 'cover' }}>
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-md w-full p-8">
        <div className="flex justify-center mb-6 space-x-8">
          <button onClick={() => setIsLogin(true)} className={`px-6 py-2 ${isLogin ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`px-6 py-2 ${!isLogin ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500'}`}>Register</button>
        </div>
        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}
        {isLogin && (
          <div className="flex justify-center space-x-4 mb-8">
            <FaGoogle onClick={async () => { try { await loginWithGoogle(); navigate('/'); } catch(e){setError(e.message);} }} className="text-red-600 text-xl cursor-pointer" />
            <FaFacebookF onClick={async () => { try { await loginWithFacebook(); navigate('/'); } catch(e){setError(e.message);} }} className="text-blue-600 text-xl cursor-pointer" />
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" className="w-full p-3 border rounded-lg" required />
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" className="w-full p-3 border rounded-lg" required />
            </div>
          )}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded-lg" required />
          <div className="relative">
            <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border rounded-lg pr-10" required />
            <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">{showPass ? <FaEyeSlash/> : <FaEye/>}</span>
          </div>
          {!isLogin && (
            <div className="relative">
              <input type={showConf ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm Password" className="w-full p-3 border rounded-lg pr-10" required />
              <span onClick={() => setShowConf(!showConf)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">{showConf ? <FaEyeSlash/> : <FaEye/>}</span>
            </div>
          )}
          <button type="submit" className="w-full py-3 bg-teal-500 text-white rounded-lg">{isLogin ? 'Login' : 'Register'}</button>
        </form>
      </div>
    </div>
  );
}
