'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const inter = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
