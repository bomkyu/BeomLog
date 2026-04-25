'use client';
import Buttons from '@/app/component/Buttons';
import Typography from '@/app/component/Typography';
import { Trash2 } from 'lucide-react';

type DeleteBtnLayoutProps = {
  id: number;
};

const handleDelete = async (id: number) => {
  if (confirm(`정말 삭제할까요?`)) {
  }
};
const DeleteBtnLayout = ({ id }: DeleteBtnLayoutProps) => {
  return (
    <Buttons
      btnType='postAction'
      className='bg-[#FEF2F2]'
      onClick={() => handleDelete(id)}
    >
      <Trash2 size={14} color='#DC2626'></Trash2>
      <Typography className='text-sm text-[#DC2626]'>삭제</Typography>
    </Buttons>
  );
};
export default DeleteBtnLayout;
