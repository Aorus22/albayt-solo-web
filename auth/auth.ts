import { auth } from "@/db/firebase";
import { addUserData } from "@/db/query";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged as _onAuthStateChanged, User } from "firebase/auth";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
    return _onAuthStateChanged(auth, callback);
  }

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await addUserData(user);
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
}

export async function signOutWithGoogle() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out with Google', error);
    }
}