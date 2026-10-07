import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

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
    <html lang='en'>
      <body className='bg-black min-h-screen flex flex-col text-white'>
        <Navbar planCount={0} savedCount={0} />

        <main className='flex-1'>{children}</main>
      </body>
    </html>
  );
}
