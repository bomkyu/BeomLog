'use client';

import Typography from '@/app/component/Typography';
import {
  getCategoriesFromApi,
  handleCreatePosts,
  handleUpdatePost,
  uploadImageApi,
} from '@/app/lib/api';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import SelectBox from '../SelectBox/SelectBox';
import ImageUploadDropzone from '../UploadDropZone';
import TiptapEditor from '../Editor/TiptapEditor';
import Buttons from '@/app/component/Buttons';
import { useRouter } from 'next/navigation';
import { formatTagsToString } from '@/app/lib/utils';

type IPost = {
  id: number;
  title: string;
  category: { id: number; name: string };
  tags: { id: number; name: string }[];
  content: string;
  thumbnail: string;
};
type WriteFormData = {
  id?: number;
  title: string;
  category: number;
  tags: string;
  content: string;
  thumbnail: string;
};

type PostFormProps = {
  initialData?: IPost;
};

const PostForm = ({ initialData }: PostFormProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isUploading, setIsUploading] = useState(false);

  const isEditMode = !!initialData; // modifiy인지 아닌지

  const {
    register,
    handleSubmit,
    control, // SelectBox 같은 커스텀 컴포넌트 제어용
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<WriteFormData>({
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category?.id || 0,
      tags: formatTagsToString(initialData?.tags),
      content: initialData?.content || '',
      thumbnail: initialData?.thumbnail || '',
    },
  });

  useEffect(() => {
    getCategoriesFromApi().then(setCategories);
  }, []);

  useEffect(() => {
    if (initialData) {
      const formattedTags = formatTagsToString(initialData.tags);
      const catId = initialData.category.id;

      console.log(catId);
      reset({
        ...initialData,
        tags: formattedTags,
        category: catId,
      });

      setValue('category', catId);
      setValue('content', initialData.content);
      setValue('thumbnail', initialData.thumbnail);
    }
  }, [initialData, reset, setValue, categories]);

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
      formData.append('category', String(data.category));
      formData.append('tags', data.tags);

      let isSuccess = false;

      if (isEditMode && initialData.id) {
        // PATCH 요청
        isSuccess = await handleUpdatePost(initialData.id, formData, {
          content: data.content,
          thumbnail: data.thumbnail,
        });
        if (isSuccess) alert('수정되었습니다!');
      } else {
        //  POST 요청
        isSuccess = await handleCreatePosts(formData, {
          content: data.content,
          thumbnail: data.thumbnail,
        });
        if (isSuccess) alert('등록되었습니다!');
      }

      if (isSuccess) {
        router.refresh();

        if (isEditMode) {
          router.push(`/blog/${initialData.id}`);
        } else {
          router.push('/blog');
        }
      }
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='py-8'>
      <div className='flex flex-col gap-2 mb-6'>
        <Typography variant='h2'>
          {isEditMode ? '게시글 수정' : '새 글 작성'}
        </Typography>
        <Typography>
          {isEditMode
            ? '기존 내용을 멋지게 다듬어 보세요.'
            : '독자들에게 영감을 주는 멋진 이야기를 시작해 보세요.'}
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
                name='category'
                control={control}
                rules={{
                  min: { value: 1, message: '카테고리를 골라주세요!' },
                }}
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
              {errors.category && (
                <p className='text-xs text-red-500 mt-1 ml-1'>
                  {errors.category.message}
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
              initialImage={watch('thumbnail')}
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
              {isUploading
                ? '저장 중...'
                : isEditMode
                ? '수정 완료'
                : '저장하기'}
            </Buttons>
          </div>
        </form>
      </section>
    </div>
  );
};

export default PostForm;
