import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button/Button';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { memo, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreateVehicle } from 'services/Vehicle/Company/createVehicle';
import { fieldsAdd, fieldsAddRight } from '../constants';

const fieldKeys: Array<keyof CreateVehicle> = ['ECOseats', 'VIPseats', 'attach', 'brand', 'merchandises', 'model', 'registrationId', 'services'];

type Values = Record<typeof fieldKeys[number], string>;

function FormAddVehicles() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Values>({
    defaultValues: {
      ECOseats: '1',
      VIPseats: '1',
    },
  });
  const { t } = useTranslation(['vehicles', 'translation']);
  const [open, setOpen] = useState(false);

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(true);

  const onSubmit = (value: Values) => {
    console.log({ value });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormVerticle errors={errors} messages={messages} fields={fieldsAdd} control={control} filterKey="vehicles" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormVerticle errors={errors} messages={messages} fields={fieldsAddRight} control={control} filterKey="vehicles" />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ marginTop: '30px' }}>
        <Button
          variant="outlined"
          sx={{
            margin: '0 8px',
            color: '#1AA6EE',
            width: 120,
          }}
          onClick={handleCancel}
        >
          {t('translation:cancel')}
        </Button>
        <Button
          sx={{
            margin: '0 8px',
            width: 120,
          }}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          backgroundButton="#1aa6ee"
        >
          {t('translation:save')}
        </Button>
      </Stack>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('vehicles:vehicle') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}

export default memo(FormAddVehicles);
