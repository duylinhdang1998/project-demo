import { Box, Grid, InputBase, InputLabel, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { customStyles } from 'components/FilterTicket/customStyles';
import { Controller, Path, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

interface Values {
  firstName: string;
  lastName: string;
  type_of_ticket: string;
}
interface FieldArrayValues {
  traveller: Values[];
}

const options = [
  { key: 'adult', value: 'adult', label: 'Adult (26-59)' },
  { key: 'children', value: 'children', label: 'Children(1-15)' },
];

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export default function FormTraveller() {
  const classes = useStyles();
  const { t } = useTranslation(['ticketSales', 'translation']);
  const { control } = useForm<FieldArrayValues>({
    defaultValues: {
      traveller: [{ firstName: '', lastName: '', type_of_ticket: '' }],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: 'traveller' as never,
  });

  const renderElement = (i: string) => {
    switch (i) {
      case 'type_of_ticket':
        return (
          <Grid item xs={12} md={4} key={i}>
            <Controller
              control={control}
              name={i as any}
              render={({ field }) => (
                <Box>
                  <InputLabel className={classes.label}>{t(`${i}`)}</InputLabel>
                  <Select {...field} options={options} styles={customStyles} placeholder={t(`${i}`)} />
                </Box>
              )}
            />
          </Grid>
        );
      case 'id':
        return null;
      default:
        return (
          <Grid item xs={12} md={4} key={i}>
            <Controller
              name={i as any}
              control={control}
              rules={{
                required: true,
              }}
              key={i}
              render={({ field }) => (
                <Box>
                  <InputLabel className={classes.label}>
                    {t(`${i}`)} <span style={{ color: '#FF2727' }}>*</span>
                  </InputLabel>
                  <InputBase fullWidth {...field} placeholder={t(`${i}`)} className={classes.input} />
                </Box>
              )}
            />
          </Grid>
        );
    }
  };
  return (
    <Box>
      {fields.map((f) => (
        <Grid key={f.id} container spacing={2}>
          {Object.keys(f).map((i) => renderElement(i as Path<Values>))}
        </Grid>
      ))}
    </Box>
  );
}
