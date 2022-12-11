import { Checkbox, FormControlLabel, Grid, InputBase, InputBaseProps, InputLabel, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/css';
import { customStyles } from 'components/FilterTicket/customStyles';
import UploadImage from 'components/UploadImage/UploadImage';
import { Field } from 'models/Field';
import React from 'react';
import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select, { Props as SelectProps } from 'react-select';
import { useStyles } from './styles';

export interface FormVerticleProps<T> extends Partial<UseControllerProps<T>> {
  fields?: Field[];
  inputProps?: InputBaseProps;
  filterKey?: string;
  grid?: boolean;
  selectProps?: SelectProps;
  isGridHorizon?: boolean;
  indexGridHorizon?: number;
}

export default function FormVerticle<T extends FieldValues>({
  fields,
  control,
  inputProps,
  filterKey,
  grid,
  selectProps,
  isGridHorizon,
  indexGridHorizon = 0,
}: FormVerticleProps<T>) {
  const classes = useStyles();
  const { t } = useTranslation(filterKey);
  const renderField = (i: Field) => {
    switch (i.type) {
      case 'text':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor={i.label} className={classes.label}>
                  {t(`${i.label}`)}
                </InputLabel>
                <InputBase fullWidth id={i.label} {...inputProps} {...field} placeholder={t(`${i.label}`)} className={classes.input} />
              </Box>
            )}
          />
        );
      case 'number': {
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel htmlFor={i.label} className={classes.label}>
                  {t(`${i.label}`)}
                </InputLabel>
                <Box className={classes.inputNumberWrap}>
                  {!!i.prefix && <span className={classes.prefix}>{i.prefix}</span>}
                  <input {...field} id={i.label} min={0} defaultValue={1} type="number" className={classes.inputNumber} />
                </Box>
              </Box>
            )}
          />
        );
      }
      case 'checkbox': {
        return (
          <>
            <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              {i.options?.map((c) => (
                <Controller
                  key={c.key}
                  name={i.label as Path<T>}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      className={classes.label}
                      control={<Checkbox onChange={field.onChange} value={c.value} />}
                      label={c.label}
                      sx={{
                        '.MuiFormControlLabel-label': {
                          fontSize: '14px !important',
                          fontWeight: '400 !important',
                        },
                      }}
                    />
                  )}
                />
              ))}
            </Stack>
          </>
        );
      }
      case 'image':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                <UploadImage />
              </Box>
            )}
          />
        );
      case 'datetime':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => (
              <Box>
                <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                <DatePicker showTime={i.showTime} value={field.value as any} onChange={field.onChange} className={classes.datePicker} />
              </Box>
            )}
          />
        );
      case 'select':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => (
              <Box>
                <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                <Select {...selectProps} {...field} options={i.options} styles={customStyles} placeholder={t(`${i.label}`)} />
              </Box>
            )}
          />
        );
      default:
        return null;
    }
  };
  if (grid) {
    return (
      <Grid container spacing={2}>
        {fields?.map((item, index) => (
          <Grid key={item.id} item xs={12} sm={isGridHorizon ? (index === indexGridHorizon ? 12 : 6) : 6}>
            {renderField(item)}
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <div>
      {fields?.map((item) => (
        <Box my="16px" key={item.id} border="1px solid transparent">
          {renderField(item)}
        </Box>
      ))}
    </div>
  );
}
