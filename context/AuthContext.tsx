'use client'
import React, { useContext, createContext, ReactNode, useState } from "react";
import { useUserSession } from "@/auth/auth-hook";
import { User } from "firebase/auth";
import LoadingSpinner from "@/Components/LoadingSpinner";

interface AuthContextType {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const { user, isLoading } = useUserSession();

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading && <LoadingSpinner overlay/>}
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