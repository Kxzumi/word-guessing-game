import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2HJ0ZG3MKIeaK-kTZNkHa8t373A2dU8Y",
  authDomain: "wordguessinggame-4a18e.firebaseapp.com",
  projectId: "wordguessinggame-4a18e",
  storageBucket: "wordguessinggame-4a18e.firebasestorage.app",
  messagingSenderId: "701386693557",
  appId: "1:701386693557:web:69797f23e8c3fafc2fd7fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);