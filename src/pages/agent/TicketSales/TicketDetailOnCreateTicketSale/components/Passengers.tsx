import { Box, Dialog, Grid, InputBase, InputLabel, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import AddIcon from '@mui/icons-material/Add';
import TrashSvg from 'assets/images/trash.svg';
import Button2 from 'components/Button/Button';
import { customStyles } from 'components/FilterTicket/customStyles';
import { useStyles } from 'components/FormVerticle/styles';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { get } from 'lodash';
import { useState } from 'react';
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { Passenger, TicketDetailFormValues } from '../TicketDetailOnCreateTicketSale';

export interface PassengersProps {
  control: Control<TicketDetailFormValues>;
  errors: FieldErrors<TicketDetailFormValues>;
  passengers: FieldArrayWithId<TicketDetailFormValues['passengers']>[];
  append: UseFieldArrayAppend<TicketDetailFormValues, 'passengers'>;
  remove: UseFieldArrayRemove;
}

const options: Array<Passenger['ticketType']> = [
  { key: 'adult', value: 'ADULT', label: 'Adult (26-59)' },
  { key: 'student', value: 'STUDENT', label: 'Student (16-25)' },
  { key: 'children', value: 'CHILD', label: 'Children (1-15)' },
];
const emptyPassenger: Passenger = {
  firstName: '',
  lastName: '',
  ticketType: options.find(option => option.value === 'ADULT') as Passenger['ticketType'],
};

export const Passengers = ({ control, errors, passengers, append, remove }: PassengersProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['ticketSales', 'translation']);

  const [openDeletePassenger, setOpenDeletePassenger] = useState<number | null>(null);

  const handleOpenDialogDelete = (index: number) => {
    setOpenDeletePassenger(index);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeletePassenger(null);
  };

  const renderDialogDelete = () => {
    if (openDeletePassenger === null) {
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
            <Button2
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                remove(openDeletePassenger);
                handleCloseDialogDelete();
              }}
            >
              {t('translation:delete')}
            </Button2>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  return (
    <>
      {passengers.map((f, index) => {
        const firstNamePathInFormValues: `passengers.${number}.firstName` = `passengers.${index}.firstName`;
        const lastNamePathInFormValues: `passengers.${number}.lastName` = `passengers.${index}.lastName`;
        const ticketTypePathInFormValues: `passengers.${number}.ticketType` = `passengers.${index}.ticketType`;
        return (
          <Box key={f.id} borderTop="1px dashed #ddd" py="24px">
            <Stack direction="row" alignItems="center" justifyContent="space-between" my="10px">
              <Typography fontSize={14} fontWeight={700}>
                {t('ticketSales:passenger')} {index + 1}
              </Typography>
              <TextWithIcon icon={TrashSvg} text={t('translation:delete')} color="#FF2727" onClick={() => handleOpenDialogDelete(index)} />
            </Stack>
            <Box my="10px">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name={firstNamePathInFormValues}
                    rules={{ required: { value: true, message: '' } }}
                    render={({ field }) => {
                      const labelTranslated = t('ticketSales:firstName');
                      const error = get(errors, firstNamePathInFormValues);
                      const messageErr = t('translation:error_required', { name: labelTranslated });
                      return (
                        <Box>
                          <InputLabel className={classes.label}>
                            {labelTranslated}
                            <span style={{ marginLeft: '2px', color: '#FF2727' }}>*</span>
                          </InputLabel>
                          <InputBase {...field} fullWidth placeholder={labelTranslated} className={classes.input} error={!!error} />
                          {!!error && (
                            <Typography component="p" className={classes.error} fontSize={12}>
                              {messageErr}
                            </Typography>
                          )}
                        </Box>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name={lastNamePathInFormValues}
                    rules={{ required: { value: true, message: '' } }}
                    render={({ field }) => {
                      const labelTranslated = t('ticketSales:lastName');
                      const error = get(errors, lastNamePathInFormValues);
                      const messageErr = t('translation:error_required', { name: labelTranslated });
                      return (
                        <Box>
                          <InputLabel className={classes.label}>
                            {labelTranslated}
                            <span style={{ marginLeft: '2px', color: '#FF2727' }}>*</span>
                          </InputLabel>
                          <InputBase {...field} fullWidth placeholder={labelTranslated} className={classes.input} error={!!error} />
                          {!!error && (
                            <Typography component="p" className={classes.error} fontSize={12}>
                              {messageErr}
                            </Typography>
                          )}
                        </Box>
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name={ticketTypePathInFormValues}
                    rules={{ required: { value: true, message: '' } }}
                    render={({ field }) => {
                      const labelTranslated = t('ticketSales:ticketType');
                      const error = get(errors, ticketTypePathInFormValues);
                      const messageErr = t('translation:error_required', { name: labelTranslated });
                      return (
                        <Box>
                          <InputLabel className={classes.label}>{labelTranslated}</InputLabel>
                          <Select {...field} options={options} styles={customStyles} placeholder={labelTranslated} />
                          {!!error && (
                            <Typography component="p" className={classes.error} fontSize={12}>
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
          </Box>
        );
      })}
      <Button
        variant="outlined"
        fullWidth
        sx={{
          border: '1px solid #1AA6EE',
          borderStyle: 'dashed !important',
          color: '#1AA6EE',
          backgroundColor: 'transparent !important',
          '&:hover': {
            color: '#1AA6EE !important',
          },
          marginTop: '10px !important',
        }}
        startIcon={<AddIcon sx={{ color: '#1AA6EE' }} />}
        onClick={() => append(emptyPassenger)}
      >
        {t('ticketSales:add_new_passenger')}
      </Button>
      {renderDialogDelete()}
    </>
  );
};
