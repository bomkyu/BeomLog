'use client';

import ConTactInput from '@/app/component/InputField/ConTactInput';
import Typography from '@/app/component/Typography';
import Form from 'next/form';
import ImageUploadDropzone from '../../components/UploadDropZone';
import TiptapEditor from '../../components/Editor/TiptapEditor';
import Buttons from '@/app/component/Buttons';
import { useState } from 'react';
import handleCreatePosts from './action/createPost';

const Write = () => {
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  return (
    <div className='py-8'>
      <div className='flex flex-col gap-2 mb-6'>
        <Typography variant='h2'>새 글 작성</Typography>
        <Typography>
          독자들에게 영감을 주는 멋진 이야기를 시작해 보세요.
        </Typography>
      </div>
      <section className='p-8 rounded-xl bg-white'>
        <Form action={handleCreatePosts}>
          <div className='flex flex-col gap-6'>
            <ConTactInput
              name='title'
              label='제목'
              placeholder='제목을 입력하세요'
            />
            <div className='flex gap-6 w-full'>
              <ConTactInput
                name='category'
                label='카테고리'
                placeholder='카테고리 선택'
              />
              <ConTactInput
                name='tags'
                label='태그 (쉼표로 구분)'
                placeholder='예: 개발, 디자인, 일상'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Typography className='text-xs font-medium text-slate-700 ml-1'>
                대표 이미지 (썸네일)
              </Typography>
              <ImageUploadDropzone
              // onUploadSuccess={(url) => setThumbnailUrl(url)}
              />
              <input type='hidden' name='thumbnail' value={thumbnailUrl} />
            </div>
            <div className='flex flex-col gap-2'>
              <Typography className='text-xs font-medium text-slate-700 ml-1'>
                본문 내용
              </Typography>
              <TiptapEditor
                content={content}
                onChange={(html) => setContent(html)}
              />
              <input type='hidden' name='content' value={content} />
            </div>
          </div>
          <div className='flex justify-end gap-3 mt-6 pt-4 border-t border-[#F1F5F9]'>
            <Buttons btnType={'outLine'}>임시저장</Buttons>
            <Buttons btnType={'primary'}>저장하기</Buttons>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default Write;
