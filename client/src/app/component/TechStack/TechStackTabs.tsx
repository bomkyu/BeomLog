'use client';
import { useState } from 'react';
import TabItems from './TabItems';
import TechStackCardItem from './TechStackCardItem';
import { STACK_DATA } from '@/app/data';

const TechStackTabs = () => {
  const [activeTab, setActiveTab] = useState('FrontEnd');

  const tabList = ['FrontEnd', 'BackEnd', 'DevOps', 'Tools'];

  return (
    <div className='flex w-[896px] min-h-[398px] m-auto gap-8 border border-stroke-gray bg-white box-border rounded-2xl '>
      <div className='w-[300px] p-4 bg-light-gray2 border-r border-stroke-gray '>
        <ul className='flex flex-col gap-2'>
          {tabList.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-xl transition-colors ${
                activeTab === tab
                  ? 'bg-primary-blue text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <TabItems text={tab} />
            </li>
          ))}
        </ul>
      </div>
      <div className='grid grid-cols-3 items-start w-full p-8 gap-6'>
        {STACK_DATA[activeTab].map((stack, index) => (
          <TechStackCardItem key={index} text={stack.name} />
        ))}
      </div>
    </div>
  );
};
export default TechStackTabs;
