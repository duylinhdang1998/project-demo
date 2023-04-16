import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { InputNumber } from 'antd';
import { default as classNames, default as cx } from 'classnames';
import { get } from 'lodash-es';
import { useMemo } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface EditPriceTripProps {
  control: Control;
  isMulti?: boolean;
  index?: number;
  errors: FieldErrors<any>;
}

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    width: 'calc(100% / 3)',
    border: '1px solid #F7F7F7 !important',
    padding: '8px 14px !important',
  },
  cellTitle: {
    fontSize: '14px !important',
    color: 'rgba(133, 140, 147, 1) !important',
  },
  input: {
    width: '100% !important',
    '& .ant-input-number-input-wrap input': {
      textAlign: 'center',
      fontWeight: 500,
      fontSize: 14,
      color: 'rgba(12, 17, 50, 1)',
    },
  },
  error: {
    marginTop: '4px !important',
    color: `${theme.palette.error.main} !important`,
  },
}));

export default function EditPriceTrip({ control, errors, isMulti, index }: EditPriceTripProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const classes = useStyles();
  const getNameInput = defaultName => {
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
                        control={control}
                        name={getNameInput(`${input.value}${row.value}`)}
                        render={({ field }) => {
                          return (
                            <InputNumber
                              {...field}
                              min={0}
                              formatter={value => (value ? `${value}$` : '')}
                              parser={value => (value ? value.replace('$', '') : 0)}
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
                            message: t('translation:error_required', { name: t('routers:prices') }),
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
          {t('translation:error_required', { name: t('routers:prices') })}
        </Typography>
      )}
    </TableContainer>
  );
}
