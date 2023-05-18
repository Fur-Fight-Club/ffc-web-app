'use client';

import { Poppins } from 'next/font/google';
import * as React from 'react';
import './globals.scss';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
