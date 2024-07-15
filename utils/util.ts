import { Harga } from "./type";

const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
};

const convertCurrency = (harga: Harga, exchangeRate: number) => {
    return harga.currency === "usd"
        ? harga.nominal * exchangeRate
        : harga.nominal;
};

const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

const formateDateTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })

const formatRupiah = (nominal: number) => nominal.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})

export {fetchData, convertCurrency, formatDate, formatRupiah, formateDateTime}