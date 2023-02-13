import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import TableServices from './components/TableServices';

function ServicesSettings() {
  const { t } = useTranslation('serviceSetting');
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/admin/add-service');
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('service_settings')} />
      <Box padding="24px">
        <BoxSearch onAdd={handleAdd} addTextButton={t('add_service')} />
        <TableServices />
      </Box>
    </Box>
  );
}

export default ServicesSettings;
