export async function initController({
  model,
  view,
  router,
  authService,
  cartService,
  productsService,
  controller,
  escapeHtml,
}) {
  model.setState(router.router(model.getState().auth.state));
  model.subscribe(async () => await refresh(model, router, view));
  const app = document.querySelector("#app");
  await refresh(model, router, view);
  app.addEventListener("click", (e) => {
    const login = e.target.closest("#login");
    if (login) {
      const loginForm = e.target.closest("#login-form");
      e.preventDefault();
      const input = Object.fromEntries(new FormData(loginForm));
      model.login(input);
    }
  });

  window.addEventListener("hashchange", () => {
    const state = model.getState();
    const recentPath = router.router(state.auth.state);
    model.setState(recentPath);
  });

  authService.onAuthStateChanged(async (res) => {
    const auth = {
      state: res ? "logged" : "notLogged",
      user: res ? res.uid : null,
    };
    const current = model.getState().auth;
    if (auth.user === current.user && auth.state === current.state) return;
    const page = router.router(auth.state);
    model.setState({ auth, page: page.page });
  });
}
async function refresh(model, router, view) {
  const state = model.getState();
  router.navigateTo(state.page);
  if (
    state.page === "/login" ||
    state.page === "/reset-password" ||
    state.page === "/register" ||
    state.page === "/loading" ||
    state.page === "/notfound"
  ) {
    view.render(state.page);
  } else if (state.page === "/home") {
    const data = await model.getProducts();
    view.render(state.page, data);
  } else if (state.page.startsWith("/product/")) {
    const data = await model.getOneProduct(state.selectedProduct);
    view.render(state.page, data);
  } else if (state.page === "/cart") {
    const data = await model.getCart();
    view.render(state.page, data);
  }
}
