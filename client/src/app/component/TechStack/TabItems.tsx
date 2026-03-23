import { ReactNode } from 'react';
import Typography from '../Typography';

type TabItemsProps = { text: string; children?: ReactNode };

const TabItems = ({ text, children }: TabItemsProps) => {
  return (
    <Typography className='text-base text-[var(--text-gray)] px-4 py-3'>
      {children}
      {text}
    </Typography>
  );
};
export default TabItems;
