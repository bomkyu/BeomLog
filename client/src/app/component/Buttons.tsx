import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonsProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  btnType: 'primary' | 'secondary' | 'outLine' | 'postAction';
};

const baseStyles =
  ' rounded-lg font-semibold transition-all duration-200 cursor-pointer';

const typeStylesMap = {
  primary: 'px-6 py-2 bg-primary-blue text-white ',
  secondary: 'px-6 py-2 bg-primary-blue text-primary-blue',
  outLine: 'px-6 py-2 bg-transparent border border-outline-gray text-gray-800',
  postAction: 'px-4 py-0 gap-2 h-10',
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
