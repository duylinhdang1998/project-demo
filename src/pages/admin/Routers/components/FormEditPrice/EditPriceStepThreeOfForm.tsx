import { Box, Grid, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DatePicker, InputNumber } from 'antd';
import classNames from 'classnames';
import { customStyles } from 'components/FilterTicket/customStyles';
import { useStyles as useFormVerticalStyles } from 'components/FormVerticle/styles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Dayjs } from 'dayjs';
import { get, isEqual } from 'lodash-es';
import { useMemo } from 'react';
import { Control, Controller, FieldErrors, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getListDestinations } from 'services/Destinations/getListDestinations';
import { RoutePoint } from 'services/models/Route';
import { disabledDate } from 'utils/disableDate';
import { useStyles } from './useStyles';
import { Result } from 'components/SelectDecouplingData/SelectDestination';

interface Item {
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
  routePointId: RoutePoint['_id'];
  stopPoint: Result;
  durationTime: Dayjs;
}

export interface EditPriceStepThreeOfFormValues {
  priceOfRoutePoints: [Item] | Item[];
}

interface EditPriceStepThreeOfFromProps {
  control: Control<EditPriceStepThreeOfFormValues>;
  errors: FieldErrors<EditPriceStepThreeOfFormValues>;
  priceOfRoutePoints: EditPriceStepThreeOfFormValues['priceOfRoutePoints'];
  setValue: UseFormSetValue<EditPriceStepThreeOfFormValues>;
  trigger: UseFormTrigger<EditPriceStepThreeOfFormValues>;
}

export const EditPriceStepThreeOfForm = ({ control, errors, priceOfRoutePoints, setValue, trigger }: EditPriceStepThreeOfFromProps) => {
  const { t } = useTranslation(['routers', 'translation']);
  const classes = useStyles();
  const formVerticleClasses = useFormVerticalStyles();

  const ticketTypes = useMemo(() => {
    return [
      { title: t('routers:adult'), value: 'Adult' },
      { title: t('routers:student'), value: 'Student' },
      { title: t('routers:children'), value: 'Children' },
    ];
  }, [t]);

  const ageClasses = useMemo(() => {
    return [
      { title: t('routers:eco'), value: 'eco' },
      { title: t('routers:vip'), value: 'vip' },
    ];
  }, [t]);

  const getPathNameForInputPrice = (index: number, ticketType: string, ageClass: string) => {
    return `priceOfRoutePoints.${index}.${ticketType + ageClass}`;
  };

  const getPathNameForStopPoint = (index: number) => {
    return `priceOfRoutePoints.${index}.stopPoint` as const;
  };

  const getPathNameForDurationTime = (index: number) => {
    return `priceOfRoutePoints.${index}.durationTime` as const;
  };

  const getPathNameForGetStopPointValueFromProps = (index: number) => {
    return `${index}.stopPoint`;
  };

  const renderItem = (item: EditPriceStepThreeOfFromProps['priceOfRoutePoints'][number], index: number) => {
    const formPriceError = ticketTypes.find(ticketType =>
      ageClasses.find(ageClass => {
        return !!get(errors, getPathNameForInputPrice(index, ticketType.value, ageClass.value));
      }),
    );
    return (
      <Box key={item.routePointId} paddingY="24px" borderBottom="1px dashed rgba(178, 186, 190, 1)">
        <Grid container spacing={2} marginBottom="24px">
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name={getPathNameForStopPoint(index)}
              render={() => {
                const labelTranslated = t('routers:stop_point');
                const error = get(errors, getPathNameForStopPoint(index));
                const messageErr = t('translation:error_required', { name: labelTranslated.toLowerCase() });
                const value = get(priceOfRoutePoints, getPathNameForGetStopPointValueFromProps(index)) ?? '';
                return (
                  <Box>
                    <InputLabel className={formVerticleClasses.label}>{labelTranslated}</InputLabel>
                    <SingleSelectDecouplingData
                      isDisabled
                      isSearchable
                      value={{ value }}
                      service={async () => {
                        try {
                          const response = await getListDestinations({
                            page: 0,
                            searcher: {},
                            sorter: {
                              title: 'asc',
                            },
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
                      equalFunc={(a, b) => isEqual(a?.value?._id, b?.value?._id)}
                      styles={customStyles as any}
                      placeholder={labelTranslated}
                      onChange={selected => {
                        setValue(getPathNameForStopPoint(index), selected?.value);
                        trigger(getPathNameForStopPoint(index));
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
              name={getPathNameForDurationTime(index)}
              render={({ field }) => {
                const labelTranslated = t('routers:arrivalDuration');
                const error = get(errors, getPathNameForDurationTime(index));
                const messageErr = t('translation:error_required', { name: labelTranslated.toLowerCase() });
                return (
                  <Box>
                    <InputLabel htmlFor={`durationTime-${item.routePointId}`} className={formVerticleClasses.label}>
                      {labelTranslated}
                    </InputLabel>
                    <DatePicker
                      {...field}
                      value={field.value as any}
                      onChange={field.onChange}
                      id={`durationTime-${item.routePointId}`}
                      className={classNames(formVerticleClasses.datePicker, !!error ? formVerticleClasses.inputError : '')}
                      picker="time"
                      format="HH:mm"
                      disabledDate={disabledDate as any}
                      allowClear={false}
                      disabled
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
        <TableContainer>
          <Table sx={{ borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                <TableCell className={classNames(classes.cell, classes.cellTitle)}></TableCell>
                <TableCell component="th" className={classNames(classes.cell, classes.cellTitle)} align="center">
                  {t('routers:eco_tickets')}
                </TableCell>
                <TableCell component="th" className={classNames(classes.cell, classes.cellTitle)} align="center">
                  {t('routers:vip_tickets')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticketTypes.map(row => {
                return (
                  <TableRow key={row.value}>
                    <TableCell className={classNames(classes.cell, classes.cellTitle)} component="th" scope="row">
                      {row.title}
                    </TableCell>
                    {ageClasses.map(input => {
                      const pathName = getPathNameForInputPrice(index, input.value, row.value);
                      const error = !!get(errors, pathName);
                      return (
                        <TableCell key={input.value} className={classNames(classes.cell)}>
                          <Controller
                            control={control as any}
                            name={pathName}
                            render={({ field }) => {
                              return (
                                <InputNumber
                                  {...field}
                                  min={0}
                                  formatter={value => (value ? `${value}$` : '')}
                                  parser={value => (value ? value.replace('$', '') : 0)}
                                  placeholder={t('routers:input_price')}
                                  className={classNames(classes.input)}
                                  status={!!error ? 'error' : undefined}
                                  bordered={false}
                                />
                              );
                            }}
                            rules={{
                              required: {
                                value: true,
                                message: t('translation:error_required', {
                                  name: t('routers:prices').toLowerCase(),
                                }),
                              },
                            }}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {!!formPriceError && (
            <Typography component="p" className={classes.error} fontSize={12}>
              {t('translation:error_required', {
                name: t('routers:prices').toLowerCase(),
              })}
            </Typography>
          )}
        </TableContainer>
      </Box>
    );
  };

  return <Box>{priceOfRoutePoints.map(renderItem)}</Box>;
};
