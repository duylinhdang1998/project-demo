import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserRole } from 'services/models/UserRole';
import { useStyles } from './styles';
import { useMemo } from 'react';
import { TFunction } from 'i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectAuth } from 'store/auth/selectors';
import { UserRole as EUserRole } from 'utils/constant';

export const getLabelOfRole = (t: TFunction): Record<UserRole, string> => {
  return {
    COMPANY_ADMIN: t('translation:COMPANY_ADMIN'),
    COMPANY_AGENT: t('translation:COMPANY_AGENT'),
    PASSENGER: t('translation:PASSENGER'),
    COMPANY_DRIVER: t('translation:COMPANY_DRIVER'),
  };
};

export interface SelectRoleProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  label: string;
  role: UserRole;
  onChange: (role: UserRole | undefined) => void;
  isForFilter: boolean;
}

export const SelectRole = ({
  errors,
  messages,
  control,
  role,
  isRequired = false,
  isDisabled = false,
  onChange,
  label,
  filterKey,
  isForFilter,
}: SelectRoleProps) => {
  const { t } = useTranslation(['translation', filterKey]);

  const labelOfRole = useMemo(() => getLabelOfRole(t), [t]);

  const classes = useStyles();

  const error = errors && errors[label];
  const messageErr = messages && messages[label];

  const labelTranslated = filterKey ? t(`${filterKey}:${label}`) : t(label);

  const { userInfo } = useAppSelector(selectAuth);
  const isAgent = userInfo?.role === EUserRole.AGENT;

  const ROLES: Array<{ role: UserRole }> = useMemo(() => {
    if (isForFilter) {
      return [{ role: 'COMPANY_ADMIN' }, { role: 'COMPANY_AGENT' }, { role: 'COMPANY_DRIVER' }];
    }
    return isAgent ? [{ role: 'COMPANY_AGENT' }, { role: 'COMPANY_DRIVER' }] : [{ role: 'COMPANY_AGENT' }];
  }, [isAgent, isForFilter]);

  return (
    <Controller
      control={control}
      name={label as Path<any>}
      rules={{
        required: {
          value: isRequired,
          message: t('error_required', { name: labelTranslated }),
        },
      }}
      render={() => {
        return (
          <Box>
            <InputLabel className={classes.label}>
              {labelTranslated} {isRequired && <span className={classes.error}>*</span>}
            </InputLabel>
            <SingleSelectDecouplingData
              isSearchable
              isDisabled={isDisabled}
              value={{ role }}
              isClearable={!isRequired}
              service={() => Promise.resolve<typeof ROLES>(ROLES)}
              transformToOption={model => ({
                value: model,
                label: labelOfRole[model.role],
              })}
              equalFunc={(model, input) => model.role === input?.role}
              styles={customStyles as any}
              placeholder={labelTranslated}
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
