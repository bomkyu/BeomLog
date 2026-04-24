'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Paging from './Paging';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type PagingLayoutProps = {
  totalPages: number;
  currentPage: number;
};

const PagingLayout = ({ totalPages, currentPage }: PagingLayoutProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. 블록 계산 (숫자 버튼 노출용)
  const PAGE_BLOCK_SIZE = 10;
  const currentBlock = Math.ceil(currentPage / PAGE_BLOCK_SIZE);
  const startPage = (currentBlock - 1) * PAGE_BLOCK_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_BLOCK_SIZE - 1, totalPages);

  const movePage = (pageNum: number) => {
    // 0 이하로 내려가거나 전체 페이지를 초과하지 않도록 방어
    if (pageNum < 1 || pageNum > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(pageNum));
    router.push(`/blog?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const navBtnStyle =
    'p-2 border border-[#E2E8F0] rounded-lg bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all';

  return (
    <div className='flex items-center justify-center gap-2 mt-16 mb-20'>
      {/* 블록의 맨 첫번째로 이동 */}
      <button
        onClick={() => movePage(startPage)}
        disabled={currentPage === 1}
        className={navBtnStyle}
      >
        <ChevronsLeft size={18} />
      </button>

      {/* [이전] 현재 페이지에서 -1 */}
      <button
        onClick={() => movePage(currentPage - 1)}
        disabled={currentPage === 1}
        className={navBtnStyle}
      >
        <ChevronLeft size={18} />
      </button>

      {/* 숫자 페이지 버튼들 */}
      <div className='flex gap-2 mx-2'>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((pageNum) => (
          <Paging
            key={pageNum}
            num={pageNum}
            isActive={Number(currentPage) === pageNum}
            onclick={() => movePage(pageNum)}
          />
        ))}
      </div>

      {/* [다음] 현재 페이지에서 +1 */}
      <button
        onClick={() => movePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={navBtnStyle}
      >
        <ChevronRight size={18} />
      </button>

      {/* [끝으로] 마지막 페이지로 이동 */}
      <button
        onClick={() => movePage(endPage)}
        disabled={currentPage === endPage}
        className={navBtnStyle}
        title='현재 블록 끝'
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  );
};

export default PagingLayout;
