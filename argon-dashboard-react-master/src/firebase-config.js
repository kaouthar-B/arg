// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjPoksEsMVw4L_V9aX7slEbOnDqbxwuz0",
  authDomain: "bcp-3bc5b.firebaseapp.com",
  databaseURL: "https://bcp-3bc5b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bcp-3bc5b",
  storageBucket: "bcp-3bc5b.appspot.com",
  messagingSenderId: "1029231541168",
  appId: "1:1029231541168:web:bb1e8a82ab3160230bb475",
  measurementId: "G-YTMK3TDKQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optionally add analytics if it's being used
const analytics = getAnalytics(app);
export { analytics, app };

