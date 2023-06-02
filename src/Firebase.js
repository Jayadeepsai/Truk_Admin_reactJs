// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlaP2a2vEzz1y5B50fKlUSkdXRZw4Zkg0",
  authDomain: "trukadmin.firebaseapp.com",
  projectId: "trukadmin",
  storageBucket: "trukadmin.appspot.com",
  messagingSenderId: "898257562848",
  appId: "1:898257562848:web:a7a954cbf312abf5a1b485",
  measurementId: "G-W7ZV714L92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);