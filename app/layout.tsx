import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import React from "react";
import FacebookPixel from "@/Components/FacebookPixel";
import {PaketProvider} from "@/context/PaketContext";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: "Albayt Tour & Travel Solo",
    description: "Travel, Haji, dan Umroh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    
    const session = cookies().get('user_session')?.value || null;
    const user = session ? JSON.parse(session) : null;

    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        </head>
        <body>
            <PaketProvider>
                <AuthContextProvider session={user}>
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