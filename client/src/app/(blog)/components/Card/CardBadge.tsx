import Typography from '@/app/component/Typography';

type CardBadgeProps = {
  text: string;
  color: keyof typeof colorMap;
};

const colorMap = {
  'primary-blue': 'bg-primary-blue/10 text-primary-blue',
} as const;

const CardBadge = ({ text, color }: CardBadgeProps) => {
  return (
    <div className={`inline-block px-3 py-1 rounded-md ${colorMap[color]}`}>
      <Typography className='font-bold text-sm'>{text}</Typography>
    </div>
  );
};

export default CardBadge;
