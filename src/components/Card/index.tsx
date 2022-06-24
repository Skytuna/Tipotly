import ActionButtonWrapper from '@components/ActionButtonWrapper';
import ActionButton from '@components/ActionButton';
import { DEFAULT_ICON_COLOR, ICON_SIZE } from '@utils/constants/theme';
import useHover from '@hooks/useHover';
import { ActionButton as ActionButtonType } from '@utils/types/card';
import { twMerge } from 'tailwind-merge';

interface Props {
    content: React.ReactNode;
    actionButtons?: ActionButtonType[];
    children?: React.ReactNode;
    className?: string;
}

export default function Card({ content, actionButtons, children, className }: Props) {
    const [cardRef, isHovered] = useHover<any>();

    return (
        <div
            className={twMerge(
                'bg-slate-300 gap-4 rounded-md flex flex-row shadow-md hover:shadow-lg hover:opacity-95 relative',
                className,
            )}
            ref={cardRef}>
            {content}
            <ActionButtonWrapper show={isHovered}>
                {actionButtons?.map((actionButton) => (
                    <ActionButton
                        key={actionButton.title}
                        onClick={actionButton.onClick}
                        title={actionButton.title}>
                        <actionButton.icon size={ICON_SIZE.SMALL} color={DEFAULT_ICON_COLOR} />
                    </ActionButton>
                ))}
            </ActionButtonWrapper>
            {children}
        </div>
    );
}
