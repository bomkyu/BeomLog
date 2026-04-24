import { ImageOff } from 'lucide-react';
import Image from 'next/image';

type ImgThumb = {
  src: string;
  alt: string;
};
const ImgThumb = ({ src, alt }: ImgThumb) => {
  return (
    <div className='relative overflow-hidden'>
      <div className='flex absolute top-0 right-0 bottom-0 left-0 items-center justify-center w-full h-full'>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className='object-cover'
            unoptimized
          />
        ) : (
          <div className='flex justify-center items-center'>
            <ImageOff />
          </div>
        )}
      </div>
      <div className='pt-[50%]' />
    </div>
  );
};
export default ImgThumb;
