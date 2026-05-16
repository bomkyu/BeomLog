'use client';

import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type ImgThumb = {
  src: string;
  alt: string;
  view?: boolean;
};

type ThumbImageProps = {
  src: string;
  alt: string;
};

const ThumbImage = ({ src, alt }: ThumbImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className='absolute inset-0 z-10 animate-pulse bg-[#E2E8F0]'>
          <div className='absolute inset-0 bg-linear-[to_right,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%]' />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        unoptimized
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </>
  );
};

const ImgThumb = ({ src, alt, view }: ImgThumb) => {
  return (
    <div className='relative overflow-hidden h-full bg-[#E2E8F0]'>
      <div className='flex absolute top-0 right-0 bottom-0 left-0 items-center justify-center w-full h-full'>
        {src ? (
          <ThumbImage key={src} src={src} alt={alt} />
        ) : (
          <div className='flex justify-center items-center text-[#94A3B8]'>
            <ImageOff />
          </div>
        )}
      </div>
      <div className={view ? 'pt-[33%]' : 'pt-[50%]'} />
    </div>
  );
};
export default ImgThumb;
