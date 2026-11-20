
const state = {
  page: "/",
  auth: { state: "checking", user: null },
  cart: [],
  products: [],
  selectedProduct: null,
};
const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
}

export function setState(input) {
  Object.assign(state, input);
  listeners.forEach((fn) => fn());
}
