import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type ButtonVariants = 'outline' | 'primary';

const variants = {
  outline:
    'py-4 px-6 border border-primary-dark text-primary-dark lg:hover:bg-primary-dark lg:hover:border-primary-dark lg:hover:text-white font-bold transition-all duration-200 ease-in-out',
  primary:
    'py-4 px-6 bg-primary-dark lg:hover:bg-primary text-white font-bold transition-all duration-200 ease-in-out  focus:ring-3 focus:ring-primary focus:ring-offset-2 focus:ring-offset-red-500/60 disabled:opacity-50',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariants;
  onClick?: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({
  children,
  className,
  variant = 'primary',
  onClick,
  ref,
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const classes = cn('px-4 py-2 rounded-sm text-sm lg:text-base', variants[variant], className);

  return (
    <button onClick={onClick} ref={ref} className={classes} {...rest}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
