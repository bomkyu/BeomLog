import Image from 'next/image';

type ImgThumb = {
  src: string;
  alt: string;
};
const ImgThumb = ({ src, alt }: ImgThumb) => {
  return (
    <div className='relative overflow-hidden'>
      <div className='flex absolute top-0 right-0 bottom-0 left-0 items-center justify-center w-full h-full'>
        {/* <Image src={src} alt={alt} width={100} height={100} /> */}
        <img
          src='https://www.greenpeace.org/static/planet4-korea-stateless/2024/07/a213e7cd-gp02wpz_low-res-with-credit-line-800px.jpg'
          alt=''
        />
      </div>
      <div className='pt-[50%]' />
    </div>
  );
};
export default ImgThumb;
