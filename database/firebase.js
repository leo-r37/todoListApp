import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAZneJnk-fcbedBoNe4oNIw668WY8Pnqy8",
  authDomain: "todolist-app-985fd.firebaseapp.com",
  projectId: "todolist-app-985fd",
  storageBucket: "todolist-app-985fd.appspot.com",
  messagingSenderId: "1079273160004",
  appId: "1:1079273160004:web:ea8e77253fc8ef0802eb11"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;