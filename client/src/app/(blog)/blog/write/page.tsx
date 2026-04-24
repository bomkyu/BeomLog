'use client';
import Typography from '@/app/component/Typography';
import Form from 'next/form';
import ImageUploadDropzone from '../../components/UploadDropZone';
import TiptapEditor from '../../components/Editor/TiptapEditor';
import Buttons from '@/app/component/Buttons';
import { useEffect, useState } from 'react';
import {
  getCategoriesFromApi,
  handleCreatePosts,
  uploadImageApi,
} from '@/app/lib/api';
import SelectBox from '../../components/SelectBox/SelectBox';
import Input from '../../components/Input/Input';
import { useRouter } from 'next/navigation';

const Write = () => {
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const router = useRouter();

  const handleImageUpload = async (file: File | null) => {
    if (!file) {
      setThumbnailUrl('');
      return;
    }

    try {
      setIsUploading(true);

      const { url } = await uploadImageApi(file);

      setThumbnailUrl(url);
      console.log('이미지 업로드 성공:', url);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '알 수 없는 오류 발생';
      alert(message);
    } finally {
      setIsUploading(false);
    }
  };

  // 1. 카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesFromApi();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (formData: FormData) => {
    await handleCreatePosts(formData, {
      content: content,
      thumbnail: thumbnailUrl,
    });
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
        <Form action={onSubmit}>
          <div className='flex flex-col gap-6'>
            <Input name='title' label='제목' placeholder='제목을 입력하세요' />
            <div className='flex gap-6 w-full'>
              <SelectBox
                label='카테고리'
                options={categories}
                value={selectedCategoryId}
                onChange={(id) => setSelectedCategoryId(id)}
                placeholder='카테고리를 선택하세요'
              />
              <input type='hidden' name='category' value={selectedCategoryId} />

              <Input
                name='tags'
                label='태그 (쉼표로 구분)'
                placeholder='예: 개발, 디자인, 일상'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Typography className='text-sm font-medium text-slate-700 ml-1'>
                대표 이미지 (썸네일)
              </Typography>
              <ImageUploadDropzone onFileSelect={handleImageUpload} />
              <input type='hidden' name='thumbnail' value={thumbnailUrl} />
              {isUploading && (
                <p className='text-xs text-blue-500 ml-1'>
                  이미지를 업로드 중입니다...
                </p>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Typography className='text-sm font-medium text-slate-700 ml-1'>
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
            <Buttons
              btnType='outLine'
              type='button'
              onClick={() => {
                if (
                  confirm(
                    '작성 중인 내용은 저장되지 않습니다. 취소하시겠습니까?'
                  )
                ) {
                  router.back();
                }
              }}
            >
              취소
            </Buttons>
            <Buttons btnType='primary' disabled={isUploading}>
              {isUploading ? '업로드 중...' : '저장하기'}
            </Buttons>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default Write;
