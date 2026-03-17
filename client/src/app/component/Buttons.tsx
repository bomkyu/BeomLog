import { ReactNode } from 'react';

type ButtonsProps = {
  children: ReactNode;
  btnType: 'primary' | 'secondary' | 'outLine';
  onClick?: () => void;
};

const baseStyles =
  'px-6 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer';

const typeStylesMap = {
  primary: 'bg-[rgb(var(--primary-blue))] text-white ',
  secondary: 'bg-[rgb(var(--light-blue)] text-blue-600',
  outLine: 'bg-transparent border border-[var(--outline-gray)] text-gray-800',
};

const Buttons = ({ children, btnType, onClick }: ButtonsProps) => {
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${typeStylesMap[btnType]}`}
    >
      {children}
    </button>
  );
};
export default Buttons;
