import { BLOG_ICON_MAP } from '@/app/component/icons';
import Image from 'next/image';
import React, { ChangeEvent, DragEvent, useRef, useState } from 'react';
interface ImageUploadProps {
  onFileSelect?: (file: File) => void;
}

const ImageUploadDropzone = ({ onFileSelect }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 클릭 시 파일 선택창 열기
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 완료 시
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect?.(files[0]);
    }
  };

  // 드래그 앤 드롭 핸들러
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileSelect?.(files[0]);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`
        relative flex flex-col items-center justify-center w-full h-[220px] 
        px-6 py-10 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200
        ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400'
        }
      `}
    >
      <Image
        src={BLOG_ICON_MAP['cloud-icon']}
        alt={`메일 icon`}
        priority={true}
      />

      {/* 텍스트 영역 */}
      <div className='text-center'>
        <p className='text-lg font-medium text-slate-700 mb-1'>
          클릭하여 업로드 또는 드래그 앤 드롭
        </p>
        <p className='text-sm text-slate-400 uppercase tracking-tight'>
          PNG, JPG or WEBP (권장 1200×630)
        </p>
      </div>

      {/* 숨겨진 Input */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        className='hidden'
        accept='image/png, image/jpeg, image/webp'
      />
    </div>
  );
};

export default ImageUploadDropzone;
