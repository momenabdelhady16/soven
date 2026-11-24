import { auth } from "../config/firebase.js";
import * as authentication from "firebase/auth";

export const createUser = (email, password) => {
  return authentication.createUserWithEmailAndPassword(auth, email, password);
};
export const signInUser = (email, password) => {
  return authentication.signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = () => {
  return authentication.signOut(auth);
};
export const onAuthStateChanged = (callback) => {
  return authentication.onAuthStateChanged(auth, callback);
};
export const sendPasswordResetEmail = (email) => {
  return authentication.sendPasswordResetEmail(auth, email);
};
export async function authState() {
  await auth.authStateReady();
  return auth.currentUser;
}
