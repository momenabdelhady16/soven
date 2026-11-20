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

export const addToCart = (uid, productId) => {
  return setDoc(
    doc(db, "users", uid, "cart", `${productId}`),
    {
      quantity: increment(1),
    },
    { merge: true },
  );
};

export const getCartItems = (uid) => {
  return getDocs(collection(db, "users", uid, "cart")).then((snapshot) => {
    const cartItems = snapshot.docs.map((item) => ({
      id: Number(item.id),
      quantity: item.data().quantity,
    }));
    return cartItems;
  });
};

export const removeFromCart = (uid, productId) => {
  return deleteDoc(doc(db, "users", uid, "cart", `${productId}`));
};

export const clearCart = (uid) => {
  const batch = writeBatch(db);
  return getDocs(collection(db, "users", uid, "cart"))
    .then((querySnapshot) => {
      querySnapshot.forEach((d) => {
        batch.delete(d.ref);
      });
    })
    .then(() => batch.commit());
};
