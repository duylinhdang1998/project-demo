import { Grid, InputBase, InputBaseProps, InputLabel, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/css';
import { Field } from 'models/Field';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select, { Props as SelectProps } from 'react-select';
import { customStyles } from './customStyles';

interface FilterTicketProps<T extends FieldValues> {
  fields?: Field[];
  inputProps?: InputBaseProps;
  selectProps?: SelectProps;
  filterKey?: string;
  control: Control<T>;
  numberColumns?: number;
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
}: FilterTicketProps<T>) {
  const classes = useStyles();
  const { t } = useTranslation(filterKey);
  const renderUIFields = (i: Field) => {
    switch (i.type) {
      case 'text':
        return (
          <Controller
            name={i.label as Path<T>}
            control={control}
            render={({ field }) => (
              <Box>
                <InputLabel className={classes.label}>
                  {t(`${i.label}`)} {i.required ? <span style={{ color: '#FF2727' }}>*</span> : null}{' '}
                </InputLabel>
                <InputBase fullWidth {...inputProps} {...field} placeholder={t(`${i.label}`)} className={classes.input} />
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
      case 'datetime':
        return (
          <Controller
            control={control}
            name={i.label as Path<T>}
            render={({ field }) => (
              <Box>
                <InputLabel className={classes.label}>{t(`${i.label}`)}</InputLabel>
                <DatePicker value={field.value as any} onChange={field.onChange} className={classes.datePicker} />
              </Box>
            )}
          />
        );
      // case 'country':
      //   return (
      //     <SelectCountryFilter
      //       selectProps={selectProps}
      //       formProps={{
      //         control: control as any,
      //         name: i.label ?? '',
      //       }}
      //       label={i.label}
      //     />
      //   );
      default:
        return null;
    }
  };

  return (
    <Box className="filter-ticket" width="100%">
      <Grid container spacing="24px" columns={10}>
        {fields?.map(i => (
          <Grid key={i.id} item xs={10} sm={5} md={numberColumns}>
            {renderUIFields(i)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
