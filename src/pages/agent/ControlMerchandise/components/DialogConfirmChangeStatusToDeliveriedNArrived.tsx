import { Box, Dialog, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import { useTranslation } from 'react-i18next';

export interface DialogConfirmChangeStatusToDeliveried {
  onOk: () => void;
  onCancel: () => void;
  isUpdating: boolean;
  variant: 'deliveried' | 'arrived';
}

export const DialogConfirmChangeStatusToDeliveriedNArrived = ({ isUpdating, variant, onCancel, onOk }: DialogConfirmChangeStatusToDeliveried) => {
  const { t } = useTranslation();

  return (
    <Dialog open onClose={onCancel}>
      <Box padding="24px" style={{ maxWidth: 311, textAlign: 'center' }}>
        <Typography marginBottom="24px" fontSize="16px" fontWeight={700}>
          {t('packageSales:confirm_title_to_change_non_cancel')}
        </Typography>
        <Typography marginBottom="30px" fontSize="14px" fontWeight={400}>
          {variant === 'deliveried'
            ? t('packageSales:confirm_description_to_change_delivertied')
            : t('packageSales:confirm_description_to_change_arrived')}
        </Typography>
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
            onClick={onOk}
          >
            {t('translation:yes')}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};
