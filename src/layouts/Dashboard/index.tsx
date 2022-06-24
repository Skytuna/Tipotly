import Navbar from '@components/Navbar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
    return (
        <main className='flex flex-row justify-between relative'>
            <Navbar />
            <section className='flex-1 flex flex-grow min-h-screen p-0 sm:p-8 bg-slate-100'>
                <Outlet />
            </section>
        </main>
    );
}
