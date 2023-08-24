import React from 'react';
import { tv } from 'tailwind-variants';

interface Props {
  children: React.ReactNode;
  size: 'p' | 'auto';
  background?:
    | 'primary'
    | 'secondary'
    | 'base'
    | 'base_inv'
    | 'light'
    | 'cancel'
    | 'transparent';
  rounded?: 'md' | 'lg' | 'full';
  onClick?: any;
}

const button = tv({
  base: 'font-medium rounded',
  variants: {
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      light: 'bg-light',
      base: 'bg-base',
      base_inv: 'text-base bg-white',
      cancel: 'text-zinc-300 bg-zinc-600',
      transparent: 'text-zinc-200 bg-transparent border-[1px] border-zinc-300',
    },
    size: {
      p: 'py-2 px-4',
      auto: 'h-10 w-36',
    },
    rounded: {
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
});

const Button = ({ children, size, background, rounded, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={button({ size: size, color: background, rounded: rounded })}
    >
      {children}
    </button>
  );
};

export default Button;
