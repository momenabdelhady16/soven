import * as model from "./model/model.js";
import * as view from "./views/view.js";
import * as router from "./router.js";
import * as authService from "./services/authservice.js";
import * as cartService from "./services/cartservice.js";
import * as productsService from "./services/productsservice.js";
import * as controller from "./controller/controller.js";
import * as escapeHtml from "./utils/escapehtml.js";

const deps = {
  model: model,
  view: view,
  router: router,
  authService: authService,
  cartService: cartService,
  productsService: productsService,
  escapeHtml: escapeHtml,
};

window.addEventListener("DOMContentLoaded", () => {
  initApp();
});
async function initApp() {
  const authState = await authService.authState();
  const state = {
    auth: {
      state: authState ? "logged" : "notLogged",
      user: authState ? authState.uid : null,
    },
  };
  model.setState(state);
  controller.initController(deps);
}
