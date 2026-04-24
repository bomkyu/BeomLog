import { ComponentPropsWithoutRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-2 w-full'>
        {label && (
          <label className='text-sm font-medium text-slate-700 ml-1'>
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
              px-4 py-3.5 rounded-lg border bg-[#F8FAFC] outline-none transition-all
              placeholder:text-slate-400 text-slate-900 text-sm
              ${
                error
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-200 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue'
              }
              ${className}
            `}
          {...props}
        />

        {error && (
          <span className='text-xs text-red-500 ml-1 animate-in fade-in slide-in-from-top-1'>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'BaseInput';

export default Input;
