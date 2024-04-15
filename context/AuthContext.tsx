'use client'
import React, { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from "firebase/auth";
import { auth, firestore } from "@/db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    googleSignIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, googleSignIn: () => {}, logOut: () => {} });

export const AuthContextProvider = ({ children }: { children: ReactNode; }) => {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await addUserData(user);

        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const logOut = () => {
        signOut(auth)
            .catch(error => console.error("Error signing out:", error));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

async function addUserData(user: User) {
    const userRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
        await setDoc(userRef, {
            name: user.displayName || "",
            email: user.email || "",
            photo: user.photoURL || ""
        });
        alert("Data added successfully!");
    } else {
        alert("User data already exists in Firestore!");
    }
}

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};
