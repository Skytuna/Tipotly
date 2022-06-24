import { auth, db } from '@api/firebase';
import { User, UserLoginForm, UserSignUpForm } from '@utils/types/user';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {
    doc,
    DocumentReference,
    getDoc,
    serverTimestamp,
    setDoc,
    Timestamp,
} from 'firebase/firestore';
import { StateCreator } from 'zustand';

export interface UserSlice {
    user?: User;
    setUser: (user: User) => void;
    login: (form: UserLoginForm) => Promise<void>;
    logout: () => Promise<void>;
    signUp: (form: UserSignUpForm) => Promise<void>;
}

export const createUserSlice: StateCreator<
    UserSlice,
    [['zustand/devtools', never]],
    [],
    UserSlice
> = (set, get) => ({
    user: undefined,
    setUser: (user: User) => set({ user }),
    signUp: async ({ email, password, name }: UserSignUpForm) => {
        try {
            // Create a new user in firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user: User = {
                id: userCredential.user.uid,
                name,
                photoURL: '',
                email: userCredential.user.email!,
                createdAt: serverTimestamp() as Timestamp,
                friends: [],
            };

            // Store the new user in a collection of users
            const usersRef = doc(db, `users/${user.id}`);
            await setDoc(usersRef, user);

            // Store the user in local storage
            localStorage.setItem('user', JSON.stringify(user));

            // Set the user in global state
            set({ user });
        } catch (e: any) {
            alert(e.message);
        }
    },
    login: async ({ email, password }: UserLoginForm) => {
        try {
            // Log the user in firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const userRef = doc(db, `users/${userCredential.user.uid}`) as DocumentReference<User>;
            const user = await getDoc(userRef);

            // Store the user in local storage
            localStorage.setItem('user', JSON.stringify(user.data()));

            // Set the user in global state
            set({ user: user.data() });
        } catch (e: any) {
            alert(e.message);
        }
    },
    logout: async () => {
        try {
            // Sign out the user from firebase
            await signOut(auth);
            localStorage.removeItem('user');
        } catch (e: any) {
            alert(e.message);
        }
        set({ user: undefined });
    },
});
