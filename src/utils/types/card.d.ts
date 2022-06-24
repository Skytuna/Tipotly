import { IconType } from 'react-icons';

export interface ActionButton {
    title: string;
    icon: IconType;
    onClick: () => void;
}
