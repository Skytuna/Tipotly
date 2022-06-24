import Button from '@components/Button';
import { DEFAULT_ICON_COLOR, ICON_SIZE } from '@utils/constants/theme';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface Props {}

export default function GoBackButton({}: Props) {
    let navigate = useNavigate();

    return (
        <Button onClick={() => navigate(-1)} color='gray' size='xs'>
            <FiChevronLeft size={ICON_SIZE.MEDIUM} className={DEFAULT_ICON_COLOR} />
        </Button>
    );
}
