import { setState } from "./model/model.js";
const routes = [
  { path: /^\/$/ },
  { path: /^\/home$/ },
  { path: /^\/login$/ },
  { path: /^\/register$/ },
  { path: /^\/reset-password$/ },
  { path: /^\/notfound$/ },
  { path: /^\/product\/(\d+)$/ },
  { path: /^\/cart$/ },
  { path: /^\/loading$/ },
];
export const router = (authState) => {
  const recentPath = [];
  const endPoint = location.hash.slice(1);
  if (authState === "checking") {
    recentPath.push("/loading");
    return recentPath.join();
  } else if (authState === "notLogged" && endPoint === "/cart") {
    recentPath.push(`/login`);
    return recentPath.join();
  } else if (authState === "logged") {
    if (
      endPoint === "/login" ||
      endPoint === "/reset-password" ||
      endPoint === "/register"
    ) {
      recentPath.push(`/home`);
      return recentPath.join();
    }
  }
  routes.forEach((route) => {
    endPoint.match(route.path)
      ? recentPath.push(endPoint.match(route.path)[0])
      : null;
  });
  if (!recentPath.length) {
    recentPath.push("/notfound");
  }
  return recentPath.join();
};
export function navigateTo(path) {
  if (location.hash === `#${path}`) return;
  location.replace(`#${path}`);
}
