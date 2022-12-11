import { Box, Typography } from '@mui/material';
import CardWhite from 'components/CardWhite/CardWhite';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import LayoutDetail from 'layout/LayoutDetail';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fields1, fields2, fields3, KeyFields } from './constant';

type Values = Record<typeof KeyFields[number], string>;

export default function CreatePackageOrders() {
  const { control } = useForm<Values>();
  const { t } = useTranslation(['packageSales', 'translation']);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const handleNext = () => {
    navigate('add-merchandise');
  };

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <CardWhite title={t('select_your_trip')}>
        <FilterTicket control={control} fields={fields1} filterKey="packageSales" numberColumns={3} />
        <Box my="12px">
          <Typography component="p" variant="textBold" mb="16px">
            {t('sender')}
          </Typography>
          <FilterTicket control={control} fields={fields2} filterKey="packageSales" numberColumns={3} />
        </Box>
        <Box my="12px">
          <Typography component="p" variant="textBold" mb="16px">
            {t('recipent')}
          </Typography>
          <FilterTicket control={control} fields={fields3} filterKey="packageSales" numberColumns={3} />
        </Box>
        <ComboButton onCancel={handleCancel} textOk={t('translation:next')} onSave={handleNext} />
      </CardWhite>
      <DialogConfirm openDialog={open} title={t('translation:cancel_type', { type: t('package_order') })} subTitle={t('translation:leave_page')} onClose={handleClose} />
    </LayoutDetail>
  );
}
