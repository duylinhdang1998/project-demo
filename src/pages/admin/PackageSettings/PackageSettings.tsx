import { Box } from '@mui/system';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TablePackageSettings from './components/TablePackageSettings';

export default function PackageSettings() {
  const { t } = useTranslation(['packageSettings', 'translation']);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/admin/add-package-settings');
  };
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('package_settings')} />
      <Box padding="24px">
        <BoxSearch onAdd={handleAdd} addTextButton={t('translation:add_type', { type: t('translation:package') })} />
        <TablePackageSettings />
      </Box>
    </Box>
  );
}
