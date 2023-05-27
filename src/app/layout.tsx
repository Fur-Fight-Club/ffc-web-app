'use client';
import { Poppins } from 'next/font/google';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './globals.scss';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

type RootLayoutProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={poppins.className} style={{ minHeight: '100vh' }}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
