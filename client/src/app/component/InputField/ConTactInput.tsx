type ConTactInput = {
  label: string;
  placeholder: string;
};
const ConTactInput = ({ label, placeholder }: ConTactInput) => {
  return (
    <div className='flex flex-col w-full gap-2'>
      <label
        htmlFor='nameInput'
        className='text-xs font-medium text-slate-700 ml-1'
      >
        {label}
      </label>
      <input
        type='text'
        id='nameInput'
        placeholder={placeholder}
        className='
        w-full
        bg-light-gray2
        text-slate-900 
        placeholder-slate-500 
        text-sm
        rounded-md
        px-4
        py-2 
        outline-none 
        focus:ring-2 focus:ring-blue-400 
        transition-all duration-150
      '
      />
    </div>
  );
};
export default ConTactInput;
