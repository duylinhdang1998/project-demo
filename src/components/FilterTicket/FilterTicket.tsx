import { Grid, GridProps, InputBase, InputBaseProps, InputLabel, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/css';
import { labelOfRole } from 'components/SelectDecouplingData/SelectRole';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Field } from 'models/Field';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select, { Props as SelectProps } from 'react-select';
import { getListDestinations } from 'services/Destinations/getListDestinations';
import { getOffices } from 'services/OfficesManager/Company/getOffices';
import { getPackageSettings } from 'services/PackageSetting/Company/getPackageSettings';
import { getVehicles } from 'services/Vehicle/Company/getVehicles';
import { UserRole } from 'services/models/UserRole';
import { disabledDate } from 'utils/disableDate';
import { customStyles } from './customStyles';
import { Result } from 'components/SelectDecouplingData/SelectDestination';
import { get, isEqual } from 'lodash-es';

export interface FilterTicketProps<T extends FieldValues> {
  fields?: Array<Field & { numberColumn?: number }>;
  inputProps?: InputBaseProps;
  selectProps?: SelectProps;
  filterKey?: string;
  control: Control<T>;
  numberColumns?: number;
  gap?: string | number;
  flexWrap?: GridProps['flexWrap'];
  errors?: any;
  alignItems?: GridProps['alignItems'];
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    fontSize: '14px !important',
    height: '40px',
    padding: '0 10px',
    '&:focus-visible': {
      outline: 'none',
    },
  },
  label: {
    color: theme.palette.grey[200],
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
  },
  select: {
    border: '1px solid #F7F7F7 !important',
    borderRadius: '4px',
    backgroundColor: '#fff',
    height: '40px',
    position: 'relative',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingRight: '6px',
  },
  datePicker: {
    width: '100%',
    height: '40px',
    border: '1px solid #f7f7f7 !important',
  },
}));

