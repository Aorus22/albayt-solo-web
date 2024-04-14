'use client'
import React, { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "@/db/firebase";

interface AuthContextType {
    user: User | null;
    googleSignIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, googleSignIn: () => {}, logOut: () => {} });

export const AuthContextProvider = ({ children }: { children: ReactNode; }) => {
    const [user, setUser] = useState<User | null>(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .catch(error => console.error("Error signing in:", error));
    }

    const logOut = () => {
        signOut(auth)
            .catch(error => console.error("Error signing out:", error));
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
