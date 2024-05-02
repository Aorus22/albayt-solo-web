import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import {AuthContextProvider} from "@/context/AuthContext";
import React from "react";

export const metadata: Metadata = {
  title: "Project Albayt",
  description: "Travel, Haji, dan Umroh",
};

export default function RootLayout({children}: {  children: React.ReactNode;}) {
  return (
    <html lang="en">
    <head>
        {/*<script*/}
        {/*    id = "meta-pixel"*/}
        {/*    dangerouslySetInnerHTML={*/}
        {/*        __html: ``*/}
        {/*    }*/}
        {/*/>*/}
    </head>
    <body>
    <AuthContextProvider>
        <Navbar/>
        {children}
        <Footer/>
    </AuthContextProvider>
    </body>
    </html>
  );
}
