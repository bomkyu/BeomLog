import Link from 'next/link';
import Typography from '../Typography';
import Badge from '../Badge';
import { StaticImageData } from 'next/image';
import ImgThumb from '@/app/(blog)/components/ImgThumb';

type PortfolioCardProps = {
  title: string;
  category: string;
  description: string;
  src: string;
  img: string | StaticImageData;
};
const PortfolioCard = ({
  title,
  description,
  category,
  src,
  img,
}: PortfolioCardProps) => {
  return (
    <div className='max-w-[534px] w-full border border-stroke-gray bg-white rounded-2xl overflow-hidden'>
      <Link href={src}>
        <div className='relative'>
          <ImgThumb
            src={`${process.env.NEXT_PUBLIC_RESOURCE_URL}${img}`}
            alt={`썸네일 이미지`}
          />
        </div>
        <div className='p-6'>
          <div className='mb-4 self-start'>
            <Badge color='primary-blue'>{category}</Badge>
          </div>
          <div className='flex flex-col gap-4'>
            <Typography variant='h3'>{title}</Typography>
            <Typography>{description}</Typography>
            <div className='flex gap-2'>
              <Typography as='span'>상세보기</Typography>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PortfolioCard;
