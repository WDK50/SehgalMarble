/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [init, setInit] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setInit(false);
    });
    return unsub;
  }, []);

  if (init) return null;
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}
