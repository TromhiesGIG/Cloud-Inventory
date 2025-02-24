// firebase.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBspSRXy4TDTnaoJGXcjwGoUa0Ywj1GmaU",
  authDomain: "cloud-inventory-c65bb.firebaseapp.com",
  databaseURL: "https://cloud-inventory-c65bb-default-rtdb.firebaseio.com",
  projectId: "cloud-inventory-c65bb",
  storageBucket: "cloud-inventory-c65bb.appspot.com",
  messagingSenderId: "389676809805",
  appId: "1:389676809805:web:28e6bd24f5c3b81f3e2604",
  measurementId: "G-2WG7YWCSJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to handle login
export function signIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Login Successful!");
      window.location.href = "dashboard.html"; // Redirect to dashboard after login
    })
    .catch((error) => console.error("Error signing in:", error));
}