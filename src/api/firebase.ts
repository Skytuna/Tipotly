import { firebaseConfig } from '@config/firebase';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app);
export const auth = getAuth();
