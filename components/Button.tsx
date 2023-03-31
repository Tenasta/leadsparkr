import { ForwardedRef, forwardRef, ReactElement, ReactNode } from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    href?: string,
    children: ReactNode
}

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(({ href, children }: ButtonProps, ref: ForwardedRef<HTMLAnchorElement>): ReactElement => {

    return (
        <a ref={ref} href={href} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            {children}
        </a>
    );
});

Button.displayName = "Button";

export default Button;