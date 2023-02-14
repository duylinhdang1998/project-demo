import { Stack } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';

interface ComboButtonProps {
  onCancel?: () => void;
  onSave?: () => void;
  textOk?: string;
  textCancel?: string;
  isLoading?: boolean;
}

function ComboButton({ onCancel, onSave, textOk, textCancel, isLoading = false }: ComboButtonProps) {
  const { t } = useTranslation('translation');
  return (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ marginTop: '30px' }}>
      <Button
        variant="outlined"
        sx={{
          margin: '0 8px',
          color: '#1AA6EE',
          width: 120,
        }}
        onClick={onCancel}
        disabled={isLoading}
      >
        {!!textCancel ? textCancel : t('cancel')}
      </Button>
      <Button
        sx={{
          margin: '0 8px',
          width: 120,
        }}
        loading={isLoading}
        onClick={onSave}
        variant="contained"
        backgroundButton="#1aa6ee"
      >
        {!!textOk ? textOk : t('save')}
      </Button>
    </Stack>
  );
}
export default memo(ComboButton);
