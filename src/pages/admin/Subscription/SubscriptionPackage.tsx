import { Box, Grid, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import SubscriptionItem from './components/SubscriptionItem';

const packages = [
  {
    id: uuid(),
    name: 'Standard',
    cash: 9.9,
    benefits: [
      { id: uuid(), text: 'Create 1 vehicle.' },
      { id: uuid(), text: 'Static analyst' },
      { id: uuid(), text: 'Reporting & dashboard' },
      { id: uuid(), text: 'Online support' },
    ],
  },
  {
    id: uuid(),
    name: 'Pro',
    cash: 12.9,
    benefits: [
      { id: uuid(), text: 'Create 5 vehicle.' },
      { id: uuid(), text: 'Static analyst' },
      { id: uuid(), text: 'Reporting & dashboard' },
      { id: uuid(), text: 'Online support' },
    ],
    popular: true,
  },
  {
    id: uuid(),
    name: 'Enterprise',
    cash: 15.9,
    benefits: [
      { id: uuid(), text: 'Create UNLIMITED vehicles.' },
      { id: uuid(), text: 'Static analyst' },
      { id: uuid(), text: 'Reporting & dashboard' },
      { id: uuid(), text: 'Online support' },
    ],
  },
];

export default function SubscriptionPackage() {
  const { t } = useTranslation(['account', 'translation']);

  return (
    <LayoutDetail title={t('subscription')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography fontSize={20} fontWeight={700} textAlign="center">
            {t('get_more_out_tbus')}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} my="24px">
            <Button backgroundButton="#1AA6EE" sx={{ padding: '10px 14px' }}>
              {t('monthly_payment')}
            </Button>
            <Button backgroundButton="#F7F7F7" sx={{ padding: '10px 14px', color: '#45485E' }}>
              {t('yearly_payment')}
            </Button>
          </Stack>
          <Grid container spacing="24px">
            {packages.map((p) => (
              <Grid item xs={12} md={4} key={p.id}>
                <SubscriptionItem name={p.name} popular={p.popular} cash={p.cash} benefits={p.benefits} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </LayoutDetail>
  );
}
