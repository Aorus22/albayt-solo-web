import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Providers from "@/Components/Providers";

const roboto = Roboto({ weight: ['100', '300', '400', '700'], subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Project Albayt",
  description: "Travel, Haji, dan Umroh",
};

export default function RootLayout({children}: {  children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
            {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
