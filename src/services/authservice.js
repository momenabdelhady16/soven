import { auth } from "../config/firebase.js";
import * as authentication from "firebase/auth";

export const createUser = (auth, email, password) => {
  return authentication.createUserWithEmailAndPassword(auth, email, password);
};
export const signInUser = (auth, email, password) => {
  return authentication.signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = (auth) => {
  return authentication.signOut(auth);
};
export const onAuthStateChanged = (auth, callback) => {
  return authentication.onAuthStateChanged(auth, callback);
};
export const sendPasswordResetEmail = (auth, email) => {
  return authentication.sendPasswordResetEmail(auth, email);
};
