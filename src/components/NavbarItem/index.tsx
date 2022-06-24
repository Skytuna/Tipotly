import useStore from '@store/useStore';
import { twMerge } from 'tailwind-merge';
import { Transition } from 'react-transition-group';
import { TRANSITION_DURATION } from '@utils/constants/theme';

interface Props {
    icon: React.ReactElement;
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

export default function NavbarItem({ icon, onClick, className, title }: Props) {
    const isCollapsed = useStore((s) => s.isSidebarCollapsed);

    const transitionStyles: any = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };

    return (
        <button
            className={twMerge(
                'mt-4 mx-4 p-4 rounded hover:bg-primaryHover hover:cursor-pointer transition-all w-44 duration-150',
                isCollapsed && 'w-14',
                className,
            )}
            onClick={onClick}>
            <div className='flex flex-row items-center justify-between' title={title}>
                <div>{icon}</div>
                <Transition in={!isCollapsed} timeout={TRANSITION_DURATION}>
                    {(state) => (
                        <p
                            className='font-montserrat transition-all text-md text-neutral-800 opacity-0 duration-100'
                            style={{ ...transitionStyles[state] }}>
                            {title}
                        </p>
                    )}
                </Transition>
            </div>
        </button>
    );
}
