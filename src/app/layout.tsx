// Root Layout com Providers
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme_context";
import { RepositoryProvider } from "@/presentation/contexts/RepositoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Mottu Dashboard",
 description: "Dashboard de gerenciamento de operações Mottu",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="pt-BR" suppressHydrationWarning>
   <body className={inter.className}>
    <ThemeProvider>
     <RepositoryProvider>{children}</RepositoryProvider>
    </ThemeProvider>
   </body>
  </html>
 );
}
