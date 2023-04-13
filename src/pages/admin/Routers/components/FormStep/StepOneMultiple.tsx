import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, Grid, InputLabel, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import TrashSvg from 'assets/images/trash.svg';
import cx from 'classnames';
import Button2 from 'components/Button/Button';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { customStyles } from 'components/FilterTicket/customStyles';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { get, isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getListDestinations } from 'services/Destinations/getListDestinations';
import { Route } from 'services/models/Route';
import { Vehicle } from 'services/models/Vehicle';
import { toDayjs } from 'utils/toDayjs';
import EditPriceTrip from '../EditPriceTrip';

export interface RoutePointValues {
  stop_point: string;
  duration: number;
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
}
export interface StepOneValuesForMultipleStopTrip {
  vehicle: Vehicle;
  departurePoint: string;
  departureTime: dayjs.Dayjs;
  routePoints: RoutePointValues[];
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
  inputNumberWrap: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    height: '40px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 10px',
  },
  inputNumber: {
    width: '100%',
    height: '35px',
    borderColor: 'transparent',
    '&:focus-visible': {
      outline: 'none',
    },
  },
  inputError: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
  prefix: {
    fontSize: '14px',
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
  },
}));

const fieldKeys: Array<keyof Route> = ['vehicle', 'departurePoint', 'departureTime'];
const emptyRoutePoint: RoutePointValues = {
  stop_point: '',
  duration: 0,
  ecoAdult: 0,
  vipAdult: 0,
  ecoStudent: 0,
  vipStudent: 0,
  ecoChildren: 0,
  vipChildren: 0,
};

interface StepOneMultipleProps {
  onNextStep?: (values: StepOneValuesForMultipleStopTrip) => void;
  onCancel?: (values: StepOneValuesForMultipleStopTrip) => void;
  isEdit?: boolean;
  values?: StepOneValuesForMultipleStopTrip;
  isLoading?: boolean;
}

export default function StepOneMultiple({ onCancel, onNextStep, isEdit, values, isLoading }: StepOneMultipleProps) {
  const classes = useStyles();
  const { t } = useTranslation(['routers', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm<StepOneValuesForMultipleStopTrip>({
    defaultValues: {
      routePoints: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'routePoints',
  });
  const routePoints = watch('routePoints');
  const vehicle = watch('vehicle');
  const departurePoint = watch('departurePoint');

  const [open, setOpen] = useState(false);
  const [openDeleteRoutePoint, setOpenDeleteRoutePoint] = useState<number | null>(null);

  const isAddable = routePoints.length < 5;

  const handleClose = () => setOpen(false);

  const handleOpenDialogDelete = (index: number) => {
    setOpenDeleteRoutePoint(index);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeleteRoutePoint(null);
  };

  const handleCancel = () => {
    setOpen(true);
    onCancel?.(getValues());
  };

  const handleAppend = () => {
    append(emptyRoutePoint);
  };

  const handleSave = (values: StepOneValuesForMultipleStopTrip) => {
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
        departureTime: toDayjs({ value: values.departureTime, format: 'HH:mm' }),
        routePoints: values.routePoints.map(routePoint => ({
          ...routePoint,
          duration: routePoint.duration,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const renderDialogDelete = () => {
    if (openDeleteRoutePoint === null) {
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
                remove(openDeleteRoutePoint);
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
      <FormVerticle
        errors={errors}
        messages={messages}
        control={control}
        indexGridHorizon={0}
        isGridHorizon
        grid
        filterKey="routers"
        fields={[
          {
            type: 'controlSelectVehicle',
            label: 'vehicle',
            id: 'vehicle',
            vehicle,
            onChange: vehicle => {
              setValue('vehicle', vehicle as StepOneValuesForMultipleStopTrip['vehicle']);
            },
            required: true,
          },
          {
            type: 'controlSelectDestination',
            label: 'departurePoint',
            id: 'departurePoint',
            destination: departurePoint,
            onChange: departurePoint => {
              setValue('departurePoint', departurePoint as StepOneValuesForMultipleStopTrip['departurePoint']);
            },
            required: true,
          },
          {
            id: 'departureTime',
            label: 'departureTime',
            type: 'datetime',
            showTime: true,
            required: true,
            picker: 'time',
            format: 'HH:mm',
          },
        ]}
      />
      <Box mt="24px">
        {fields.map((f, index) => {
          const routePointPathInFormValues: `routePoints.${any}.stop_point` = `routePoints.${index}.stop_point`;
          const durationPathInFormValues: `routePoints.${any}.duration` = `routePoints.${index}.duration`;
          return (
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
                      name={routePointPathInFormValues}
                      render={() => {
                        const labelTranslated = t('routers:stop_point');
                        const error = get(errors, routePointPathInFormValues);
                        const messageErr = t('translation:error_required', { name: labelTranslated });
                        const value = get(getValues(), routePointPathInFormValues) ?? '';
                        return (
                          <Box>
                            <InputLabel className={classes.label}>{labelTranslated}</InputLabel>
                            <SingleSelectDecouplingData
                              isSearchable
                              value={{ value }}
                              service={async () => {
                                try {
                                  const response = await getListDestinations({
                                    page: 0,
                                    searcher: {},
                                    sorter: {},
                                    isGetAll: true,
                                  });
                                  return response.data.hits.map(item => ({ value: item.title as string }));
                                } catch {
                                  return [];
                                }
                              }}
                              transformToOption={model => ({
                                key: model.value,
                                label: model.value,
                                value: model,
                              })}
                              equalFunc={(model, input) => model.value === input?.value}
                              styles={customStyles as any}
                              placeholder={labelTranslated}
                              onChange={selected => {
                                setValue(routePointPathInFormValues, selected?.value as string);
                              }}
                            />
                            {!!error && (
                              <Typography component="p" className={classes.error} fontSize={12}>
                                {messageErr}
                              </Typography>
                            )}
                          </Box>
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name={durationPathInFormValues}
                      render={({ field }) => {
                        const labelTranslated = t('routers:arrivalDuration');
                        const error = get(errors, durationPathInFormValues);
                        const messageErr = t('translation:error_required', { name: labelTranslated });
                        return (
                          <Box>
                            <InputLabel htmlFor={`duration-${f.id}`} className={classes.label}>
                              {labelTranslated}
                            </InputLabel>
                            <Box className={cx(classes.inputNumberWrap, !!error ? classes.inputError : '')}>
                              <input {...field} id={`duration-${f.id}`} min={0} type="number" className={classes.inputNumber} />
                            </Box>
                            {!!error && (
                              <Typography component="p" className={classes.error} fontSize={12}>
                                {messageErr}
                              </Typography>
                            )}
                          </Box>
                        );
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box my="10px">
                <Typography fontSize={14} color="#45485e" fontWeight={500} py="16px">
                  {t('routers:config_prices_per_passenger')}
                </Typography>
                <EditPriceTrip errors={errors} control={control as any} isMulti index={index} />
              </Box>
            </Box>
          );
        })}
        {isAddable && (
          <Button variant="outlined" fullWidth className={classes.btn} startIcon={<AddIcon sx={{ color: '#1AA6EE' }} />} onClick={handleAppend}>
            {t('routers:add_new_stop')}
          </Button>
        )}
      </Box>
      <ComboButton
        isSaving={isLoading}
        textOk={isEdit ? t('translation:save') : t('translation:next')}
        onCancel={handleCancel}
        onSave={handleSubmit(handleSave)}
      />
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
