import UserAuthForm from '@forms/UserAuthForm';
import AuthLayout from '@layouts/AuthLayout';
import useStore from '@store/useStore';

export default function SignUpPage() {
    const signUp = useStore((s) => s.signUp);

    return (
        <AuthLayout>
            <UserAuthForm onSubmit={signUp} title='SIGN UP' />
        </AuthLayout>
    );
}
