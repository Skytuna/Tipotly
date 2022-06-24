import { storage } from '@api/firebase';
import NavbarItem from '@components/NavbarItem';
import UploadUserPhotoModal from '@components/UploadUserPhotoModal';
import useStore from '@store/useStore';
import { DEFAULT_ICON_COLOR, ICON_SIZE } from '@utils/constants/theme';
import { ref } from 'firebase/storage';
import { Avatar } from 'flowbite-react';
import { useState } from 'react';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { FiChevronLeft, FiChevronRight, FiLogOut, FiUsers, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [showUserAvatarModal, setShowUserAvatarModal] = useState<boolean>(false);
    const isCollapsed = useStore((s) => s.isSidebarCollapsed);
    const user = useStore((s) => s.user);
    const toggleSidebar = useStore((s) => s.toggleSidebar);
    const logout = useStore((s) => s.logout);

    const [avatarUrl] = useDownloadURL(ref(storage, `user-avatars/${user?.id}`));

    const toggleUploadUserAvatarModal = () => {
        setShowUserAvatarModal((p) => !p);
    };

    return (
        <nav
            className={`bg-primary shadow-xl shadow-primaryHover flex h-auto relative
            flex-col justify-start items-center ease-in-out duration-300 transition-width rounded-r-sm`}>
            <div
                className='mt-4 hover:cursor-pointer'
                title={user?.name}
                onClick={toggleUploadUserAvatarModal}>
                <Avatar img={avatarUrl} rounded />
            </div>
            <UploadUserPhotoModal toggle={toggleUploadUserAvatarModal} show={showUserAvatarModal} />
            <Link to='/tipots'>
                <NavbarItem
                    icon={<FiGrid size={ICON_SIZE.SMALL} className={DEFAULT_ICON_COLOR} />}
                    title='Tipots'
                />
            </Link>
            <Link to='/friends'>
                <NavbarItem
                    icon={<FiUsers size={ICON_SIZE.SMALL} className={DEFAULT_ICON_COLOR} />}
                    title='Friends'
                />
            </Link>
            <NavbarItem
                title='Logout'
                onClick={logout}
                icon={<FiLogOut size={ICON_SIZE.SMALL} className={DEFAULT_ICON_COLOR} />}
            />
            <NavbarItem
                title='Collapse'
                className='mt-auto mb-4'
                onClick={toggleSidebar}
                icon={
                    isCollapsed ? (
                        <FiChevronRight size={ICON_SIZE.SMALL} className={DEFAULT_ICON_COLOR} />
                    ) : (
                        <FiChevronLeft size={ICON_SIZE.SMALL} className={DEFAULT_ICON_COLOR} />
                    )
                }
            />
        </nav>
    );
}
