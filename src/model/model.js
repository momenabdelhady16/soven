import { auth } from "../config/firebase.js";
import * as authService from "../services/authservice.js";
import * as cartService from "../services/cartservice.js";
import * as productsService from "../services/productsservice.js";
import * as escapeHtml from "../utils/escapehtml.js";

const state = {
  page: "/",
  auth: { state: "checking", user: null },
  cart: [],
  selectedProduct: "",
};
const listeners = new Set();

export const subscribe = (fn) => {
  listeners.add(fn);
};
export function getState() {
  return { ...state };
}

export function setState(input) {
  const inputKeys = Object.keys(input);
  const newState = {};
  inputKeys.forEach((key) => {
    if (!Object.hasOwn(state, key)) return;
    if (key === "auth") {
      if (
        state.auth.state !== input.auth.state ||
        state.auth.user !== input.auth.user
      ) {
        newState.auth = input.auth;
      }
    } else if (key === "cart") {
      const oldCart = new Map(state.cart.map((i) => [i.id, i.quantity]));
      const newCart = input.cart.filter((i) => +i.quantity > 0);

      const changed =
        newCart.length !== state.cart.length ||
        newCart.some((item) => +oldCart.get(item.id) !== +item.quantity);
      if (changed) {
        newState.cart = newCart.map((item) => {
          return { id: item.id, quantity: item.quantity };
        });
      }
    } else {
      if (state[key] !== input[key]) newState[key] = input[key];
    }
  });

  if (Object.keys(newState).length > 0) {
    if (newState.page?.startsWith("/product/")) {
      newState.selectedProduct = newState.page.split("/")[2];
    }
    Object.assign(state, newState);
    listeners.forEach((fn) => fn());
  } else return;
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

export async function getCart() {
  const uid = getState().auth.user;
  return cartService.getCartItems(uid);
}
export async function getOneProduct(id){
  const data = await productsService.getOneProduct(id)
  return data
}