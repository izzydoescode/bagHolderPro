import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // Accepted for API parity with shadcn/ui; styling is driven by className for now.
  variant?: 'default' | 'destructive';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Button = ({ children, className, variant, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
