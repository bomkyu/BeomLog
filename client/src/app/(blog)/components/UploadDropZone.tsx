'use client';

import { BLOG_ICON_MAP } from '@/app/component/icons';
import Image from 'next/image';
import React, {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
  useEffect,
} from 'react';
import { X } from 'lucide-react'; // 닫기 아이콘용

interface ImageUploadProps {
  onFileSelect?: (file: File | null) => void;
  initialImage?: string;
}

const ImageUploadDropzone = ({
  onFileSelect,
  initialImage,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImage || null
  ); // 미리보기 URL 상태

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    // 미리보기 URL 생성
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileSelect?.(file);
  };

  const handleClick = () => {
    if (!previewUrl) fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) handleUpload(files[0]);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.[0]) handleUpload(files[0]);
  };

  // 이미지 삭제 핸들러
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onFileSelect?.(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className='w-full'>
      <div
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`
        relative flex flex-col items-center justify-center w-full h-[220px] 
        border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200
        ${
          isDragging
            ? 'border-primary-blue bg-blue-50 scale-[1.01]'
            : 'border-slate-300 bg-white'
        }
        ${
          !previewUrl
            ? 'cursor-pointer hover:bg-slate-50 hover:border-slate-400'
            : ''
        }
      `}
      >
        {previewUrl ? (
          /* 이미지 미리보기 모드 */
          <div className='relative w-full h-full group'>
            <img
              src={previewUrl}
              alt='Preview'
              className='w-full h-full object-cover'
            />
            {/* 삭제 버튼 오버레이 */}
            <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <button
                onClick={handleRemove}
                className='p-2 bg-white rounded-full text-slate-700 hover:bg-red-50 hover:text-red-500 transition-colors'
              >
                <X size={24} />
              </button>
            </div>
          </div>
        ) : (
          /* 기본 업로드 대기 모드 */
          <>
            <Image
              src={BLOG_ICON_MAP['cloud-icon']}
              alt='upload icon'
              priority={true}
            />
            <div className='text-center mt-2'>
              <p className='text-lg font-medium text-slate-700 mb-1'>
                클릭하여 업로드 또는 드래그 앤 드롭
              </p>
              <p className='text-sm text-slate-400 uppercase tracking-tight'>
                PNG, JPG or WEBP (권장 1200×630)
              </p>
            </div>
          </>
        )}

        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          className='hidden'
          accept='image/png, image/jpeg, image/webp'
        />
      </div>
    </div>
  );
};

export default ImageUploadDropzone;
