import { Box, InputLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SelectDecouplingData } from 'components/SelectDecouplingData/SelectDecouplingData';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Office } from 'services/models/Office';
import { getOffices } from 'services/OfficesManager/Company/getOffices';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.grey[200] + '!important',
    textTransform: 'capitalize',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
    '&.MuiFormControlLabel-label': {
      fontSize: '14px !important',
    },
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
  },
  inputError: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
}));

interface SelectOfficeProps {
  errors: FieldErrors<any>;
  messages: Record<string, string>;
  control: Control<any, any>;
  office: Office;
  onChange: (office: Office | undefined) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export const SelectOffice = ({ errors, messages, control, office, isRequired = false, isDisabled = false, onChange }: SelectOfficeProps) => {
  const { t } = useTranslation(['translation', 'account']);
  const classes = useStyles();

  const error = errors['office'];
  const messageErr = messages['office'];

  return (
    <Controller
      control={control}
      name="office"
      rules={{
        required: {
          value: isRequired,
          message: t('error_required', { name: 'office' }),
        },
      }}
      render={() => {
        return (
          <Box>
            <InputLabel className={classes.label}>{t('account:Office')}</InputLabel>
            <SelectDecouplingData
              isDisabled={isDisabled}
              isSearchable
              value={office}
              isClearable={!isRequired}
              service={async () => {
                const response = await getOffices({
                  page: 0,
                  searcher: {},
                  sorter: {},
                  isGetAll: true,
                });
                return response.data.hits;
              }}
              transformToOption={model => ({
                key: model._id,
                label: model.title,
                value: model,
              })}
              styles={customStyles as any}
              placeholder={t('account:Office')}
              onChange={selected => onChange(selected)}
            />
            {!!error && (
              <Typography component="p" className={classes.error} fontSize={12}>
                {messageErr}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};
