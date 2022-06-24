import { Navigate, useLocation } from 'react-router-dom';
import useStore from '@store/useStore';

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const user = useStore((s) => s.user);
    let location = useLocation();

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    if (!user) return <Navigate to='/login' state={{ from: location }} replace />;

    return children;
}
