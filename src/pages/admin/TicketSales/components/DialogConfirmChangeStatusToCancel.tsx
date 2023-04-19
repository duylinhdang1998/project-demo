import { Box, Dialog, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface DialogConfirmChangeStatusToCancel {
  onOk: (values: FormValues) => void;
  onCancel: () => void;
  isUpdating: boolean;
}

interface FormValues {
  confirm_description_to_change_cancel: string;
}

export const DialogConfirmChangeStatusToCancel = ({ isUpdating, onCancel, onOk }: DialogConfirmChangeStatusToCancel) => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    onOk(values);
  };

  return (
    <Dialog open onClose={onCancel}>
      <Box padding="24px" style={{ width: 350 }}>
        <Typography textAlign="center" marginBottom="24px" fontSize="16px" fontWeight={700}>
          {t('ticketSales:confirm_title_to_change_cancel')}
        </Typography>
        <FormVerticle
          control={control}
          fields={[
            {
              id: 'reason',
              type: 'textarea',
              label: 'confirm_description_to_change_cancel',
              required: true,
              placeholder: t('ticketSales:reason'),
            },
          ]}
          filterKey="ticketSales"
          errors={errors}
          messages={{
            confirm_description_to_change_cancel: t('translation:error_required', {
              name: t('ticketSales:reason').toLowerCase(),
            }),
          }}
        />
        <Stack direction="row" alignItems="center">
          <Button
            variant="outlined"
            sx={{
              margin: '0 6px',
              color: '#1AA6EE',
              padding: '10px 40px',
              flex: '1 1 50%',
            }}
            onClick={onCancel}
          >
            {t('translation:no')}
          </Button>
          <Button
            loading={isUpdating}
            sx={{
              margin: '0 8px',
              color: '#FFFFFF',
              padding: '10px 40px',
              flex: '1 1 50%',
            }}
            backgroundButton="#1AA6EE"
            onClick={handleSubmit(onSubmit)}
          >
            {t('translation:confirm')}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};
