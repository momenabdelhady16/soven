# SOVEN

**Live demo:** https://soven-ten.vercel.app/

> Everyday things. Anything but ordinary.

SOVEN is a single-page e-commerce application built with vanilla JavaScript. It follows an MVC architecture with a dedicated service layer, uses Firebase for authentication and per-user carts, and pulls its product catalog from a public REST API.

## Features

- Browse the product catalog in a responsive grid
- Product details page with description, price and customer reviews
- Add products to the cart with a chosen quantity
- Cart page with quantity controls and live totals
- Email/password sign in and sign out
- Protected cart route (redirects guests to the login page)
- Cart saved per user in Firestore, so it follows the user across sessions and devices

The login form is pre-filled with a demo guest account for quick testing.

---

## Getting Started

There are two ways to run SOVEN.

### Option 1: Use the live demo

No setup needed. Open https://soven-ten.vercel.app/ in your browser.

### Option 2: Run locally with the project files

Prerequisites (used only for the development tooling, the app itself runs entirely in the browser):

- **npm**, which comes with **Node.js** `^20.19.0` or `>=22.12.0` (required by Vite 8)

```bash
git clone https://github.com/momenabdelhady16/soven.git
cd soven
npm install
npm run dev
```

If you already have the project folder, skip the `git clone` and run `npm install` and `npm run dev` inside it. The dev server starts on Vite's default address, `http://localhost:5173`.

### Available scripts

| Script            | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Create a production build in `dist/`     |
| `npm run preview` | Preview the production build locally     |

### Using your own Firebase project

The Firebase configuration lives in `src/config/firebase.js`. To run the app against your own backend:

1. Create a Firebase project and register a web app.
2. Enable the **Email/Password** provider in Authentication.
3. Create a **Cloud Firestore** database.
4. Replace the values in `firebaseConfig` inside `src/config/firebase.js`.

---

## Project Structure

```
soven/
├── index.html                  # Single HTML shell with the #app mount point
├── vite.config.js              # Vite + Tailwind plugin
├── package.json
├── css/
│   └── style.css               # Tailwind entry (@import "tailwindcss")
├── assets/                     # Logos, favicon and background image
└── src/
    ├── main.js                 # Entry point and composition root
    ├── router.js               # Route table, guards and navigation
    ├── config/
    │   └── firebase.js         # Firebase initialization (app, auth, db)
    ├── model/
    │   └── model.js            # Application state and business operations
    ├── controller/
    │   └── controller.js       # Event handling and render orchestration
    ├── views/
    │   ├── view.js             # Page assembly, navbar and footer
    │   ├── homeview.js         # Product grid, product details and reviews
    │   ├── cartview.js         # Cart table and order summary
    │   └── loginview.js        # Sign-in screen
    └── services/
        ├── authservice.js      # Firebase Authentication wrapper
        ├── cartservice.js      # Firestore cart operations
        └── productsservice.js  # Products REST API client
```

| Layer          | Responsibility                                                                 |
| -------------- | ------------------------------------------------------------------------------ |
| **Model**      | Owns the application state, notifies subscribers, exposes business operations  |
| **View**       | Pure functions that turn data into HTML strings                                |
| **Controller** | Listens to user and browser events, calls the model, triggers rendering        |
| **Services**   | The only code that talks to Firebase and the REST API                          |
| **Router**     | Maps the URL hash and auth state to a page                                     |

---

## Technologies

