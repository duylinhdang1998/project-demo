import { Box, InputLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { customStyles } from 'components/FilterTicket/customStyles';
import { HEIGHT, SelectDecouplingData } from 'components/SelectDecouplingData/SelectDecouplingData';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserRole } from 'services/models/UserRole';

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

export const labelOfRole: Record<UserRole, string> = {
  COMPANY_ADMIN: 'Admin',
  COMPANY_AGENT: 'Agent',
  PASSENGER: 'Client',
  COMPANY_DRIVER: 'Driver',
};

interface SelectRoleProps {
  errors: FieldErrors<any>;
  messages: Record<string, string>;
  control: Control<any, any>;
  role: UserRole;
  onChange: (role: UserRole | undefined) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
}

const ROLES: Array<{ role: UserRole }> = [{ role: 'COMPANY_AGENT' }, { role: 'COMPANY_ADMIN' }, { role: 'PASSENGER' }];
export const SelectRole = ({ errors, messages, control, role, isRequired = false, isDisabled = false, onChange }: SelectRoleProps) => {
  const { t } = useTranslation(['translation', 'staff']);
  const classes = useStyles();

  const error = errors['role'];
  const messageErr = messages['role'];

  return (
    <Controller
      control={control}
      name="role"
      rules={{
        required: {
          value: isRequired,
          message: t('error_required', { name: 'role' }),
        },
      }}
      render={() => {
        return (
          <Box>
            <InputLabel className={classes.label}>{t('staff:role')}</InputLabel>
            <SelectDecouplingData
              maxMenuHeight={HEIGHT * ROLES.length}
              isSearchable
              isDisabled={isDisabled}
              value={{ role }}
              isClearable={!isRequired}
              service={() => Promise.resolve<typeof ROLES>(ROLES)}
              transformToOption={model => ({
                value: model,
                label: labelOfRole[model.role],
              })}
              styles={customStyles as any}
              placeholder={t('staff:role')}
              onChange={selected => {
                onChange(selected?.role);
              }}
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