export default function FilterTicket<T extends FieldValues>({
  fields,
  inputProps,
  selectProps,
  filterKey,
  control,
  numberColumns = 2,
  gap = '24px',
  flexWrap = 'wrap',
  errors,
  alignItems = 'flex-end',
}: FilterTicketProps<T>) {
  const classes = useStyles();
  const { t } = useTranslation([filterKey, 'translation']);

  const renderErrors = (label: string) => {
    if (!errors?.[label]) {
      return <div />;
    }
    return (
      <div style={{ marginTop: 5 }}>
        {!!errors?.[label] ? (
          <span style={{ color: '#FF2727', fontSize: 12 }}>
            {t(`translation:${get(errors, `${label}.message`, '')}`, {
              name: t(label).toLowerCase(),
            })}
          </span>
        ) : null}
      </div>
    );
  };

  const renderUIFields = (i: Field) => {
    switch (i.type) {
      case 'text':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>
                    {t(`${i.label}`)} {i.required ? <span style={{ color: '#FF2727' }}>*</span> : null}{' '}
                  </InputLabel>
                  <InputBase fullWidth {...inputProps} {...field} placeholder={t(`${i.label}`)} className={classes.input} />
                </Box>
              );
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
                  options={i.options}
                  styles={customStyles}
                  placeholder={t(`${i.label}`)}
                  isClearable={i.isClearable}
                />
              </Box>
            )}
          />
        );
      case 'datetime':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            rules={{
              required: {
                value: !!i.required,
                message: t('error_required', { type: t(`${i.label}`).toLowerCase() }),
              },
            }}
            render={({ field }) => (
              <Box>
                <InputLabel className={classes.label}>
                  {t(`${i.label}`)} {i.required ? <span style={{ color: '#FF2727' }}>*</span> : null}
                </InputLabel>
                <DatePicker
                  showTime={i.showTime}
                  format={i.format}
                  picker={i.picker}
                  value={field.value as any}
                  onChange={field.onChange}
                  className={classes.datePicker}
                  disabledDate={disabledDate as any}
                />
                {renderErrors(i.label)}
              </Box>
            )}
          />
        );
      case 'country':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => (
              <Box>
                <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                <SingleSelectDecouplingData
                  value={field.value}
                  service={async () => {
                    try {
                      const response = await getListDestinations({ page: 0, searcher: {}, sorter: {}, isGetAll: true });
                      return response.data.hits;
                    } catch {
                      return [];
                    }
                  }}
                  transformToOption={model => ({
                    key: model._id,
                    label: model.title,
                    value: model,
                  })}
                  equalFunc={(model, value) => model._id === value?._id}
                  onChange={field.onChange}
                  isClearable
                  styles={customStyles as any}
                />
              </Box>
            )}
          />
        );
      case 'office':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <SingleSelectDecouplingData
                    isClearable
                    isSearchable
                    value={field.value}
                    service={async () => {
                      try {
                        const response = await getOffices({
                          page: 0,
                          searcher: {},
                          sorter: {},
                          isGetAll: true,
                        });
                        return response.data.hits;
                      } catch {
                        return [];
                      }
                    }}
                    transformToOption={model => ({
                      key: model._id,
                      label: model.title,
                      value: model,
                    })}
                    equalFunc={(model, value) => model._id === value?._id}
                    styles={customStyles as any}
                    placeholder={t(`${i.label}`)}
                    onChange={field.onChange}
                  />
                </Box>
              );
            }}
          />
        );
      case 'role':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <SingleSelectDecouplingData
                    isClearable
                    isSearchable
                    value={field.value}
                    service={() => {
                      return Promise.resolve<Array<{ role: UserRole }>>([
                        { role: 'COMPANY_AGENT' },
                        { role: 'COMPANY_ADMIN' },
                        { role: 'PASSENGER' },
                      ]);
                    }}
                    transformToOption={model => ({
                      value: model,
                      label: labelOfRole[model.role],
                    })}
                    equalFunc={(model, value) => model.role === value?.role}
                    styles={customStyles as any}
                    placeholder={t(`${i.label}`)}
                    onChange={field.onChange}
                  />
                </Box>
              );
            }}
          />
        );
      case 'departurePoint':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            rules={{
              required: {
                value: !!i.required,
                message: t('error_required', { type: t(`${i.label}`).toLowerCase() }),
              },
            }}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>
                    {t(`${i.label}`)} {i.required ? <span style={{ color: '#FF2727' }}>*</span> : null}
                  </InputLabel>
                  <SingleSelectDecouplingData
                    isClearable
                    isSearchable
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
                    value={field.value}
                    styles={customStyles as any}
                    placeholder={t(`${i.label}`)}
                    onChange={field.onChange}
                  />
                  {renderErrors(i.label)}
                </Box>
              );
            }}
          />
        );
      case 'arrivalPoint':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            rules={{
              required: {
                value: !!i.required,
                message: t('error_required', { type: t(`${i.label}`).toLowerCase() }),
              },
            }}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>
                    {t(`${i.label}`)} {i.required ? <span style={{ color: '#FF2727' }}>*</span> : null}
                  </InputLabel>
                  <SingleSelectDecouplingData
                    isClearable
                    isSearchable
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
                    value={field.value}
                    styles={customStyles as any}
                    placeholder={t(`${i.label}`)}
                    onChange={field.onChange}
                  />
                  {renderErrors(i.label)}
                </Box>
              );
            }}
          />
        );
      case 'vehicle':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <SingleSelectDecouplingData
                    isClearable
                    isSearchable
                    value={field.value}
                    service={async () => {
                      try {
                        const response = await getVehicles({
                          page: 0,
                          searcher: {},
                          sorter: {},
                          isGetAll: true,
                        });
                        return response.data.hits;
                      } catch {
                        return [];
                      }
                    }}
                    transformToOption={model => ({
                      key: model._id,
                      label: model.brandModel,
                      value: model,
                    })}
                    equalFunc={(model, input) => model._id === input?._id}
                    styles={customStyles as any}
                    placeholder={t(`${i.label}`)}
                    onChange={field.onChange}
                  />
                </Box>
              );
            }}
          />
        );
      case 'date_range':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                  <DatePicker.RangePicker
                    allowClear
                    inputReadOnly
                    showTime={i.showTime}
                    format={i.format}
                    picker={i.picker}
                    value={field.value as any}
                    onChange={field.onChange}
                    className={classes.datePicker}
                    disabledDate={disabledDate as any}
                  />
                </Box>
              );
            }}
          />
        );
      case 'packageSettings':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            rules={{
              required: {
                value: !!i.required,
                message: t('error_required', { type: t(`${i.label}`).toLowerCase() }),
              },
            }}
            render={({ field }) => {
              return (
                <Box>
                  <InputLabel className={classes.label}>
                    {t(`${i.label}`)} {i.required ? <span style={{ color: '#FF2727' }}>*</span> : null}
                  </InputLabel>
                  <SingleSelectDecouplingData
                    isClearable
                    isSearchable
                    service={async () => {
                      try {
                        const response = await getPackageSettings({ isGetAll: true, page: 0, searcher: {}, sorter: {} });
                        return response.data.hits.map(item => ({ value: item._id, label: item.title }));
                      } catch {
                        return [];
                      }
                    }}
                    transformToOption={model => ({
                      key: model.value,
                      label: model.label,
                      value: model,
                    })}
                    equalFunc={isEqual}
                    value={field.value}
                    styles={customStyles as any}
                    placeholder={t(`${i.label}`)}
                    onChange={field.onChange}
                  />
                  {renderErrors(i.label)}
                </Box>
              );
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box className="filter-ticket" width="100%">
      <Grid container alignItems={alignItems} spacing={gap} columns={10} flexWrap={flexWrap}>
        {fields?.map(i => (
          <Grid key={i.id} item xs={10} sm={5} md={i.numberColumn ? i.numberColumn : numberColumns}>
            {renderUIFields(i)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
