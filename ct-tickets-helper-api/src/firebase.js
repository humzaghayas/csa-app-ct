// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRpXljzdI2PnKSB0gI1sLO1ZFpD2oAjew",
  authDomain: "ct-csa-storage.firebaseapp.com",
  projectId: "ct-csa-storage",
  storageBucket: "ct-csa-storage.appspot.com",
  messagingSenderId: "900420077134",
  appId: "1:900420077134:web:dd757c58c2d358e6b0e51f",



//   apiKey: "AIzaSyDVi7FY5OnxVDyPaAKrUaCKCtgL0eYC5o4",
//     authDomain: "csa-project-1d161.firebaseapp.com",
//     projectId: "csa-project-1d161",
//     storageBucket: "csa-project-1d161.appspot.com",
//     messagingSenderId: "633314046834",
//     appId: "1:633314046834:web:76cf1ceedbcaad834de3eb",
//     measurementId: "G-262X3K51L9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);