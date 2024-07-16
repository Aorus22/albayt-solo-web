"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { ambilSemuaPaket } from "@/db/query";
import { convertCurrency, fetchData } from "@/utils/util";
import { Paket, Testimoni } from "@/utils/type";

interface PaketContextType {
    paket: Paket[];
    exchangeRate: number;
    testimoni: Testimoni[];
}

const PaketContext = createContext<PaketContextType>({ paket: [], exchangeRate: 1, testimoni: [] });

export const usePaketContext = () => useContext(PaketContext);

export const PaketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [paket, setPaket] = useState<Paket[]>([]);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [testimoni, setTestimoni] = useState<Testimoni[]>([]);

    useEffect(() => {
        fetchData('https://api.exchangerate-api.com/v4/latest/USD')
            .then(data => setExchangeRate(data.rates.IDR))
            .catch(error => console.error('Error fetching exchange rate:', error));
    }, []);

    useEffect(() => {
        if (exchangeRate !== 1) {
            ambilSemuaPaket()
                .then(response => {
                    const sortedPaket = response.sort((a, b) => {
                        const hargaA = convertCurrency(a.harga[0], exchangeRate);
                        const hargaB = convertCurrency(b.harga[0], exchangeRate);

                        if (hargaA !== hargaB) {
                            return hargaA - hargaB;
                        }

                        const dateA = a.jadwal.seconds * 1000;
                        const dateB = b.jadwal.seconds * 1000;

                        return dateA - dateB;
                    });
                    setPaket(sortedPaket);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [exchangeRate]);

    useEffect(() => {
        // fetchData("https://google-drive-storage.solo-albayt.workers.dev/testimoni/testimoni.json")
        fetchData("/api/testimoni")
            .then(data => setTestimoni(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <PaketContext.Provider value={{ paket, exchangeRate, testimoni }}>
            {children}
        </PaketContext.Provider>
    );
};

export default PaketContext;
