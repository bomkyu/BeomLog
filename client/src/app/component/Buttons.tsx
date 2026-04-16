import { ReactNode } from 'react';

type ButtonsProps = {
  children: ReactNode;
  btnType: 'primary' | 'secondary' | 'outLine';
  onClick?: () => void;
  className?: string;
};

const baseStyles =
  'px-6 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer';

const typeStylesMap = {
  primary: 'bg-primary-blue text-white ',
  secondary: 'bg-primary-blue text-blue-600',
  outLine: 'bg-transparent border border-outline-gray text-gray-800',
};

const Buttons = ({ children, btnType, className, onClick }: ButtonsProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center ${baseStyles} ${typeStylesMap[btnType]} ${className}`}
    >
      {children}
    </button>
  );
};
export default Buttons;
