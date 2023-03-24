import { InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import { get } from 'lodash-es';
import { useMemo } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';

interface EditPriceTripProps {
  control: Control;
  isMulti?: boolean;
  index?: number;
  errors: FieldErrors<any>;
}

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    border: '1px solid #F7F7F7',
    padding: '8px',
  },
  input: {
    textAlign: 'center',
    width: '100% !important',
  },
  inputError: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
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
            <TableCell sx={{ border: '1px solid #F7F7F7', width: 'calc(100% / 3)' }}></TableCell>
            <TableCell component="th" sx={{ border: '1px solid #F7F7F7', width: 'calc(100% / 3)' }} align="center">
              {t('routers:eco_tickets')} ({getAppCurrencySymbol()})
            </TableCell>
            <TableCell component="th" align="center" sx={{ border: '1px solid #F7F7F7', width: 'calc(100% / 3)' }}>
              {t('routers:vip_tickets')} ({getAppCurrencySymbol()})
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.value}>
                <TableCell className={classes.cell} component="th" scope="row" align="center">
                  {row.title}
                </TableCell>
                {inputs.map(input => {
                  return (
                    <TableCell key={input.value} className={classes.cell}>
                      <Controller
                        control={control}
                        name={getNameInput(`${input.value}${row.value}`)}
                        render={({ field }) => (
                          <InputBase
                            {...field}
                            type="number"
                            placeholder={t('routers:input_price')}
                            className={cx(classes.input, !!error ? classes.inputError : '')}
                          />
                        )}
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
