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
  controller: controller,
  escapeHtml: escapeHtml,
};

window.addEventListener("DOMContentLoaded", () => {
  initApp();
});
async function initApp() {
  await authService.onAuthStateChanged((res) => {
    const state = { auth: { state: "", user: res ? res.uid : null } };
    if (!res) {
      state.auth.state = "notLogged";
    } else state.auth.state = "logged";
    state.page = router.router(state.auth.state);
    model.setState(state);
    const newState = model.getState()
    router.navigateTo(newState.page);
    view.render(newState.page)
  });
  controller.initController(deps);
}