| Category        | Technology                                                |
| --------------- | --------------------------------------------------------- |
| Language        | JavaScript (ES Modules), HTML5                            |
| Styling         | Tailwind CSS v4                                           |
| Build tool      | Vite 8                                                    |
| Authentication  | Firebase Authentication (Email/Password)                  |
| Database        | Cloud Firestore                                           |
| Product data    | [DummyJSON](https://dummyjson.com/products) REST API      |
| Icons           | Font Awesome 7.3.1 (CDN)                                  |
| Typography      | Manrope (Google Fonts)                                    |
| Deployment      | Vercel                                                    |

### Dependencies

**Runtime**

| Package       | Version   | Purpose                                  |
| ------------- | --------- | ---------------------------------------- |
| `firebase`    | `^13.4.0` | Authentication and Firestore SDK         |
| `tailwindcss` | `^4.3.5`  | Utility-first CSS framework              |

**Development**

| Package             | Version   | Purpose                                   |
| ------------------- | --------- | ----------------------------------------- |
| `vite`              | `^8.3.8`  | Dev server and production bundler         |
| `@tailwindcss/vite` | `^4.3.5`  | Tailwind v4 integration for Vite          |

**External services**

- Firebase project (Authentication + Firestore)
- `https://dummyjson.com/products` for the product catalog

---

## Engineering Concepts

### Data flow

```
User event ─► Controller ─► Model action ─► Service (Firestore / REST)
                                                 │
View.render ◄─ Controller.refresh ◄─ notify ◄─ setState (only if something changed)
```

Every interaction follows the same one-way loop. For example, clicking "Add to Cart" calls `model.addToCart`, which writes through `cartService`, reloads the cart into the state, and the resulting state change triggers a re-render.

### 1. MVC with a service layer

Responsibilities are split into Model, View, Controller and Services. Views never fetch data or touch state, the controller never builds HTML, and only the services know about Firebase or the REST endpoint. Replacing a backend means changing a service file and nothing else.

### 2. Centralized state and the Observer pattern

All shared state (`page`, `auth`, `cart`, `selectedProduct`) lives in one place in the model. The model exposes `getState`, `setState` and `subscribe`, and the controller subscribes a single `refresh` function that re-renders whenever the state changes. This gives the app a single source of truth and a predictable update cycle.

### 3. Defensive state updates

`setState` is more than a plain assignment:

- **Key whitelist.** Only keys that already exist in the state are accepted (`Object.hasOwn`).
- **Change detection.** Auth is compared by state and user, the cart is compared item by item through a `Map`, and other keys by strict inequality. Subscribers are notified only when something actually changed, which avoids redundant renders and network calls.
- **Normalization.** Cart items with a quantity of zero or less are dropped, and each item is reduced to `{ id, quantity }`.
- **Derived state.** `selectedProduct` is computed automatically from the page whenever a `/product/:id` route is entered.
- **Copy on read.** `getState` returns a shallow copy, so consumers cannot reassign the store's top-level keys.

### 4. Composition root and Dependency Injection

`main.js` is the only place where the modules are wired together. It builds a `deps` object (model, view, router and services) and hands it to `initController`. The controller file has no imports at all, which keeps it decoupled from concrete implementations and easy to test or swap.

### 5. Hash-based router with route guards

The router is a function of the auth state and the current URL hash:

- A route table of regular expressions, including a dynamic segment for `/product/:id`
- **Guards:** guests who open `/cart` are redirected to `/login`, and signed-in users are redirected away from `/login`
- **Two-way synchronization:** `hashchange` updates the state, and each render syncs the URL back to the state, with an early return in `navigateTo` to prevent loops
- `location.replace` is used for redirects so guard bounces do not pollute the browser history

Hash routing also means the app works on any static host without server-side rewrite rules.

### 6. Event delegation

The controller attaches a single `click` listener to `#app` and resolves targets with `closest()`. Because the DOM is re-rendered on every state change, delegation removes the need to re-bind listeners after each render. Elements carry the data they need through `data-*` attributes, and forms are read with `FormData` and `Object.fromEntries`.

### 7. Authentication lifecycle

- The app waits for `auth.authStateReady()` before the first render, so users never see a flash of the wrong signed-in or signed-out UI.
- `onAuthStateChanged` keeps the model in sync with Firebase and ignores duplicate events.
- After each auth change the router guards run again, so login and logout redirect to the right page automatically.
- Credentials are handled entirely by Firebase Authentication.

### 8. Firestore data modeling and atomic updates

Each user's cart is stored as a subcollection: `users/{uid}/cart/{productId}`, where the document ID is the product ID and the document holds only a `quantity`. Updates use `setDoc` with `{ merge: true }` and `increment()`:

- The document is created on first use and updated afterwards, with no existence check
- The change is applied on the server, which removes the read-modify-write race condition

### 9. Normalized data and join at read time

The cart stores only product IDs and quantities. Product details (title, image, price) are always fetched from the products API when the cart is displayed, so prices are never stale or duplicated. `prepareCart` loads all cart products in parallel with `Promise.all` and combines them with the quantities through a `Map` for O(1) lookups.

### 10. Pure view functions and template composition

Each view is a function that takes data and returns an HTML string. Pages are assembled by composing smaller pieces (navbar, page content, footer), and reusable helpers such as `fillInCards` and the reviews renderer keep templates small. The navbar adapts to the auth state it receives as an argument.

### 11. Network error handling

Every request in `productsservice` checks `response.ok` and throws a descriptive error with the HTTP status instead of silently parsing a failed response.

### 12. Modern tooling

- ES Modules with namespace imports (`import * as ...`) throughout
- Vite for the dev server and optimized production builds
- Tailwind CSS v4 through its Vite plugin, with a single `@import "tailwindcss"` entry and no separate config file

### 13. Responsive and performance-aware UI

- Mobile-first layout using Tailwind breakpoints, with the product grid scaling from 1 to 4 columns
- Fluid typography with `clamp()` on the login screen
- Lazy-loaded background image and `preconnect` hints for Google Fonts
- Semantic HTML (`nav`, `main`, `section`, `footer`), labeled form fields and `alt` text on images