import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import React from "react";
import FacebookPixel from "@/Components/FacebookPixel";
import {PaketProvider} from "@/context/PaketContext";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
    title: "Albayt Tour & Travel Solo",
    description: "Travel, Haji, dan Umroh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        </head>
        <body>
            <NextTopLoader
                color={"#f14310"}
                template={`<div class="bar" role="bar">
                    <div class="peg"></div>
                </div> `
            }
            />
            <PaketProvider>
                <AuthContextProvider >
                    <Navbar />
                    {children}
                    <FacebookPixel />
                    <Footer />
                </AuthContextProvider>
            </PaketProvider>
        </body>
        </html>
    );
}