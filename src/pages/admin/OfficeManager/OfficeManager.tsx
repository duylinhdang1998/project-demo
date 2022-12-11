import { Box } from '@mui/material';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TableOfficesManager from './components/TableOfficesManager';

export default function OfficeManager() {
  const { t } = useTranslation(['account', 'translation']);
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate('/admin/add-office-manager');
  };
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('offices_manager')} />
      <Box padding="24px">
        <BoxSearch onAdd={handleAdd} addTextButton={t('translation:create_new', { type: t('office') })} />
        <TableOfficesManager />
      </Box>
    </Box>
  );
}
