import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import './globals.css';
import NavbarWrapper from '@/components/NavbarWrapper';
import Footer from '@/components/Footer';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'FitLog',
  description: 'Track your workouts',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={oswald.variable}>
      <body className='bg-black min-h-screen flex flex-col text-white font-sans overflow-x-hidden'>
        {' '}
        <Suspense
          fallback={
            <div className='h-18 bg-[#0a0a0a] border-b border-gray-800' />
          }
        >
          <NavbarWrapper />
        </Suspense>
        <main className='flex-1'>{children}</main>
        <Footer />
        <Toaster
          position='bottom-right'
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #333',
            },
          }}
        />
      </body>
    </html>
  );
}
