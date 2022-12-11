import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, InputLabel, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { DatePicker } from 'antd';
import TrashSvg from 'assets/images/trash.svg';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { customStyles } from 'components/FilterTicket/customStyles';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { Option } from 'models/Field';
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { departureOptions, fieldsStepMulti } from '../../constants';
import EditPriceTrip from '../EditPriceTrip';
import { StepCountProps } from './StepOne';

interface Values {
  stop_point: Option;
  stop_time: string;
  eco_adult: string;
  vip_adult: string;
  eco_student: string;
  vip_student: string;
  eco_children: string;
  vip_children: string;
}
interface FieldArrayValues {
  vehicles_name: Option;
  departures_point: Option;
  departure_time: string;
  stops: Values[];
}

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    border: '1px solid #1AA6EE',
    borderStyle: 'dashed !important',
    color: '#1AA6EE',
    backgroundColor: 'transparent !important',
    '&:hover': {
      color: '#1AA6EE !important',
    },
    marginTop: '10px !important',
  },
  label: {
    color: theme.palette.grey[200] + '!important',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
    '&.MuiFormControlLabel-label': {
      fontSize: '14px !important',
    },
  },
  datePicker: {
    width: '100%',
    height: '40px',
    border: '1px solid #f7f7f7 !important',
  },
}));

export default function StepOneMultiple({ onNextStep, onCancel, isEdit, defaultValue }: StepCountProps) {
  const classes = useStyles();
  const { t } = useTranslation(['routers', 'translation']);
  const { control, handleSubmit } = useForm<FieldArrayValues>({
    defaultValues: {
      stops: [{ stop_point: {}, stop_time: '', eco_adult: '', vip_adult: '', eco_student: '', vip_student: '', eco_children: '', vip_children: '' }],
      vehicles_name: {},
      departure_time: '',
      departures_point: {},
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stops' as never,
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    if (isEdit) {
      setOpen(true);
      return;
    }
    onCancel?.();
  };

  const handleAppend = () => {
    append({ stop_point: {}, stop_time: '', eco_adult: '', vip_adult: '', eco_student: '', vip_student: '', eco_children: '', vip_children: '' });
  };

  const handleSave = (values: FieldArrayValues) => {
    console.log({ values });
  };

  return (
    <Box my="24px">
      <FormVerticle control={control} fields={fieldsStepMulti} indexGridHorizon={0} isGridHorizon grid filterKey="routers" />
      <Box mt="24px">
        {fields.map((f, index) => (
          <Box key={f.id} borderTop="1px dashed #ddd" py="24px">
            <Stack direction="row" alignItems="center" justifyContent="space-between" my="10px">
              <Typography fontSize={14} fontWeight={700}>
                {t('stop')} {index + 1}
              </Typography>
              <TextWithIcon icon={TrashSvg} text={t('translation:delete')} color="#FF2727" onClick={remove} />
            </Stack>
            <Box my="10px">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name={`stops.${index}.stop_point`}
                    render={({ field }) => (
                      <Box>
                        <InputLabel className={classes.label}>{t('stop_point')}</InputLabel>
                        <Select {...field} options={departureOptions} styles={customStyles} placeholder={t('stop_point')} />
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name={`stops.${index}.stop_time`}
                    render={({ field }) => (
                      <Box>
                        <InputLabel className={classes.label}>{t('stop_time')}</InputLabel>
                        <DatePicker showTime={true} value={field.value as any} onChange={field.onChange} className={classes.datePicker} />
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box my="10px">
              <Typography fontSize={14} color="#45485e" fontWeight={500} py="16px">
                {t('config_prices_per_passenger')}
              </Typography>
              <EditPriceTrip control={control as any} isMulti index={index} />
            </Box>
          </Box>
        ))}
        <Button variant="outlined" fullWidth className={classes.btn} startIcon={<AddIcon sx={{ color: '#1AA6EE' }} />} onClick={handleAppend}>
          {t('add_new_merchandise')}
        </Button>
      </Box>
      <ComboButton textOk={isEdit ? t('translation:save') : t('translation:next')} onCancel={handleCancel} onSave={handleSubmit(handleSave)} />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(isEdit ? 'edit_trip' : 'one_way_trip').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
