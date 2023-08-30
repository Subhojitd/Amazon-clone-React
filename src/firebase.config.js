// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_aUKDuUxx3XK42W3UPLwv0-JJukqbWv0",
  authDomain: "clone-708e5.firebaseapp.com",
  projectId: "clone-708e5",
  storageBucket: "clone-708e5.appspot.com",
  messagingSenderId: "675025898691",
  appId: "1:675025898691:web:5deca539aa81db331f2676",
  measurementId: "G-JHXS8XSH0S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig