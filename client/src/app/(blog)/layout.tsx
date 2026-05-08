import Footer from './components/Footer';
import Header from './components/Header';

export const metadata = {
  title: 'BeomLog | 기술 블로그',
  description: '프로젝트 삽질기와 최신 기술 학습 기록을 담은 BeomLog입니다.',
  keywords: [
    'BeomLog',
    '기술 블로그',
    '서범규',
    'Next.js',
    'React',
    '개발 블로그',
  ],

  // SNS 공유 시 보이는 정보
  openGraph: {
    title: 'BeomLog | 기술 블로그',
    description: '개발 중 겪은 문제와 해결 과정을 기록합니다.',
    type: 'website',
    url: 'https://beomlog.dev/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='blog-container pt-[63px]'>
      <Header />
      <div className='px-5'>
        <main className='max-w-[1240px] w-full  m-auto'>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
