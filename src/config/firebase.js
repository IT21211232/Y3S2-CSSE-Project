import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAzw3cWjAlu2ArWZlU6zNwYepKjYXT31jc",
    authDomain: "csse-assignment2.firebaseapp.com",
    projectId: "csse-assignment2",
    storageBucket: "csse-assignment2.appspot.com",
    messagingSenderId: "54569636602",
    appId: "1:54569636602:web:b436954b1870fde729ef43",
    measurementId: "G-HBC9QL6SGM"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore();