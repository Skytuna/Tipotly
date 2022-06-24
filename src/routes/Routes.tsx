import RequireAuth from '@components/RequireAuth';
import Dashboard from '@layouts/Dashboard';
import TipotsLayout from '@layouts/TipotsLayout';
import FriendsPage from '@pages/FriendsPage';
import LoginPage from '@pages/LoginPage';
import NewTipotPage from '@pages/NewTipotPage';
import SignUpPage from '@pages/SignUpPage';
import TipotDetailPage from '@pages/TipotDetailPage';
import TipotsPage from '@pages/TipotsPage';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />

            <Route
                path='/'
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }>
                <Route path='tipots' element={<TipotsLayout />}>
                    <Route index element={<TipotsPage />} />
                    <Route path='new' element={<NewTipotPage />} />
                    <Route path=':tipotId' element={<TipotDetailPage />} />
                </Route>

                <Route path='friends' element={<TipotsLayout />}>
                    <Route index element={<FriendsPage />} />
                </Route>
            </Route>

            <Route path='*' element={<>404 not found</>} />
        </Routes>
    );
};

export default AppRoutes;
