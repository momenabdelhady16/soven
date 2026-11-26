import { db } from "../config/firebase.js";
import {
  collection,
  setDoc,
  increment,
  getDocs,
  writeBatch,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const addToCart = async (uid, productId, add = true) => {
  await setDoc(
    doc(db, "users", uid, "cart", `${productId}`),
    {
      quantity: add ? increment(1) : increment(-1),
    },
    { merge: true },
  );
};

export const getCartItems = async (uid) => {
  const snapshot = await getDocs(collection(db, "users", uid, "cart"));
  const cartItems = snapshot.docs.map((item) => ({
    id: Number(item.id),
    quantity: item.data().quantity,
  }));
  return cartItems;
};

export const removeFromCart = (uid, productId) => {
  return deleteDoc(doc(db, "users", uid, "cart", `${productId}`));
};

export const clearCart = async (uid) => {
  const batch = writeBatch(db);
  const snapshot = await getDocs(collection(db, "users", uid, "cart"));
  snapshot.forEach((d) => {
    batch.delete(d.ref);
  });
  return batch.commit();
};
