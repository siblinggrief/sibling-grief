import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBydivAxFrvQO61NYk2yaVbqPJXD4Qyr9g",
    authDomain: "sibling-grief.firebaseapp.com",
    projectId: "sibling-grief",
    storageBucket: "sibling-grief.firebasestorage.app",
    messagingSenderId: "301259194547",
    appId: "1:301259194547:web:bb2ee39323d9735bffb0c6",
    measurementId: "G-WXFMZTT5LZ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
