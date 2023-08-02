import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAhNzyGyuOil9w4kMbM83trNIBvN2FZkpk",
  authDomain: "crud-17e22.firebaseapp.com",
  projectId: "crud-17e22",
  storageBucket: "crud-17e22.appspot.com",
  messagingSenderId: "642754418884",
  appId: "1:642754418884:web:6834e181ba700e433fd191"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db