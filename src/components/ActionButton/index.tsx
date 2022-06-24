import TButton from '@components/TButton';
import { Tooltip } from 'flowbite-react';
import { twMerge } from 'tailwind-merge';

interface Props
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {}

export default function ActionButton({ onClick, children, className, title, ...rest }: Props) {
    return (
        <Tooltip content={title}>
            <TButton
                className={twMerge(
                    'p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 shadow-md hover:shadow-lg',
                    className,
                )}
                onClick={onClick}
                {...rest}>
                {children}
            </TButton>
        </Tooltip>
    );
}
