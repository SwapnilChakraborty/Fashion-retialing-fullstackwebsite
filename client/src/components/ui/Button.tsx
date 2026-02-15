import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { Loader2 } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400',
            secondary: 'bg-lavender text-black hover:brightness-95 disabled:opacity-50',
            outline: 'border-2 border-black bg-transparent hover:bg-black hover:text-white text-black',
            ghost: 'bg-transparent hover:bg-gray-100 text-black',
            danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
        };

        const sizes = {
            sm: 'h-9 px-4 text-xs',
            md: 'h-12 px-8 text-sm',
            lg: 'h-14 px-10 text-base',
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    'relative inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
