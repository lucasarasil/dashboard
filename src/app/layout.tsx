import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

const inter = Inter({
 variable: "--font-inter",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Kickoff Núcleo de Comando",
 description: "MVP - Kickoff Núcleo de Comando",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="pt-BR" className="dark">
   <body
    className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-dark-primary text-text-primary`}
   >
    {children}
   </body>
  </html>
 );
}
