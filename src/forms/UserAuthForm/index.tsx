import TButton from '@components/TButton';
import useStore from '@store/useStore';
import { TEXT_BASE } from '@utils/constants/theme';
import { ReqStatus } from '@utils/types/api';
import { User, UserLoginForm, UserSignUpForm } from '@utils/types/user';
import { TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface Props {
    onSubmit: (form: UserSignUpForm | UserLoginForm) => Promise<void>;
    title: 'LOGIN' | 'SIGN UP';
}

type LocationProps = {
    state: {
        from: Location;
    };
};

export default function UserAuthForm({ onSubmit, title }: Props) {
    const [status, setStatus] = useState<ReqStatus>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const user = useStore((s) => s.user);
    const setUser = useStore((s) => s.setUser);
    let navigate = useNavigate();
    const location = useLocation() as unknown as LocationProps;

    useEffect(() => {
        if (user) navigate(location.state?.from?.pathname || '/tipots', { replace: true });
    }, [user]);

    useEffect(() => {
        const localUserString = localStorage.getItem('user');
        if (localUserString) {
            const localUser = JSON.parse(localUserString) as User;
            setUser(localUser);
        }
    }, []);

    const submitHandler = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('pending');
        const form = new FormData(e.currentTarget);
        const email = form.get('email') as string;
        const name = form.get('name') as string;
        const password = form.get('password') as string;
        await onSubmit({ email, name, password });
        setStatus('success');
    };

    const toggleShowPassword = () => {
        setShowPassword((p) => !p);
    };

    return (
        <form
            className='flex flex-col items-center gap-2 sm:gap-4 p-4 sm:p-8 rounded-lg shadow bg-slate-100'
            onSubmit={submitHandler}>
            <h1 className={TEXT_BASE + ' text-lg'}>{title}</h1>
            <div className='w-full h-0.5 bg-slate-200 rounded-full' />

            {title === 'SIGN UP' && (
                <div>
                    <label htmlFor='name' className={TEXT_BASE + ' self-start'}>
                        Name
                    </label>
                    <div className='relative' id='name'>
                        <TextInput
                            type='text'
                            name='name'
                            maxLength={20}
                            className='w-auto sm:w-72'
                            required
                        />
                    </div>
                </div>
            )}

            <div>
                <label htmlFor='email' className={TEXT_BASE + ' self-start'}>
                    Email
                </label>
                <div className='relative' id='email'>
                    <TextInput type='email' name='email' className='w-auto sm:w-72' required />
                </div>
            </div>

            <div>
                <label htmlFor='password' className={TEXT_BASE + ' self-start'}>
                    Password
                </label>
                <div className='relative' id='password'>
                    <TextInput
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        className='w-auto sm:w-72'
                        required
                    />
                    <TButton
                        onClick={toggleShowPassword}
                        className='bg-transparent shadow-none hover:bg-transparent h-full px-3 rounded-md absolute right-0 top-0'>
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </TButton>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center w-full'>
                {title === 'LOGIN' && (
                    <Link to='/sign-up'>
                        <p className='underline text-primary hover:text-primaryHover '>SIGN UP</p>
                    </Link>
                )}
                {title === 'SIGN UP' && (
                    <Link to='/login'>
                        <p className='underline text-primary hover:text-primaryHover '>LOGIN</p>
                    </Link>
                )}
                <TButton type='submit' reqStatus={status}>
                    <p className={TEXT_BASE}>SUBMIT</p>
                </TButton>
            </div>
        </form>
    );
}
