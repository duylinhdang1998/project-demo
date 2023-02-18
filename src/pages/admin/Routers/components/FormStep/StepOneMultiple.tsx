import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, Grid, InputLabel, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { DatePicker } from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import TrashSvg from 'assets/images/trash.svg';
import Button2 from 'components/Button/Button';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { customStyles } from 'components/FilterTicket/customStyles';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { Option } from 'models/Field';
import { Route } from 'services/models/Route';
import { anyToMoment } from 'utils/anyToMoment';
import { departureOptions, fieldsStepMulti } from '../../constants';
import EditPriceTrip from '../EditPriceTrip';
import { SelectVehicle } from './components/SelectVehicle';

interface StopPointValues {
  stop_point: Option;
  stop_time: any; // moment
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
}
export interface StepOneValuesForTripMultiway {
  vehicle: string;
  departurePoint: Option;
  departureTime: any; // moment
  stops: StopPointValues[];
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

const fieldKeys: Array<keyof Route> = ['vehicle', 'departurePoint', 'departureTime'];
const emptyStopPoint: StopPointValues = {
  stop_point: {},
  stop_time: undefined,
  ecoAdult: 0,
  vipAdult: 0,
  ecoStudent: 0,
  vipStudent: 0,
  ecoChildren: 0,
  vipChildren: 0,
};

interface StepOneMultipleProps {
  onNextStep?: (values: StepOneValuesForTripMultiway) => void;
  onCancel?: (values: StepOneValuesForTripMultiway) => void;
  isEdit?: boolean;
  values?: StepOneValuesForTripMultiway;
}

export default function StepOneMultiple({ onCancel, onNextStep, isEdit, values }: StepOneMultipleProps) {
  const classes = useStyles();
  const { t } = useTranslation(['routers', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    resetField,
    reset,
  } = useForm<StepOneValuesForTripMultiway>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stops',
  });

  const [open, setOpen] = useState(false);
  const [openDeleteStopPoint, setOpenDeleteStopPoint] = useState<number | null>(null);

  const getVehicle = () => {
    return getValues().vehicle;
  };

  const handleClose = () => setOpen(false);

  const handleOpenDialogDelete = (index: number) => {
    setOpenDeleteStopPoint(index);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeleteStopPoint(null);
  };

  const handleCancel = () => {
    setOpen(true);
    onCancel?.(getValues());
  };

  const handleAppend = () => {
    append(emptyStopPoint);
  };

  const handleSave = (values: StepOneValuesForTripMultiway) => {
    onNextStep?.(values);
  };

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
  }, [t]);

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      reset({
        ...values,
        departureTime: anyToMoment(values.departureTime),
        stops: values.stops.map(stop => ({
          ...stop,
          stop_time: anyToMoment(stop.stop_time),
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const renderDialogDelete = () => {
    if (openDeleteStopPoint === null) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogDelete}>
        <Box padding="24px" style={{ maxWidth: 311, textAlign: 'center' }}>
          <Typography marginBottom="24px" fontSize="16px" fontWeight={700}>
            {t('translation:delete_record_title')}
          </Typography>
          <Typography marginBottom="30px" fontSize="14px" fontWeight={400}>
            {t('translation:delete_record_message')}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Button
              variant="outlined"
              sx={{
                margin: '0 6px',
                color: '#1AA6EE',
                padding: '10px 40px',
              }}
              onClick={handleCloseDialogDelete}
            >
              {t('translation:cancel')}
            </Button>
            <Button2
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                remove(openDeleteStopPoint);
                handleCloseDialogDelete();
              }}
            >
              {t('translation:delete')}
            </Button2>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  return (
    <Box my="24px">
      <SelectVehicle
        control={control}
        errors={errors}
        messages={messages}
        vehicle={getVehicle()}
        onChange={value => {
          resetField('vehicle', { defaultValue: value });
        }}
      />
      <FormVerticle errors={errors} messages={messages} control={control} fields={fieldsStepMulti} filterKey="routers" />
      <Box mt="24px">
        {fields.map((f, index) => (
          <Box key={f.id} borderTop="1px dashed #ddd" py="24px">
            <Stack direction="row" alignItems="center" justifyContent="space-between" my="10px">
              <Typography fontSize={14} fontWeight={700}>
                {t('routers:stop')} {index + 1}
              </Typography>
              <TextWithIcon icon={TrashSvg} text={t('translation:delete')} color="#FF2727" onClick={() => handleOpenDialogDelete(index)} />
            </Stack>
            <Box my="10px">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name={`stops.${index}.stop_point`}
                    render={({ field }) => (
                      <Box>
                        <InputLabel className={classes.label}>{t('routers:stop_point')}</InputLabel>
                        <Select {...field} options={departureOptions} styles={customStyles} placeholder={t('routers:stop_point')} />
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
              <EditPriceTrip errors={errors} control={control as any} isMulti index={index} />
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
        title={t('translation:cancel_type', { type: t(`routers:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
      {renderDialogDelete()}
    </Box>
  );
}
