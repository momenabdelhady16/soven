import * as model from "../model/model.js";
import * as cartView from "./cartview.js";
import * as forgetView from "./forgetview.js";
import * as homeView from "./homeview.js";
import * as loginView from "./loginview.js";
import * as notFoundView from "./notfoundview.js";
import * as registerView from "./registerview.js";

const app = document.querySelector("#app");

export function render(page, data) {
  if (page === "/home") {
    app.innerHTML = homeView.homeView();
  } else if (page === "/cart") {
    app.innerHTML = cartView.cartView();
  }
}

