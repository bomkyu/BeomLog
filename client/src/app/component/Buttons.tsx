import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonsProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  btnType: 'primary' | 'secondary' | 'outLine';
};

const baseStyles =
  'px-6 py-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer';

const typeStylesMap = {
  primary: 'bg-primary-blue text-white ',
  secondary: 'bg-primary-blue text-blue-600',
  outLine: 'bg-transparent border border-outline-gray text-gray-800',
};

const Buttons = ({ children, btnType, className, ...props }: ButtonsProps) => {
  return (
    <button
      className={`flex justify-center items-center ${baseStyles} ${typeStylesMap[btnType]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
export default Buttons;
