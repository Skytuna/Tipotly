import Spinner from '@components/Spinner';
import { Toast } from 'flowbite-react';
import { FiCheck, FiX } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface Props {
    sucess: boolean;
    loading: boolean;
    error?: boolean;
}

export default function RequestToast({ sucess, loading, error }: Props) {
    return (
        <Toast>
            <div
                className={twMerge(
                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    loading &&
                        'bg-orange-100 text-orange-500 dark:bg-orange-800 dark:text-orange-200',
                    sucess && 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200',
                    error && 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200',
                )}>
                {sucess && <FiCheck className='h-5 w-5' />}
                {error && <FiX className='h-5 w-5' />}
                {loading && <Spinner />}
            </div>
            <div className='ml-3 text-sm font-normal font-montserrat'>
                {loading && <>Sending request...</>}
                {error && <>Something went wrong.</>}
                {sucess && <>Sucessful!</>}
            </div>
            <Toast.Toggle />
        </Toast>
    );
}
