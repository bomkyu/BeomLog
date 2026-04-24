import Typography from '@/app/component/Typography';
import { ReactNode } from 'react';

type FilterChipProps = {
  children: ReactNode;
};
const FilterChip = ({ children }: FilterChipProps) => {
  return (
    <div className='inline-block bg-primary-blue rounded-full px-5 py-2'>
      <Typography className='text-white'>{children}</Typography>
    </div>
  );
};
export default FilterChip;
