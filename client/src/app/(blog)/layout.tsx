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
    <div className='blog-container'>
      <main>{children}</main>
    </div>
  );
}
