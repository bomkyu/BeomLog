'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getCategoriesFromApi,
  handleCreatePosts,
  uploadImageApi,
} from '@/app/lib/api';

import Typography from '@/app/component/Typography';
import Buttons from '@/app/component/Buttons';
import SelectBox from '../../components/SelectBox/SelectBox';
import Input from '../../components/Input/Input';
import ImageUploadDropzone from '../../components/UploadDropZone';
import TiptapEditor from '../../components/Editor/TiptapEditor';

type WriteFormData = {
  title: string;
  categoryId: number;
  tags: string;
  content: string;
  thumbnail: string;
};

const Write = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control, // SelectBox 같은 커스텀 컴포넌트 제어용
    setValue,
    watch,
    formState: { errors },
  } = useForm<WriteFormData>({
    defaultValues: {
      title: '',
      categoryId: 0,
      tags: '',
      content: '',
      thumbnail: '',
    },
  });

  useEffect(() => {
    getCategoriesFromApi().then(setCategories);
  }, []);

  // 저장 로직 (RHF의 handleSubmit을 통과해야 실행됨)
  const onValid = async (data: WriteFormData) => {
    // 1. 폼 데이터 외의 필수값 최종 체크
    if (!data.content || data.content === '<p></p>') {
      alert('내용을 입력해야 포스팅이 완성됩니다!');
      return;
    }
    if (!data.thumbnail) {
      alert('썸네일 이미지를 올려주세요!');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', String(data.categoryId));
      formData.append('tags', data.tags);

      // 이미 서버에 올라간 URL(data.thumbnail)과 본문(data.content)을 그대로 사용.
      const isSuccess = await handleCreatePosts(formData, {
        content: data.content,
        thumbnail: data.thumbnail,
      });

      if (isSuccess) router.push('/blog');
    } catch (error) {
      alert('저장 중 오류 발생!');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='py-8'>
      <div className='flex flex-col gap-2 mb-6'>
        <Typography variant='h2'>새 글 작성</Typography>
        <Typography>
          독자들에게 영감을 주는 멋진 이야기를 시작해 보세요.
        </Typography>
      </div>

      <section className='p-8 rounded-xl bg-white'>
        <form onSubmit={handleSubmit(onValid)} className='flex flex-col gap-6'>
          <Input
            label='제목'
            placeholder='제목을 입력하세요'
            {...register('title', { required: '제목은 필수입니다!' })}
            error={errors.title?.message}
          />

          <div className='flex gap-6 w-full'>
            <div className='w-full'>
              <Controller
                name='categoryId'
                control={control}
                rules={{ min: { value: 1, message: '카테고리를 골라주세요!' } }}
                render={({ field }) => (
                  <SelectBox
                    label='카테고리'
                    options={categories}
                    value={field.value}
                    onChange={(id) => field.onChange(id)}
                    placeholder='카테고리를 선택하세요'
                  />
                )}
              />
              {errors.categoryId && (
                <p className='text-xs text-red-500 mt-1 ml-1'>
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <Input
              className='w-full'
              label='태그 (쉼표로 구분)'
              placeholder='예: 개발, 디자인, 일상'
              {...register('tags', { required: '해시태그를 넣어주세요!' })}
              error={errors.tags?.message}
            />
          </div>

          {/* 썸네일 업로드 */}
          <div className='flex flex-col gap-2'>
            <Typography className='text-sm font-medium text-slate-700 ml-1'>
              대표 이미지 (썸네일)
            </Typography>
            <ImageUploadDropzone
              onFileSelect={async (file) => {
                if (file) {
                  const { url } = await uploadImageApi(file);
                  setValue('thumbnail', url, { shouldValidate: true });
                }
              }}
            />
            {errors.thumbnail && (
              <p className='text-xs text-red-500 ml-1'>이미지는 필수입니다!</p>
            )}
          </div>

          {/* 에디터 */}
          <div className='flex flex-col gap-2'>
            <Typography className='text-sm font-medium text-slate-700 ml-1'>
              본문 내용
            </Typography>
            <TiptapEditor
              content={watch('content')}
              onChange={(html) =>
                setValue('content', html, { shouldValidate: true })
              }
            />
            {errors.content && (
              <p className='text-xs text-red-500 ml-1'>내용을 입력해주세요!</p>
            )}
          </div>

          <div className='flex justify-end gap-3 mt-6 pt-4 border-t border-[#F1F5F9]'>
            <Buttons
              btnType='outLine'
              type='button'
              onClick={() => router.back()}
            >
              취소
            </Buttons>
            <Buttons btnType='primary' disabled={isUploading} type='submit'>
              {isUploading ? '저장 중...' : '저장하기'}
            </Buttons>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Write;
