import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import React from "react";
import FacebookPixel from "@/Components/FacebookPixel";

export const metadata: Metadata = {
    title: "Project Albayt",
    description: "Travel, Haji, dan Umroh",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AuthContextProvider>
            <Navbar />
            {children}
            <FacebookPixel />
            <Footer />
        </AuthContextProvider>
        </body>
        </html>
    );
}
