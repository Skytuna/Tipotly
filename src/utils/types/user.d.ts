import { Timestamp } from 'firebase/firestore';

export type UserId = string;

export interface User extends UserBase {
    friends: User[];
    createdAt: Timestamp;
}

export interface UserBase {
    id: UserId;
    name: string;
    email: string;
    photoURL?: string;
}

export interface UserLoginForm {
    name: string;
    email: string;
    password: string;
}

export interface UserSignUpForm {
    name: string;
    email: string;
    password: string;
}
