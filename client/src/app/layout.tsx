import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from './component/AuthProvider';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '서범규(Seo Beom-gyu) | Full-stack Developer Portfolio',
  description:
    'React, Next.js, NestJS 기반의 풀스택 개발자 서범규의 포트폴리오입니다. BeomLog 개발 및 다양한 웹 프로젝트 경험을 확인해보세요.',
  keywords: [
    '서범규',
    '개발자 포트폴리오',
    'Full-stack Developer',
    'Next.js 포트폴리오',
    'BeomLog',
  ],
  openGraph: {
    title: '서범규 | Portfolio',
    description:
      '성장하는 풀스택 개발자 서범규의 프로젝트와 기술 스택을 소개합니다.',
    url: 'https://beomlog.dev',
    siteName: 'BeomLog',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} bg-background`}>
        <AuthProvider>
          <div>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
