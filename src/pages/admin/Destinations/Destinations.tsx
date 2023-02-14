import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import TableDestinations from './components/TableDestinations';

export default function Destinations() {
  const { t } = useTranslation('destinations');
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate('/admin/add-new-destinations');
  };
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('destinations')} />
      <Box padding="24px">
        <BoxSearch onAdd={handleAdd} addTextButton={t('translation:add_new', { type: t('destinations').toLowerCase() })} />
        <TableDestinations />
      </Box>
    </Box>
  );
}
