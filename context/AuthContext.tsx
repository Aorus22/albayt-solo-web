'use client'
import React, { useContext, createContext, ReactNode } from "react";
import { useUserSession } from "@/auth/auth-hook";
import { User } from "firebase/auth";

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthContextProvider = ({ children, session }: { children: ReactNode, session: User }) => {

    const user = useUserSession();

    return (
        <AuthContext.Provider value={{ user }}>
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