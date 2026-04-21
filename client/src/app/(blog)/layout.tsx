import Footer from './components/Footer';
import Header from './components/Header';

export const metadata = {
  title: 'BeomLog',
  description: '범의 기술 블로그',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='blog-container pt-[63px]'>
      <Header />
      <main className='max-w-[1240px] w-full m-auto'>{children}</main>
      <Footer />
    </div>
  );
}
