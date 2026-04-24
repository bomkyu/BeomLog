import { ChevronDown } from 'lucide-react'; // 아이콘 라이브러리 (없으면 대처 가능)
import { useEffect, useRef, useState } from 'react';

type Option = {
  id: number;
  name: string;
};

type SelectBoxProps = {
  options: Option[];
  value: number | string;
  onChange: (id: number) => void;
  placeholder?: string;
  label?: string;
};

const SelectBox = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  label,
}: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === Number(value));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex flex-col gap-2 w-full relative' ref={containerRef}>
      {label && (
        <label className='text-sm font-medium text-slate-700 ml-1'>
          {label}
        </label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex justify-between items-center px-4 py-3 text-sm rounded-lg border bg-[#F8FAFC] cursor-pointer transition-all
          ${
            isOpen
              ? 'border-primary-blue ring-1 ring-primary-blue'
              : 'border-slate-200 hover:border-slate-300'
          }
        `}
      >
        <span className={selectedOption ? 'text-slate-900' : 'text-slate-400'}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <ul className='absolute top-[74px] left-0 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto py-1 top-[110%]'>
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className='px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-slate-700 hover:text-primary-blue'
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className='px-4 py-2 text-sm text-slate-400'>
              카테고리가 없습니다.
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
