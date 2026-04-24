import { ReactNode } from 'react';
import Typography from './Typography';

type BadgeProps = {
  children: ReactNode;
  color: keyof typeof colorMap;
};

const colorMap = {
  'primary-blue': 'bg-primary-blue/10 text-primary-blue',
  blog: 'bg-primary-blue text-white',
  tag: 'bg-[#F1F5F9] font-medium',
} as const;

const Badge = ({ children, color }: BadgeProps) => {
  return (
    <div
      className={`inline-block self-start px-3 py-1 rounded-full ${colorMap[color]}`}
    >
      <Typography className='text-xs font-bold'>{children}</Typography>
    </div>
  );
};
export default Badge;
