import TabItems from './TabItems';
import TechStackCardItem from './TechStackCardItem';

const TechStackTabs = () => {
  return (
    <div className='flex w-[896px] min-h-[398px] m-auto gap-8 border border-stroke-gray bg-white box-border rounded-2xl '>
      <div className='w-[300px] p-4 bg-light-gray2 border-r border-stroke-gray '>
        <ul className='flex flex-col gap-2'>
          <li className='bg-primary-blue rounded-xl text-white'>
            <TabItems text='FrontEnd' />
          </li>
          <li>
            <TabItems text='BackEnd' />
          </li>
          <li>
            <TabItems text='DevOps' />
          </li>
          <li>
            <TabItems text='Tools' />
          </li>
        </ul>
      </div>
      <div className='grid grid-cols-3 items-start w-full p-8 gap-6'>
        <TechStackCardItem text='React'></TechStackCardItem>
        <TechStackCardItem text='React'></TechStackCardItem>
        <TechStackCardItem text='React'></TechStackCardItem>
        <TechStackCardItem text='React'></TechStackCardItem>
        <TechStackCardItem text='React'></TechStackCardItem>
        <TechStackCardItem text='React'></TechStackCardItem>
      </div>
    </div>
  );
};
export default TechStackTabs;
