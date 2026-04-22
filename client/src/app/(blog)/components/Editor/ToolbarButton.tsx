import { LucideIcon } from 'lucide-react';

type ToolbarButtonProps = {
  onClick: () => void;
  active: boolean;
  label: string;
  icon: LucideIcon;
};

const ToolbarButton = ({
  onClick,
  active,
  label,
  icon: Icon,
}: ToolbarButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
    }`}
  >
    <Icon size={18} strokeWidth={2.5} />
  </button>
);

export default ToolbarButton;
