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
  await model.initCart();
  const app = document.querySelector("#app");
  await refresh(model, router, view);

  app.addEventListener("click", (e) => {
    const state = model.getState();
    if (e.target.closest("#login")) {
      const loginForm = e.target.closest("#login-form");
      e.preventDefault();
      const input = Object.fromEntries(new FormData(loginForm));
      model.login(input);
    } else if (e.target.closest(".btn-add-to-cart")) {
      e.preventDefault();
      const quantityForm = document.querySelector("#quantity-form");
      const quant = Object.fromEntries(new FormData(quantityForm));
      model.addToCart(
        e.target.closest(".btn-add-to-cart").dataset.id,
        +quant.quantity,
      );
    } else if (e.target.closest(".btn-add-one")) {
      e.preventDefault();
      const quant = e.target.closest(".btn-add-one").dataset.value;
      model.addToCart(e.target.closest(".btn-add-one").dataset.id, +quant);
    } else if (e.target.closest("#decrease-quantity")) {
    } else if (e.target.closest(".btn-remove-one")) {
      e.preventDefault();
      const quant = e.target.closest(".btn-remove-one").dataset.value;
      model.addToCart(
        e.target.closest(".btn-remove-one").dataset.id,
        +quant,
        false,
      );
    } else if (e.target.closest("#decrease-quantity")) {
    } else if (e.target.closest("#decrease-quantity")) {
      e.preventDefault();
      const quantity = document.querySelector("#quantity");
      quantity.value = +quantity.value - 1;
    } else if (e.target.closest("#increase-quantity")) {
      e.preventDefault();
      const quantity = document.querySelector("#quantity");
      quantity.value = +quantity.value + 1;
    } else if (e.target.closest("#logout")) {
      e.preventDefault();
      model.logout();
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
    view.render(state.page,state.auth.state);
  } else if (state.page === "/home") {
    const data = await model.getProducts();
    view.render(state.page, data,state.auth.state);
  } else if (state.page.startsWith("/product/")) {
    const data = await model.getOneProduct(state.selectedProduct);
    view.render(state.page, data,state.auth.state);
  } else if (state.page === "/cart") {
    const data = await model.prepareCart();
    view.render(state.page, data,state.auth.state);
  }
}
