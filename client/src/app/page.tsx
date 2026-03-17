import Badge from './component/Badge';
import Buttons from './component/Buttons';
import AboutCard from './component/Card/AboutCard';
import Typography from './component/Typography';

export default function Home() {
  return (
    <div className='px-6'>
      <section className='flex py-24 gap-8 flex-col'>
        <div className='flex flex-col gap-4'>
          <Badge color='primary-blue'>Frontend Developer</Badge>
          <Typography as='h1' variant='h1' className='leading-snug'>
            안녕하세요,
            <br />
            창의적인 솔루션을 만드는
            <br />
            <span className='text-[rgb(var(--primary-blue))]'>서범규</span>
            입니다
          </Typography>
          <Typography variant='caption'>
            사용자 중심의 가치를 더하는 프론트엔드 개발자로서 더 나은 웹
            생태계를 구축합니다.
            <br />
            복잡한 문제를 단순하고 아름다운 코드로 해결하는것을 즐깁니다.
          </Typography>
        </div>
        <div className='flex gap-4'>
          <Buttons btnType='primary'>프로젝트 보기</Buttons>
          <Buttons btnType='outLine'>연락하기</Buttons>
        </div>
      </section>
      <section className='py-20'>
        <div className='flex gap-12'>
          <div className='flex w-[360px] h-9 gap-2 items-center'>
            <div className='w-8 h-1 bg-[rgb(var(--primary-blue))] rounded-2xl' />
            <Typography variant='h2'>소개</Typography>
          </div>
          <div className='w-full flex flex-col gap-6'>
            <div>
              <Typography>
                기술을 통해 일상의 불편함을 해결하는 과정에 매력을 느낍니다.
                <br />
                클린코드와 성능 최적화에 깊은 관심을 가지고 있으며, 동료들과의
                <br />
                원활한 소통을 중요하게 생각합니다.
              </Typography>
            </div>
            <div className='flex gap-6'>
              <AboutCard
                title='성능최적화'
                description='빠른 로딩 속도와 부드러운 사용자 경험을 최우선으로 고려합니다.'
              />
              <AboutCard
                title='협업 중심'
                description='기획자, 디자이너와 긴밀히 소통하며 비즈니스 목표를 달성합니다.'
              />
            </div>
          </div>
        </div>
      </section>
      <section className='py-20'>
        <div className='flex flex-col gap-12'>
          <Typography variant='h2' className='text-center'>
            기술스택
          </Typography>
          <div className=''></div>
        </div>
      </section>

      <section></section>
    </div>
  );
}
