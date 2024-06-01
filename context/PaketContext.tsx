"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { HargaProps, PackageProps } from "@/Components/Card_Paket";
import {ambilSemuaPaket} from "@/db/query";
import {TestiProps} from "@/Components/Testimoni";

interface PaketContextType {
    paket: PackageProps[] | null;
    exchangeRate: number;
    testimoni: TestiProps[] | null;
}

const PaketContext = createContext<PaketContextType>({ paket: null, exchangeRate: 1, testimoni:null });

export const usePaketContext = () => useContext(PaketContext);

export const PaketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [paket, setPaket] = useState<PackageProps[] | null >(null);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [testimoni, setTestimoni] = useState<TestiProps[] | null>(null)

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

                    if (hargaA !== hargaB) {
                        return hargaA - hargaB;
                    }

                    const dateA = a.jadwal.seconds * 1000;
                    const dateB = b.jadwal.seconds * 1000;

                    return dateA - dateB;
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://google-drive-storage.solo-albayt.workers.dev/testimoni/testimoni.json");
                const data = await response.json();
                setTestimoni(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then();
    }, []);

    return (
        <PaketContext.Provider value={{ paket, exchangeRate, testimoni }}>
            {children}
        </PaketContext.Provider>
    );
};

export default PaketContext;
