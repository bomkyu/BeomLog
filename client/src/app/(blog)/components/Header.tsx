'use client';

import Typography from '@/app/component/Typography';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isDetailPage = pathname.startsWith('/blog/') && pathname !== '/blog';

  return (
    <div className=' fixed w-full h-[64px] px-4 lg:px-20 top-0 border-b-1 border-[#E2E8F0] bg-white z-50'>
      <div className='flex w-full h-full items-center gap-2'>
        {isDetailPage && (
          <button
            onClick={() => router.back()}
            className='flex items-center justify-center p-1 -ml-2 md:hidden'
            aria-label='뒤로가기'
          >
            <ChevronLeft size={28} className='text-slate-700' />
          </button>
        )}

        <Link href={'/blog'}>
          <Typography
            variant='h3'
            className='flex h-full items-center cursor-pointer'
          >
            Beom&apos;sLog
          </Typography>
        </Link>
      </div>
    </div>
  );
};
export default Header;
