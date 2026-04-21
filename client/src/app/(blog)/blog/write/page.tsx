'use client';

import ConTactInput from '@/app/component/InputField/ConTactInput';
import Typography from '@/app/component/Typography';
import Form from 'next/form';
import ImageUploadDropzone from '../../components/UploadDropZone';
import TiptapEditor from '../../components/Editor/TiptapEditor';

const Write = () => {
  return (
    <div className='py-8'>
      <div className='flex flex-col gap-2 mb-6'>
        <Typography variant='h2'>새 글 작성</Typography>
        <Typography>
          독자들에게 영감을 주는 멋진 이야기를 시작해 보세요.
        </Typography>
      </div>
      <section className='p-8 rounded-xl bg-white'>
        <Form action={'/'}>
          <div className='flex flex-col gap-6'>
            <ConTactInput label='제목' placeholder='제목을 입력하세요' />
            <div className='flex gap-6 w-full'>
              <ConTactInput label='카테고리' placeholder='카테고리 선택' />
              <ConTactInput
                label='태그 (쉼표로 구분)'
                placeholder='예: 개발, 디자인, 일상'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Typography className='text-xs font-medium text-slate-700 ml-1'>
                대표 이미지 (썸네일)
              </Typography>
              <ImageUploadDropzone />
            </div>
            <div className='flex flex-col gap-2'>
              <Typography className='text-xs font-medium text-slate-700 ml-1'>
                본문 내용
              </Typography>
              <TiptapEditor
                content={'asdasd'}
                onChange={function (html: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default Write;
