import {initializeApp} from 'firebase/app';
import {getFirestore
} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "employeeapp-ce208.firebaseapp.com",
    projectId: "employeeapp-ce208",
    storageBucket: "employeeapp-ce208.appspot.com",
    messagingSenderId: "538619361086",
    appId: "1:538619361086:web:7b1c0bbeb6c54e7ec79e6f"
  };
  const app= initializeApp(firebaseConfig);
  export const db=getFirestore(app);
  export const storage=getStorage(app);
  