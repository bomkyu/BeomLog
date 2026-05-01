import Typography from '@/app/component/Typography';
import Image from 'next/image';
import NodataIcon from '@/app/images/nodata-icon.png';

const Nodata = () => {
  return (
    <div className='w-full h-[400px] '>
      <div className='flex flex-col h-full text-center justify-center items-center'>
        <div>
          <Image
            src={NodataIcon}
            alt={'데이터가 없을 때 이미지'}
            width={128}
            className='m-auto'
          />
        </div>
        <Typography variant='h2'>등록된 포스트가 없습니다</Typography>
        <Typography>
          아직 작성된 게시글이 없거나 선택한 카테고리에 해 당하는 글이 없습니다.
        </Typography>
      </div>
    </div>
  );
};
export default Nodata;
