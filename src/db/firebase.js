import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDL713qsmqaTy5r7_TUnroz2dH6wDl607Q",
  authDomain: "zichron-olam.firebaseapp.com",
  projectId: "zichron-olam",
  storageBucket: "zichron-olam.appspot.com",
  messagingSenderId: "612011507409",
  appId: "1:612011507409:web:92692d65cb62909fa50ff0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const addToFireStore = async (niftar) => {
  try {
    const docRef = await addDoc(collection(db, "בתי כנסת",'רש"י', "נפטרים"), niftar);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getDocsFromFirestore = async () => {
  const querySnapshot = await getDocs(collection(db, "בתי כנסת",'רש"י', "נפטרים"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};
