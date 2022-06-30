// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVXJdVWNp4kzwTjBkPcwCyT5PG02x4WE0",
  authDomain: "pichangas4210.firebaseapp.com",
  databaseURL: "https://pichangas4210-default-rtdb.firebaseio.com",
  projectId: "pichangas4210",
  storageBucket: "pichangas4210.appspot.com",
  messagingSenderId: "640189955570",
  appId: "1:640189955570:web:63b3ed3592f77ca8ba7f6b"
};
const firebaseConfig2 = {// eslint-disable-line no-unused-vars
  apiKey: "AIzaSyAUeRqqgE_N_FtNDlztX3-xDM9g2rSwY_E",
  authDomain: "canchita-f9fcc.firebaseapp.com",
  projectId: "canchita-f9fcc",
  storageBucket: "canchita-f9fcc.appspot.com",
  messagingSenderId: "708208520050",
  appId: "1:708208520050:web:77f78f8e397df2ed2a0beb"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const st = getStorage(app);
export {auth, db, st};