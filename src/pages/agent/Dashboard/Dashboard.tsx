import { Box } from '@mui/material';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ListButton from './components/ListButton';
import TableDashboard from './components/TableDashboard';

export default function Dashboard() {
  const { t } = useTranslation(['dashboard']);
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('dashboard')} />
      <Box p="24px">
        <ListButton />
        <TableDashboard />
      </Box>
    </Box>
  );
}
