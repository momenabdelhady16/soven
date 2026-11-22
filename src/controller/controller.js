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
  let productId;
  const app = document.querySelector("#app");
  app.addEventListener("click", (e) => {
    const login = e.target.closest("#login");
    if (login) {
      const loginForm = e.target.closest("#login-form");
      e.preventDefault();
      const input = Object.fromEntries(new FormData(loginForm));
      model.login(input);
    }
  });

  window.addEventListener("hashchange", async () => {
    const state = model.getState();
    const recentPath = router.router(state.auth.state);
    model.setState({ page: recentPath });
    router.navigateTo(recentPath);
    console.log(recentPath);
    if (
      recentPath === "/login" ||
      recentPath === "/reset-password" ||
      recentPath === "/register" ||
      recentPath === "/loading" ||
      recentPath === "/notfound"
    ) {
      view.render(recentPath);
    } else if (recentPath === "/home") {
      const data = await model.getProducts();
      view.render(recentPath, data);
    } else if (recentPath.startsWith("/product/")) {
      const data = await model.getOneProduct(productId);
      view.render(recentPath, data);
    } else if (recentPath === "/cart") {
      const data = await model.getCart();
      view.render(recentPath, data);
    }
  });
}
