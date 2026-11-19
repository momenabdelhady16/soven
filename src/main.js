// config
import * as firebase from "./config/firebase.js";

// utils
import * as escapeHtml from "./utils/escapehtml.js";
import * as ui from "./utils/ui.js";

// services
import * as authService from "./services/authservice.js";
import * as cartService from "./services/cartservice.js";
import * as productsService from "./services/productsservice.js";

// controllers
import * as authController from "./controllers/authcontroller.js";
import * as cartController from "./controllers/cartcontroller.js";
import * as productsController from "./controllers/productscontroller.js";

// views
import * as cartView from "./views/cartview.js";
import * as forgetView from "./views/forgetview.js";
import * as homeView from "./views/homeview.js";
import * as loginView from "./views/loginview.js";
import * as notFoundView from "./views/notfoundview.js";
import * as registerView from "./views/registerview.js";

// router
import * as router from "./router.js";

