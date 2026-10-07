import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Navbar from '@/components/Navbar';
import NavbarWrapper from '@/components/NavbarWrapper';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'FitLog',
  description: 'Track your workouts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={oswald.variable}>
      <body className='bg-black min-h-screen flex flex-col text-white font-sans'>
        <NavbarWrapper />
        <main className='flex-1'>{children}</main>
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
