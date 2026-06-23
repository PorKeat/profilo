import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreProvider } from "@/store/Provider";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profilo — GitHub Profile README Builder",
  description: "Drag-and-drop beautiful blocks, see live previews, and export pure Markdown. Build your GitHub README in minutes, not hours. Free, open-source, no login required.",
  keywords: ['github profile', 'readme builder', 'github readme', 'developer profile', 'markdown generator', 'github stats', 'open source'],
  authors: [{ name: 'AlexKGM (Seng Porkeat)' }],
  themeColor: '#4B86F7',
  openGraph: {
    title: 'Profilo — GitHub Profile README Builder',
    description: 'Drag-and-drop beautiful blocks, see live previews, and export pure Markdown. Build your GitHub README in minutes, not hours.',
    url: 'https://profilo.vercel.app',
    siteName: 'Profilo',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profilo — GitHub Profile README Builder',
    description: 'Build a stunning GitHub profile README in minutes — no code, no backend, no cost.',
    creator: '@alexkgm',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <NextTopLoader color="#4B86F7" showSpinner={false} height={2} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <StoreProvider>{children}</StoreProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: 'bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl rounded-xl',
                title: 'text-foreground font-bold text-sm',
                description: 'text-foreground/60 text-xs',
                success: 'border-primary/30',
                error: 'border-red-500/30',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
