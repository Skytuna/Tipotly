import UserAuthForm from '@forms/UserAuthForm';
import AuthLayout from '@layouts/AuthLayout';
import useStore from '@store/useStore';

export default function LoginPage() {
    const login = useStore((s) => s.login);

    return (
        <AuthLayout>
            <UserAuthForm onSubmit={login} title='LOGIN' />
        </AuthLayout>
    );
}
