import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

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
        <Navbar planCount={0} savedCount={0} />
        <main className='flex-1'>{children}</main>
      </body>
    </html>
  );
}
