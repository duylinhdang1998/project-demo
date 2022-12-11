import { Box, Divider, Typography } from '@mui/material';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AddStaff() {
  const { t } = useTranslation();

  return (
    <LayoutDetail title={t('create_new', { type: 'staff' })} subTitle={t('sidebar.staff')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {t(`add_new`, { type: 'staff' })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
        </Box>
      </Box>
    </LayoutDetail>
  );
}
