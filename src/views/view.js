import * as model from "../model/model.js";
import * as cartView from "./cartview.js";
import * as forgetView from "./forgetview.js";
import * as homeView from "./homeview.js";
import * as loginView from "./loginview.js";
import * as notFoundView from "./notfoundview.js";
import * as registerView from "./registerview.js";

const app = document.querySelector("#app");

export function render(page, data, authState) {
  const hm = [];
  const nav = navbar(authState);
  const foot = footer();
  if (page === "/home") {
    hm.push(nav);
    hm.push(homeView.homeView(data));
    hm.push(foot);
    app.innerHTML = hm.join();
  } else if (page === "/cart") {
    hm.push(nav);
    hm.push(cartView.cartView(data));
    hm.push(foot);
    app.innerHTML = hm.join("");
  } else if (page.startsWith("/product/")) {
    hm.push(navbar());
    hm.push(homeView.onePageProduct(data));
    hm.push(footer());
    app.innerHTML = hm.join("");
    window.scrollTo(top);
  } else if (page === "/login") {
    app.innerHTML = loginView.loginView();
  }
}

function navbar(authState) {
  let logIco;
  if (authState === "logged")
    logIco = `<li><a id="logout" href="#/home"><i class="fa-solid fa-arrow-right-from-bracket text-[24px] cursor-pointer hover:scale-[1.1] transition-all ease-in-out" "=""></i></a></li>`;
  else logIco = `<li><a href="#/login"><i class="fa-solid fa-user text-[24px] cursor-pointer hover:scale-[1.1] transition-all ease-in-out" "=""></i></a></li>`;
  return `
              <nav
                class="py-[20px] px-[36px] bg-[#F5F5F2] w-full flex justify-between items-center shadow-lg fixed top-0 border-be-1 border-b-gray-300"
              >
                <a href="#/home">
                  <img
                    src="/assets/SOVEN_logo_nav.svg"
                    alt="logo"
                    class="w-[200px]"
                  />
                </a>
                <ul class="flex justify-end gap-6">
                  <li><a href="#/cart" ><i class="fa-solid fa-basket-shopping cursor-pointer hover:scale-[1.1] transition-all ease-in-out text-[24px] "></i></a></li>
                  ${logIco}
                </ul>
              </nav>
  `;
}
function footer() {
  return `<footer class="bg-[#111311] text-[#eee] px-5 md:px-10 lg:px-[80px] xl:px-[150px] pt-[50px] flex flex-col gap-4">
              <div class="flex justify-between items-center flex-col-reverse md:flex-row h-50 md:h-auto">
                <div class="flex flex-col gap-6">
                  <div class="flex flex-col text-[30px] md:text-[32px] leading-[115%] text-center md:text-left">
                    <span>Everyday things.</span>
                    <span class="text-emerald-400">Anything but ordinary.</span>
                  </div>
                  <span class="text-[12px] text-[#888a85]">Home, style, tech, and more. One thoughtful place to shop.</span>
                </div>
                <a href="#/home"><Img class="w-50 md:w-55 self-start" src="/assets/SOVEN_logo_nav_dark.svg" alt="logo" width={} height={} /></a>
              </div>
              <div class=" mt-4 border-t border-mist-800 py-5 text-center text-[#777a74]">
                <p> © 2026 Copyrights</p>
              </div>

          </footer>`;
}
