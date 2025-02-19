// Import & Initialize Firebase
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBspSRXy4TDTnaoJGXcjwGoUa0Ywj1GmaU",
    authDomain: "cloud-inventory-c65bb.firebaseapp.com",
    projectId: "cloud-inventory-c65bb",
    storageBucket: "cloud-inventory-c65bb.firebasestorage.app",
    messagingSenderId: "389676809805",
    appId: "1:389676809805:web:28e6bd24f5c3b81f3e2604",
    measurementId: "G-2WG7YWCSJ6"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
