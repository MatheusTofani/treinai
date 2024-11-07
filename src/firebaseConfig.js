// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgZDvixYqjpAcMo7BLgyN36HW9MevxHa8",
  authDomain: "treinai-9111a.firebaseapp.com",
  projectId: "treinai-9111a",
  storageBucket: "treinai-9111a.appspot.com",
  messagingSenderId: "691747309097",
  appId: "1:691747309097:web:72c0c60425485732a97e38",
  measurementId: "G-9H3JFWBSS5"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Exporta as instâncias do Auth e Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);
