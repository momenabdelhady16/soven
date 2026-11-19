import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsYioVqDT8GslfALTtINLuT2E6eBjdFvM",
  authDomain: "market-place-cde3c.firebaseapp.com",
  projectId: "market-place-cde3c",
  storageBucket: "market-place-cde3c.firebasestorage.app",
  messagingSenderId: "837966615208",
  appId: "1:837966615208:web:6cccc71ec1d80dfde6289d",
  measurementId: "G-X24Z3P7CL9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
