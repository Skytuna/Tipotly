import Spinner from '@components/Spinner';
import { ICON_SIZE } from '@utils/constants/theme';
import { FiImage } from 'react-icons/fi';

interface Props {
    url?: string;
    loading: boolean;
    error?: boolean;
}

export default function TipotThumbnail({ url, loading, error }: Props) {
    if (loading) return <Spinner />;
    if (error) return <FiImage size={ICON_SIZE.LARGE} />;
    return (
        <img
            src={url}
            alt='Tipot Card Thumbnail'
            className='aspect-square rounded-l-md filter contrast-75'
        />
    );
}
