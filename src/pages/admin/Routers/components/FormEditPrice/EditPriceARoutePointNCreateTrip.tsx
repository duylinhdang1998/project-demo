import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { InputNumber } from 'antd';
import { default as classNames, default as cx } from 'classnames';
import { get } from 'lodash-es';
import { useMemo } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RoutePoint } from 'services/models/Route';
import { useStyles } from './useStyles';
import { useSelector } from 'react-redux';
import { selectProfile } from 'store/profile/selectors';

export interface EditPriceARoutePointFormValues {
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
  routePointId?: RoutePoint['_id'];
}

interface EditPriceCreateTripProps {
  control: Control<{ routePoints: EditPriceARoutePointFormValues[] }>;
  errors: FieldErrors<{ routePoints: EditPriceARoutePointFormValues[] }>;
  isMulti: true;
  index: number;
}

interface EditPriceARoutePointProps {
  control: Control<EditPriceARoutePointFormValues>;
  errors: FieldErrors<EditPriceARoutePointFormValues>;
  isMulti: false;
  index?: undefined;
}

export default function EditPriceARoutePointNCreateTrip({ control, errors, isMulti, index }: EditPriceCreateTripProps | EditPriceARoutePointProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const classes = useStyles();
  const { profile } = useSelector(selectProfile);
  const getNameInput = (defaultName: string) => {
    if (isMulti) {
      return `routePoints.${index}.${defaultName}`;
    }
    return defaultName;
  };

  const rows = useMemo(() => {
    return [
      { title: t('routers:adult'), value: 'Adult' },
      { title: t('routers:student'), value: 'Student' },
      { title: t('routers:children'), value: 'Children' },
    ];
  }, [t]);

  const inputs = useMemo(() => {
    return [
      { title: t('routers:eco'), value: 'eco' },
      { title: t('routers:vip'), value: 'vip' },
    ];
  }, [t]);

  const error = rows.find(row => inputs.find(input => !!get(errors, getNameInput(`${input.value}${row.value}`))));

  return (
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
          {rows.map(row => {
            return (
              <TableRow key={row.value}>
                <TableCell className={classNames(classes.cell, classes.cellTitle)} component="th" scope="row">
                  {row.title}
                </TableCell>
                {inputs.map(input => {
                  return (
                    <TableCell key={input.value} className={classNames(classes.cell)}>
                      <Controller
                        control={control as any}
                        name={getNameInput(`${input.value}${row.value}`)}
                        render={({ field }) => {
                          return (
                            <InputNumber
                              {...field}
                              min={0}
                              formatter={value => (value ? `${value}${profile?.currency}` : '')}
                              parser={value => (value ? value.replace(`${profile?.currency}`, '') : 0)}
                              placeholder={t('routers:input_price')}
                              className={cx(classes.input)}
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
                          validate: (value: string) => {
                            const value_ = Number(value);
                            if (isNaN(value_) || value_ <= 0) {
                              return t('translation:error_required', {
                                name: t('routers:prices').toLowerCase(),
                              });
                            }
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
      {!!error && (
        <Typography component="p" className={classes.error} fontSize={12}>
          {t('translation:error_required', {
            name: t('routers:prices').toLowerCase(),
          })}
        </Typography>
      )}
    </TableContainer>
  );
}
