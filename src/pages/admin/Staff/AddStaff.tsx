import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LayoutDetail from 'layout/LayoutDetail';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function AddStaff() {
  const { t } = useTranslation(['translation, staff']);

  const { staffId } = useParams();

  const isEditAction = useMemo(() => {
    return !!staffId;
  }, [staffId]);

  return (
    <LayoutDetail
      title={isEditAction ? t('translation:edit_type', { type: t('staff:staff') }) : t('translation:create_new', { type: t('staff:staff') })}
      subTitle={t('staff:staff')}
    >
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {isEditAction ? t('translation:edit_type', { type: t('staff:staff') }) : t('translation:create_new', { type: t('staff:staff') })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
        </Box>
      </Box>
    </LayoutDetail>
  );
}
