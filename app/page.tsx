"use client"
import Hero from '@/Components/Hero'
import KonsultasiBar from '@/Components/KonsultasiBar'
import PaketAlbayt from '@/Components/PaketAlbayt'
import PreviewArtikel from '@/Components/PreviewArtikel'
import PreviewGaleri from '@/Components/PreviewGaleri'
import Testimoni from '@/Components/Testimoni'
import WhyUs from '@/Components/WhyUs'
import "./globals.css";
import {useEffect, useState} from "react";
import LoadingBar from "@/Components/LoadingBar";

const page = () => {
    const [isLoading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/paket/`);
                if (!response.ok) {
                    console.log('Failed to fetch data');
                }
                const data = await response.json();
                sessionStorage.setItem("paket", JSON.stringify(data))
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (!sessionStorage.getItem("paket")) {
            fetchData().then();
        } else {
            setLoading(false);
        }
    }, []);

  return (
    <>
        {isLoading ? (<LoadingBar />) : (
            <>
                <Hero />
                <PaketAlbayt />
                <WhyUs />
                <Testimoni />
                {/* <PreviewGaleri />
                <PreviewArtikel /> */}
                <KonsultasiBar />
            </>
        )}
    </>
  )
}

export default page