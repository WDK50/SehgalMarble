// src/firebase/auth.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signOut as fbSignOut
} from 'firebase/auth';
import { auth } from './config';

export async function loginWithEmail(email, password) {
  await setPersistence(auth, browserLocalPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

export function registerWithEmail(email, password, displayName) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(cred =>
      updateProfile(cred.user, { displayName }).then(() => cred)
    );
}

export function loginWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function loginWithFacebook() {
  return signInWithPopup(auth, new FacebookAuthProvider());
}

export function logout() {
  return fbSignOut(auth);
}
