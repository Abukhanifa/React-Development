import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDc4F-Kv0GXFTm_RG20dKSB5qETdXeU_2I",
  authDomain: "react-login-8af45.firebaseapp.com",
  projectId: "react-login-8af45",
  storageBucket: "react-login-8af45.firebasestorage.app",
  messagingSenderId: "422361357908",
  appId: "1:422361357908:web:21cdf33fced71c883997c1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

