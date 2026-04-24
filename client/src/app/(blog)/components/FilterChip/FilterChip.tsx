import Typography from '@/app/component/Typography';
import { ReactNode } from 'react';

type FilterChipProps = {
  children: ReactNode;
  categoryId?: string | number;
  isActive: boolean;
  onClick: () => void;
};

const getFilterChipStyle = (isActive: boolean) =>
  isActive
    ? 'bg-primary-blue text-white border-black font-bold'
    : 'bg-white border-1 border-[#E2E8F0]';

const FilterChip = ({ children, isActive, onClick }: FilterChipProps) => {
  return (
    <button
      className={`inline-block  rounded-full px-5 py-2 transition-all ${getFilterChipStyle(
        isActive
      )}`}
      onClick={onClick}
    >
      <Typography>{children}</Typography>
    </button>
  );
};
export default FilterChip;
