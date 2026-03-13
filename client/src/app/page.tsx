import Badge from './component/Badge';
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
        <div className='flex'>버튼 버튼</div>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </div>
  );
}
