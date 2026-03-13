import { ReactNode, ElementType } from 'react';
import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'caption';

type TypographyProps = {
  children: ReactNode;
  variant?: Variant;
  as?: ElementType;
  className?: string;
};

const variantMap = {
  h1: 'text-5xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-xl font-semibold',
  body: 'text-base font-normal',
  caption: 'text-sm text-gray-500',
};

export default function Typography({
  children,
  variant = 'body',
  as: Component = 'p',
  className,
}: TypographyProps) {
  return (
    <Component className={cn(variantMap[variant], className)}>
      {children}
    </Component>
  );
}
