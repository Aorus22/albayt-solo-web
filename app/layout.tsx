import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import {AuthContextProvider} from "@/context/AuthContext";
import React from "react";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Project Albayt",
  description: "Travel, Haji, dan Umroh",
};

export default function RootLayout({children}: {  children: React.ReactNode;}) {
  return (
    <html lang="en">
    <Head>
        <script
            dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_PIXEL_ID'); // Ganti dengan ID Pixel Anda
              fbq('track', 'PageView');
            `,
            }}
        />
    </Head>
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
