import { ReactNode } from 'react';
import Typography from './Typography';

type BadgeProps = {
  children: ReactNode;
  color: keyof typeof colorMap;
};

const colorMap = {
  'primary-blue':
    'bg-[rgb(var(--primary-blue)/0.1)] text-[rgb(var(--primary-blue))]',
} as const;

const Badge = ({ children, color }: BadgeProps) => {
  return (
    <div className={`self-start px-3 py-1 rounded-full ${colorMap[color]}`}>
      <Typography className='text-xs font-bold'>{children}</Typography>
    </div>
  );
};
export default Badge;
