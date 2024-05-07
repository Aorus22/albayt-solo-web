import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import React from "react";
import FacebookPixel from "@/Components/FacebookPixel";
import {PaketProvider} from "@/context/PaketContext";

export const metadata: Metadata = {
    title: "Albayt Tour & Travel Solo",
    description: "Travel, Haji, dan Umroh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <PaketProvider>
            <AuthContextProvider>
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
