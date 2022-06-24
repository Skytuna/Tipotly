import Spinner from '@components/Spinner';
import { ReqStatus } from '@utils/types/api';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface Props
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    title?: string;
    reqStatus?: ReqStatus;
}

export default function TButton({
    onClick,
    children,
    className,
    title,
    disabled,
    type,
    reqStatus,
    ...rest
}: Props) {
    return (
        <button
            className={twMerge(
                'px-6 py-2 rounded-full flex flex-row gap-2 items-center justify-center bg-primary hover:bg-primaryHover shadow hover:shadow-lg',
                disabled && 'cursor-not-allowed',
                className,
            )}
            type={type || 'button'}
            onClick={onClick}
            {...rest}>
            {reqStatus === 'pending' && <Spinner />}
            {reqStatus === 'success' && <FiCheck />}
            {reqStatus === 'error' && <FiAlertCircle />}
            {children}
        </button>
    );
}
