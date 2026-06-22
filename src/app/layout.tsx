import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/store/Provider";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profilo - GitHub Profile README Builder",
  description: "Craft beautiful GitHub profile READMEs without login, backend, or paid APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <NextTopLoader color="#ff003c" showSpinner={false} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
