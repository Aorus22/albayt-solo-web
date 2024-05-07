"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { ambilSemuaPaket } from "@/context/AuthContext";
import { HargaProps, PackageProps } from "@/Components/Card_Paket";

interface PaketContextType {
    paket: PackageProps[] | null;
    exchangeRate: number;
}

const PaketContext = createContext<PaketContextType>({ paket: null, exchangeRate: 1 });

export const usePaketContext = () => useContext(PaketContext);

export const PaketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [paket, setPaket] = useState<PackageProps[] | null>(null);
    const [exchangeRate, setExchangeRate] = useState(1);
    const convertCurrency = (harga: HargaProps[]) => {
        return (
            harga[0].currency === "usd"
                ? harga[0].nominal * exchangeRate
                : harga[0].nominal
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseER = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await responseER.json();
                const newExchangeRate = data.rates.IDR;
                setExchangeRate(newExchangeRate);
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchData().then();
    }, []);

    useEffect(() => {
        const fetchDataAndSort = async () => {
            try {
                const response = await ambilSemuaPaket();
                const sortedPaket = response.sort((a, b) => {
                    const hargaA = convertCurrency(a.harga);
                    const hargaB = convertCurrency(b.harga);
                    return hargaA - hargaB;
                });
                setPaket(sortedPaket);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (exchangeRate !== 1) {
            fetchDataAndSort().then();
        }
    }, [exchangeRate]);

    return (
        <PaketContext.Provider value={{ paket, exchangeRate }}>
            {children}
        </PaketContext.Provider>
    );
};

export default PaketContext;
