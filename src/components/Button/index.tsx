import { Button as FlowbiteButton, ButtonProps } from 'flowbite-react';

interface Props extends ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
    className?: string;
    title?: string;
}

export default function Button({ onClick, children, title, ...rest }: Props) {
    return (
        <FlowbiteButton onClick={onClick} {...rest}>
            {title ? (
                <p className='font-montserrat text-center text-textPrimary'>{title}</p>
            ) : (
                children
            )}
        </FlowbiteButton>
    );
}
