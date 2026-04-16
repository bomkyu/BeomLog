import { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const CustoMTextArea = ({ className, ...props }: TextareaProps) => {
  return (
    <div>
      <textarea
        className={`
          w-full p-4
          rounded-2xl border border-gray-100 
          bg-white text-gray-800 placeholder-gray-400
          outline-none focus:ring-1 focus:ring-primary-blue focus:border-primary-blue
          resize-none transition-all
          ${className}
        `}
        {...props}
      />
    </div>
  );
};
export default CustoMTextArea;
