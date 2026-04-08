import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '../component/Header';
import Footer from '../component/Footer';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `Beom's portfolio`,
  description: '포트폴리오페이지 입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} bg-background`}>
        <Header />
        <div className='max-w-[1280px] m-auto'>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
