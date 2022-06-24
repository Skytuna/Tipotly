import { TRANSITION_BASE } from '@utils/constants/theme';
import { twMerge } from 'tailwind-merge';

interface Props {
    children: React.ReactNode;
    className?: string;
    show?: boolean;
}

export default function ActionButtonWrapper({ children, className, show }: Props) {
    return (
        <div
            className={twMerge(
                'flex flex-row absolute gap-1 sm:gap-2 right-2 -top-6',
                TRANSITION_BASE,
                className,
                show && 'opacity-100',
            )}>
            {children}
        </div>
    );
}
