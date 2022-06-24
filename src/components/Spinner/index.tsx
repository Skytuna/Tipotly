import { Spinner as FBSpinner } from 'flowbite-react';

interface Props {
    isFull?: boolean;
}

export default function Spinner({ isFull }: Props) {
    if (isFull) return <div className="flex flex-grow h-full w-full items-center justify-center">
        <FBSpinner color='warning' />
    </div>;

    return <FBSpinner color='warning' />;
}
