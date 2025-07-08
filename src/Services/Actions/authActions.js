import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);