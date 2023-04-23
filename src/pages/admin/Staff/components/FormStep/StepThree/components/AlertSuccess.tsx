import { Box, Typography } from '@mui/material';
import { Alert } from 'antd';
import 'antd/lib/alert/style/css';
import { useTranslation } from 'react-i18next';

interface AlertSuccessProps {
  isConsultSchedule: boolean;
}

export const AlertSuccess = ({ isConsultSchedule }: AlertSuccessProps) => {
  const { t } = useTranslation(['staff']);

  if (isConsultSchedule) {
    return (
      <Alert
        closable
        showIcon
        type="success"
        className="alertSuccess"
        message={
          <Box>
            <Typography className="alert__title">{t('staff:alert_title')}</Typography>
            <Typography className="alert__description">{t('staff:alert_description')}</Typography>
          </Box>
        }
      />
    );
  }
  return null;
};
