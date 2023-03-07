import { Checkbox, FormControlLabel, Grid, InputBase, InputBaseProps, InputLabel, Stack, TextareaAutosize, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/css';
import cx from 'classnames';
import { CheckboxGroup } from 'components/CheckboxGroup/CheckboxGroup';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SelectArrivalPoint } from 'components/SelectDecouplingData/SelectArrivalPoint';
import { SelectDeparturePoint } from 'components/SelectDecouplingData/SelectDeparturePoint';
import { SelectOffice } from 'components/SelectDecouplingData/SelectOffice';
import { SelectPackageSetting } from 'components/SelectDecouplingData/SelectPackageSettings';
import { SelectRole } from 'components/SelectDecouplingData/SelectRole';
import { SelectVehicle } from 'components/SelectDecouplingData/SelectVehicle';
import { UploadImageResource } from 'components/UploadImageResource/UploadImageResource';
import { UploadPDFResource } from 'components/UploadImageResource/UploadPDFResource';
import { Field, SelectField } from 'models/Field';
import { equals } from 'ramda';
import { Controller, FieldErrors, FieldValues, Path, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select, { Props as SelectProps } from 'react-select';
import { useStyles } from './styles';

export interface FormVerticleProps<T extends FieldValues> extends Partial<UseControllerProps<T>> {
  fields?: Field[];
  inputProps?: InputBaseProps;
  filterKey?: string;
  grid?: boolean;
  selectProps?: SelectProps;
  isGridHorizon?: boolean;
  indexGridHorizon?: number;
  errors?: FieldErrors<T>;
  messages?: Record<string, string>;
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
  errors,
  messages,
}: FormVerticleProps<T>) {
  const classes = useStyles();
  const { t } = useTranslation(filterKey);
  const renderField = (i: Field) => {
    const error = errors && i.label ? errors[i.label] : false;
    const messageErr = messages && i.label ? messages[i.label] : '';
    switch (i.type) {
      case 'text':
      case 'email':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel htmlFor={i.label} className={classes.label}>
                    {t(`${i.label}`)}
                  </InputLabel>
                  <InputBase
                    fullWidth
                    id={i.label}
                    {...inputProps}
                    {...field}
                    placeholder={t(`${i.label}`)}
                    className={classes.input}
                    error={!!error}
                    disabled={i.disabled}
                  />
                  {!!error && (
                    <Typography component="p" className={classes.error} fontSize={12}>
                      {messageErr}
                    </Typography>
                  )}
                </Box>
              );
            }}
            rules={{
              required: {
                value: i.required ?? false,
                message: messageErr,
              },
              ...(i.type === 'email'
                ? {
                    pattern: {
                      value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: t('error_email'),
                    },
                  }
                : {}),
            }}
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
                <Box className={cx(classes.inputNumberWrap, !!error ? classes.inputError : '')}>
                  {!!i.prefix && <span className={classes.prefix}>{i.prefix}</span>}
                  <input {...field} disabled={i.disabled} id={i.label} min={0} type="number" className={classes.inputNumber} />
                </Box>
                {!!error && (
                  <Typography component="p" className={classes.error} fontSize={12}>
                    {messageErr}
                  </Typography>
                )}
              </Box>
            )}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
          />
        );
      }
      case 'checkbox': {
        return (
          <>
            <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              {i.options?.map(c => (
                <Controller
                  key={c.key}
                  name={i.label as Path<T>}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      disabled={i.disabled}
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
                  rules={{
                    required: {
                      value: i.required ?? false,
                      message: t('error_required', { name: i.label }),
                    },
                  }}
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
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <UploadImageResource multiple={false} resources={[]} onChange={field.onChange} />
                </Box>
              );
            }}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
          />
        );
      case 'image_resource':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={() => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <UploadImageResource
                    className={!!error ? classes.inputError : ''}
                    multiple={i.multiple}
                    resources={i.resources}
                    disabled={i.disabled}
                    onChange={i.onChange}
                  />
                  {!!error && (
                    <Typography component="p" className={classes.error} fontSize={12}>
                      {messageErr}
                    </Typography>
                  )}
                </Box>
              );
            }}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
          />
        );
      case 'pdf_resource':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={() => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <UploadPDFResource
                    className={!!error ? classes.inputError : ''}
                    multiple={i.multiple}
                    resources={i.resources}
                    disabled={i.disabled}
                    onChange={i.onChange}
                    buttonText={i.buttonText}
                  />
                  {!!error && (
                    <Typography component="p" className={classes.error} fontSize={12}>
                      {messageErr}
                    </Typography>
                  )}
                </Box>
              );
            }}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
          />
        );
      case 'checkbox2':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={() => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <CheckboxGroup options={i.options ?? []} onChange={i.onChange} values={i.values} equalsFunc={i.equalsFunc} />
                  {!!error && (
                    <Typography component="p" className={classes.error} fontSize={12}>
                      {messageErr}
                    </Typography>
                  )}
                </Box>
              );
            }}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
          />
        );
      case 'select2':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={() => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <Select
                    isSearchable
                    isDisabled={i.disabled}
                    className={!!error ? classes.inputError : ''}
                    onChange={selected => {
                      const selected_ = selected as SelectField['options'][number];
                      i.onChange(selected_.value);
                    }}
                    onMenuScrollToTop={i.onScrollEnd}
                    options={i.options}
                    styles={customStyles}
                    placeholder={t(`${i.label}`)}
                    value={i.options.find(option => equals(option.value, i.value))}
                    isLoading={i.isLoading}
                    isClearable
                  />
                  {!!error && (
                    <Typography component="p" className={classes.error} fontSize={12}>
                      {messageErr}
                    </Typography>
                  )}
                </Box>
              );
            }}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
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
                <DatePicker
                  disabled={i.disabled}
                  picker={i.picker}
                  showTime={i.showTime}
                  value={field.value as any}
                  onChange={field.onChange}
                  className={cx(classes.datePicker, !!error ? classes.inputError : '')}
                  format={i.format}
                />
                {!!error && (
                  <Typography component="p" className={classes.error} fontSize={12}>
                    {messageErr}
                  </Typography>
                )}
              </Box>
            )}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
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
                <Select
                  {...selectProps}
                  {...field}
                  isDisabled={i.disabled}
                  options={i.options}
                  styles={customStyles}
                  placeholder={t(`${i.label}`)}
                  className={cx(classes.datePicker, selectProps?.className ?? '', !!error ? classes.inputError : '')}
                />
                {!!error && (
                  <Typography component="p" className={classes.error} fontSize={12}>
                    {messageErr}
                  </Typography>
                )}
              </Box>
            )}
            rules={{
              required: {
                value: i.required ?? false,
                message: t('error_required', { name: i.label }),
              },
            }}
          />
        );
      case 'textarea':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel htmlFor={i.label} className={classes.label}>
                    {t(`${i.label}`)}
                  </InputLabel>
                  <TextareaAutosize
                    disabled={i.disabled}
                    minRows={10}
                    maxRows={10}
                    id={i.label}
                    {...field}
                    placeholder={t(`${i.label}`)}
                    className={cx(classes.inputArea, !!error ? classes.inputError : '')}
                  />
                  {!!error && (
                    <Typography component="p" className={classes.error} fontSize={12}>
                      {messageErr}
                    </Typography>
                  )}
                </Box>
              );
            }}
            rules={{
              required: {
                value: i.required ?? false,
                message: messageErr,
              },
            }}
          />
        );
      case 'controlSelectVehicle':
        return (
          <SelectVehicle
            onChange={i.onChange}
            control={control}
            errors={errors}
            messages={messages}
            vehicle={i.vehicle}
            isDisabled={i.disabled}
            isRequired={i.required}
            label={i.label}
            filterKey={filterKey}
          />
        );
      case 'controlSelectDeparturePoint':
        return (
          <SelectDeparturePoint
            control={control}
            errors={errors}
            messages={messages}
            isDisabled={i.disabled}
            isRequired={i.required}
            departurePoint={i.departurePoint}
            onChange={i.onChange}
            label={i.label}
            filterKey={filterKey}
          />
        );
      case 'controlSelectArrivalPoint':
        return (
          <SelectArrivalPoint
            control={control}
            errors={errors}
            messages={messages}
            isDisabled={i.disabled}
            isRequired={i.required}
            arrivalPoint={i.arrivalPoint}
            onChange={i.onChange}
            label={i.label}
            filterKey={filterKey}
          />
        );
      case 'controlSelectRole':
        return (
          <SelectRole
            control={control}
            errors={errors}
            messages={messages}
            isDisabled={i.disabled}
            isRequired={i.required}
            role={i.role}
            onChange={i.onChange}
            label={i.label}
            filterKey={filterKey}
          />
        );
      case 'controlSelectOffice':
        return (
          <SelectOffice
            control={control}
            errors={errors}
            messages={messages}
            isDisabled={i.disabled}
            isRequired={i.required}
            office={i.office}
            onChange={i.onChange}
            label={i.label}
            filterKey={filterKey}
          />
        );
      case 'controlSelectPackageSetting':
        return (
          <SelectPackageSetting
            control={control}
            errors={errors}
            messages={messages}
            isDisabled={i.disabled}
            isRequired={i.required}
            packageSettings={i.packageSettings}
            onChange={i.onChange}
            label={i.label}
            filterKey={filterKey}
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
      {fields?.map(item => (
        <Box my="16px" key={item.id} border="1px solid transparent">
          {renderField(item)}
        </Box>
      ))}
    </div>
  );
}
