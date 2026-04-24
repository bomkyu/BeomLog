import type { Metadata } from 'next';

import '../globals.css';
import Header from '../component/Header';
import Footer from '../component/Footer';

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
    <>
      <Header />
      <main className='max-w-[1280px] m-auto'>{children}</main>
      <Footer />
    </>
  );
}
