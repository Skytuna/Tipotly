interface Props {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className='flex w-screen h-screen justify-center items-center bg-slate-50'>
            {children}
        </div>
    );
}
