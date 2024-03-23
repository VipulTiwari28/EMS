// Import the functions you need from the SDKs you need
import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
@Injectable({
    providedIn: 'root'
})

const firebaseConfig = {
  apiKey: "AIzaSyCwb8G537H4LOTXwCNcpBtAf--vZoFJDB8",
  authDomain: "angular-miniproject.firebaseapp.com",
  databaseURL: "https://angular-miniproject-default-rtdb.firebaseio.com",
  projectId: "angular-miniproject",
  storageBucket: "angular-miniproject.appspot.com",
  messagingSenderId: "634686676559",
  appId: "1:634686676559:web:95bc1e120d0cb58f32143a",
  measurementId: "G-16DJ0N8XMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

