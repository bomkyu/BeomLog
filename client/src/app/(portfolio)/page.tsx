import Link from 'next/link';
import Badge from '../component/Badge';
import Buttons from '../component/Buttons';
import AboutCard from '../component/Card/AboutCard';
import TechStackTabs from '../component/TechStack/TechStackTabs';
import Typography from '../component/Typography';
import PortfolioCard from '../component/Card/PortfolioCard';
import ConTactInput from '../component/InputField/ConTactInput';
import Image from 'next/image';
import { MAIN_ICON_MAP } from '../component/icons';
import dummyImg from '@/app/images/dummy-img.png';

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
            <span className='text-primary-blue'>서범규</span>
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
          <Link href={'/blog'}>
            <Buttons btnType='primary'>
              프로젝트 보기
              <Image
                src={MAIN_ICON_MAP['white-arrow-icon']}
                alt='프로젝트보기 버튼 아이콘'
                className='ml-2'
              />
            </Buttons>
          </Link>
          <Buttons btnType='outLine'>연락하기</Buttons>
        </div>
      </section>
      <section id='introduce' className='py-20'>
        <div className='flex gap-12'>
          <div className='flex w-[360px] h-9 gap-2 items-center'>
            <div className='w-8 h-1 bg-primary-blue rounded-2xl' />
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
                icon='introduce-icon'
                title='성능최적화'
                description='빠른 로딩 속도와 부드러운 사용자 경험을 최우선으로 고려합니다.'
              />
              <AboutCard
                icon='introduce2-icon'
                title='협업 중심'
                description='기획자, 디자이너와 긴밀히 소통하며 비즈니스 목표를 달성합니다.'
              />
            </div>
          </div>
        </div>
      </section>
      <section id='stack' className='py-20'>
        <div className='flex flex-col gap-12'>
          <Typography variant='h2' className='text-center'>
            기술스택
          </Typography>

          <TechStackTabs />
        </div>
      </section>

      <section id='project' className='py-20'>
        <div className='flex justify-between '>
          <div className='flex flex-col gap-2'>
            <Typography variant='h2'>진행한 프로젝트</Typography>
            <Typography variant='caption'>
              최근에 작업한 주요 프로젝트들입니다.
            </Typography>
          </div>
          <div className='flex items-end'>
            <Link href='/' className='text-primary-blue'>
              전체 보기
            </Link>
          </div>
        </div>
        <div className='mt-12'>
          <PortfolioCard
            img={dummyImg}
            title={'차세대 커머스 대시보드'}
            tag={'React'}
            description={
              '실시간 주문 트래킹과 데이터 시각화를 제공하는 B2B 관리자 대시보드를 구축했습니다. 전반적인 성능을 40% 개선했습니다.'
            }
            src={'/'}
          />
        </div>
      </section>
      <section id='phone' className='py-20'>
        <div className='flex gap-12 p-16 justify-between bg-primary-blue/5 rounded-3xl '>
          <div className='flex flex-col gap-6'>
            <Typography className='text-4xl'>
              함께 일하고 싶으신가요?
            </Typography>
            <Typography className='text-base'>
              새로운 도전을 환영합니다. 프로젝트 제안이나 궁금한 점이 있다면
              <br />
              언제든 편하게 연락 주세요!
            </Typography>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4 items-center'>
                <div className='flex w-10 h-10 justify-center items-center rounded-full bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]'>
                  <Image
                    src={MAIN_ICON_MAP['mail-icon']}
                    alt={`메일 icon`}
                    priority={true}
                  />
                </div>
                <Typography>a01090762806@gmail.com</Typography>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='flex w-10 h-10 justify-center items-center rounded-full bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]'>
                  <Image
                    src={MAIN_ICON_MAP['location-icon']}
                    alt={`메일 icon`}
                    priority={true}
                  />
                </div>
                <Typography>인천광역시 서구</Typography>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[325px] p-8 gap-4 rounded-2xl border border-stroke-gray bg-white shadow-[0_10px_15px_-1px_rgba(0,0,0,0.1)]'>
            <ConTactInput label='성함' placeholder='홍길동' />
            <ConTactInput label='이메일' placeholder='example@co.kr' />
            <Buttons btnType='primary'>보내기</Buttons>
          </div>
        </div>
      </section>
    </div>
  );
}
