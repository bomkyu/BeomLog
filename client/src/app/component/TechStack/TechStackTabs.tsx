'use client';
import { useState } from 'react';
import TabItems from './TabItems';
import TechStackCardItem from './TechStackCardItem';
import { STACK_DATA } from '@/app/data';

const TechStackTabs = () => {
  const [activeTab, setActiveTab] = useState('FrontEnd');

  const tabList = ['FrontEnd', 'BackEnd', 'DevOps', 'Tools'];

  return (
    /* 1. 모바일: flex-col(위아래), PC: lg:flex-row(좌우) */
    <div className="flex flex-col lg:flex-row max-w-[896px] w-full min-h-[398px] m-auto border border-stroke-gray bg-white box-border rounded-2xl overflow-hidden">
      {/* 2. 탭 영역: 모바일(상단 가로), PC(좌측 세로 고정) */}
      <div className="w-full lg:w-[300px] p-4 bg-light-gray2 border-b lg:border-b-0 lg:border-r border-stroke-gray">
        <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible no-scrollbar">
          {tabList.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-xl transition-colors shrink-0 ${
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

      {/* 3. 그리드 영역: 모바일(2열), PC(3열) */}
      <div className="grid grid-cols-2 md:grid-cols-3 items-start w-full p-8 gap-6">
        {STACK_DATA[activeTab].map((stack, index) => (
          <TechStackCardItem
            key={index}
            text={stack.name}
            iconName={stack.icon}
          />
        ))}
      </div>
    </div>
  );
};
export default TechStackTabs;
