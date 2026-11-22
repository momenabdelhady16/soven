import { auth } from "../config/firebase.js";
import * as authService from "../services/authservice.js";
import * as cartService from "../services/cartservice.js";
import * as productsService from "../services/productsservice.js";
import * as escapeHtml from "../utils/escapehtml.js";

const state = {
  page: "/",
  auth: { state: "checking", user: null },
  cart: [],
  products: [],
  selectedProduct: [],
};
const listeners = new Set();

export function getState() {
  return { ...state };
}

export function setState(input) {
  Object.assign(state, input);
}

export async function login({ email, password }) {
  try {
    await authService.signInUser(email, password);
  } catch (error) {
    console.log(error);
  }
}
export async function getProducts() {
  return productsService.getAllProducts();
}
export async function getOneProduct(productId) {
  return productsService.getOneProduct(productId);
}
export async function getCart() {
  const uid = getState().auth.user;
  return cartService.getCartItems(uid);
}
