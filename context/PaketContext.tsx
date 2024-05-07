'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { ambilSemuaPaket } from "@/context/AuthContext";
import { PackageProps } from "@/Components/Card_Paket";
import LoadingBar from "@/Components/LoadingBar";

interface PaketContextType {
    paket: PackageProps[] | null;
}

const PaketContext = createContext<PaketContextType>({ paket: null });

export const usePaketContext = () => useContext(PaketContext);

export const PaketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [paket, setPaket] = useState<PackageProps[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ambilSemuaPaket();
                setPaket(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then();
    }, []);

    return (
        <PaketContext.Provider value={{ paket }}>
            {children}
        </PaketContext.Provider>
    );
};

export default PaketContext;
