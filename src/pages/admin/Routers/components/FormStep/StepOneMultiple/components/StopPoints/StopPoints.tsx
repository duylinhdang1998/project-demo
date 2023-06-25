import AddIcon from '@mui/icons-material/Add';
import { Box, Dialog, Grid, InputLabel, Stack, Typography } from '@mui/material';
import { DatePicker } from 'antd';
import TrashSvg from 'assets/images/trash.svg';
import classNames from 'classnames';
import Button from 'components/Button/Button';
import { customStyles } from 'components/FilterTicket/customStyles';
import { useStyles as useFormVerticalStyles } from 'components/FormVerticle/styles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { get, isEqual } from 'lodash-es';
import EditPriceARoutePointNCreateTrip from 'pages/admin/Routers/components/FormEditPrice/EditPriceARoutePointNCreateTrip';
import { useState } from 'react';
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getListDestinations } from 'services/Destinations/getListDestinations';
import { disabledDate } from 'utils/disableDate';
import { timeStringToMinutes } from 'utils/timeStringNMinutes';
import { RoutePointValues, StepOneValuesForMultipleStopTrip } from '../..';
import { useStyles } from './styles';
import { Result } from 'components/SelectDecouplingData/SelectDestination';

export interface StopPointsProps {
  control: Control<StepOneValuesForMultipleStopTrip>;
  errors: FieldErrors<StepOneValuesForMultipleStopTrip>;
  routePoints: Array<StepOneValuesForMultipleStopTrip['routePoints'][number] & FieldArrayWithId>;
  append: UseFieldArrayAppend<StepOneValuesForMultipleStopTrip, 'routePoints'>;
  remove: UseFieldArrayRemove;
  getValues: UseFormGetValues<StepOneValuesForMultipleStopTrip>;
  trigger: UseFormTrigger<StepOneValuesForMultipleStopTrip>;
  setValue: UseFormSetValue<StepOneValuesForMultipleStopTrip>;
  isEdit?: boolean;
}

const emptyRoutePoint: RoutePointValues = {
  stop_point: { _id: '', title: undefined },
  routePointId: undefined,
  duration: dayjs().hour(0).minute(0),
  ecoAdult: 0,
  vipAdult: 0,
  ecoStudent: 0,
  vipStudent: 0,
  ecoChildren: 0,
  vipChildren: 0,
};

export const StopPoints = ({ append, control, errors, remove, getValues, setValue, trigger, routePoints, isEdit }: StopPointsProps) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const formVerticleClasses = useFormVerticalStyles();

  const isAddable = routePoints.length < 5;

  const [openDeleteRoutePoint, setOpenDeleteRoutePoint] = useState<number | null>(null);

  const handleOpenDialogDelete = (index: number) => {
    setOpenDeleteRoutePoint(index);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeleteRoutePoint(null);
  };

  const handleAppend = () => {
    append(emptyRoutePoint);
  };

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
            <Button
              sx={{ margin: '0 8px', color: '#FFFFFF', padding: '10px 40px' }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                remove(openDeleteRoutePoint);
                handleCloseDialogDelete();
              }}
            >
              {t('translation:delete')}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  return (
    <Box mt="24px">
      {routePoints.map((f, index) => {
        const routePointPathInFormValues: `routePoints.${any}.stop_point` = `routePoints.${index}.stop_point`;
        const durationPathInFormValues: `routePoints.${any}.duration` = `routePoints.${index}.duration`;
        return (
          <Box key={f.id} borderTop="1px dashed #ddd" py="24px">
            <Stack direction="row" alignItems="center" justifyContent="space-between" my="10px">
              <Typography fontSize={14} fontWeight={700}>
                {t('routers:stop')} {index + 1}
              </Typography>
              {!isEdit && routePoints.length > 1 && (
                <TextWithIcon icon={TrashSvg} text={t('translation:delete')} color="#FF2727" onClick={() => handleOpenDialogDelete(index)} />
              )}
            </Stack>
            <Box my="10px">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name={routePointPathInFormValues}
                    rules={{
                      required: true,
                    }}
                    render={() => {
                      const labelTranslated = t('routers:stop_point');
                      const error = get(errors, routePointPathInFormValues);
                      const messageErr = t('translation:error_required', { name: labelTranslated.toLowerCase() });
                      const value: Result | undefined = get(getValues(), routePointPathInFormValues) ?? undefined;
                      return (
                        <Box>
                          <InputLabel className={formVerticleClasses.label}>{labelTranslated}</InputLabel>
                          <SingleSelectDecouplingData
                            isSearchable
                            value={value ? { value } : undefined}
                            service={async () => {
                              try {
                                const response = await getListDestinations({
                                  page: 0,
                                  searcher: {},
                                  sorter: {},
                                  isGetAll: true,
                                });
                                return response.data.hits.map(item => ({
                                  value: {
                                    _id: item._id,
                                    title: item.title,
                                  } as Result,
                                }));
                              } catch {
                                return [];
                              }
                            }}
                            transformToOption={model => ({
                              key: model.value._id,
                              label: model.value.title,
                              value: model,
                            })}
                            equalFunc={isEqual}
                            styles={customStyles as any}
                            placeholder={labelTranslated}
                            onChange={selected => {
                              setValue(routePointPathInFormValues, selected?.value as Result);
                              trigger(routePointPathInFormValues);
                            }}
                          />
                          {!!error && (
                            <Typography component="p" className={formVerticleClasses.error} fontSize={12}>
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
                    rules={{
                      required: true,
                      validate: (value: dayjs.Dayjs | null) => {
                        if (!value) {
                          return;
                        }
                        const minutes = timeStringToMinutes(value.format('HH:mm'));
                        if (minutes <= 0) {
                          return t('routers:duration_time_invalid');
                        }
                      },
                    }}
                    render={({ field }) => {
                      const labelTranslated = t('routers:arrivalDuration');
                      const error = get(errors, durationPathInFormValues);
                      const messageErr = t('translation:error_required', { name: labelTranslated.toLowerCase() });

                      return (
                        <Box>
                          <InputLabel htmlFor={`duration-${f.id}`} className={formVerticleClasses.label}>
                            {labelTranslated}
                          </InputLabel>
                          <DatePicker
                            {...field}
                            value={field.value as any}
                            onChange={field.onChange}
                            id={`duration-${f.id}`}
                            className={classNames(formVerticleClasses.datePicker, !!error ? formVerticleClasses.inputError : '')}
                            picker="time"
                            format="HH:mm"
                            disabledDate={disabledDate as any}
                          />
                          {!!error && (
                            <Typography component="p" className={formVerticleClasses.error} fontSize={12}>
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
              <EditPriceARoutePointNCreateTrip errors={errors as any} control={control as any} index={index} isMulti={true} />
            </Box>
          </Box>
        );
      })}
      {isAddable && (
        <Button variant="outlined" fullWidth className={classes.btn} startIcon={<AddIcon sx={{ color: '#1AA6EE' }} />} onClick={handleAppend}>
          {t('routers:add_new_stop')}
        </Button>
      )}
      {renderDialogDelete()}
    </Box>
  );
};
