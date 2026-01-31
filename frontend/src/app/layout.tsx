import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '../components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Bond Platform - Tokenized Infrastructure Investments',
  description: 'Invest in infrastructure bonds with blockchain technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden" suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col font-sans">
            <main className="flex-1 w-full">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
