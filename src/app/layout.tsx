import './globals.css';
import type { Metadata } from 'next';
import AppHeader from '@/components/AppHeader';
import { ThemeProvider } from '@/components/ThemeProvider';
import ClientProvider from '@/components/ClientProvider';

export const metadata: Metadata = {
  title: '폼!',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className="antialiased scroll-smooth"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientProvider>
            <AppHeader />
            {children}
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
