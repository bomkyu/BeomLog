'use client';
import Buttons from '@/app/component/Buttons';
import Typography from '@/app/component/Typography';
import { deletePostApi } from '@/app/lib/api';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

type DeleteBtnLayoutProps = {
  id: number;
};

const DeleteBtnLayout = ({ id }: DeleteBtnLayoutProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;

    try {
      setIsDeleting(true);

      await deletePostApi(id);

      alert('게시글이 성공적으로 삭제되었습니다!');

      router.push('/blog');
      router.refresh(); // 서버 컴포넌트 데이터를 최신화해주는 함수
    } catch (error) {
      console.error(error);
      alert('삭제 중 오류가 발생했습니다. 다시 시도해주세요!');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Buttons
      btnType='postAction'
      className='bg-[#FEF2F2]'
      onClick={() => handleDelete(id)}
      disabled={isDeleting}
    >
      <Trash2 size={14} color='#DC2626'></Trash2>
      <Typography className='text-sm text-[#DC2626]'>
        {isDeleting ? '삭제 중...' : '삭제'}
      </Typography>
    </Buttons>
  );
};
export default DeleteBtnLayout;
