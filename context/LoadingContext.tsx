'use client'
import React, {createContext, ReactNode, useContext, useState} from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode; }) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};