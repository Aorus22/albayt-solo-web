'use client'
import React, { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from "firebase/auth";
import { auth, firestore } from "@/db/firebase";
import { useRouter } from "next/navigation";
import { addUserData } from "@/db/query";

interface AuthContextType {
    user: User | null;
    googleSignIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, googleSignIn: () => {}, logOut: () => {} });

export const AuthContextProvider = ({ children }: { children: ReactNode; }) => {
    const router = useRouter()

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
        router.push('/')
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

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};


