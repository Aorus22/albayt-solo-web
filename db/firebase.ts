// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCYss2axObVapB6o795nn8q-vGTY7Vvyp0",
//     authDomain: "albayt-solo-web-50c59.firebaseapp.com",
//     projectId: "albayt-solo-web-50c59",
//     storageBucket: "albayt-solo-web-50c59.appspot.com",
//     messagingSenderId: "339015657905",
//     appId: "1:339015657905:web:38d9e529dfdf063a34f590",
//     measurementId: "G-E2JCN5SB73"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDb3sRiJRrkHRcLmJbKM14eie7HESEfmHY",
    authDomain: "albayt-backup-test.firebaseapp.com",
    projectId: "albayt-backup-test",
    storageBucket: "albayt-backup-test.appspot.com",
    messagingSenderId: "915555809111",
    appId: "1:915555809111:web:964f35365aaf24637b3012",
    measurementId: "G-J8XBZ45C98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const firestore = getFirestore(app);

export { firestore };
