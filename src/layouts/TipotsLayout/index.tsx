import { Outlet } from 'react-router-dom';

export default function TipotsLayout() {
    return (
        <div className='bg-slate-100 sm:bg-slate-200 flex-1 rounded p-8 justify-center items-center'>
            <Outlet />
        </div>
    );
}
