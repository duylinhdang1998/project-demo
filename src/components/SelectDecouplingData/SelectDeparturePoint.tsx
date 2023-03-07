import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Route } from 'services/models/Route';
import { getListDepartures } from 'services/Route/Company/getListDepartures';
import { useStyles } from './styles';

export interface SelectDeparturePointProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  departurePoint: Route['departurePoint'];
  onChange: (departurePoint: Route['departurePoint'] | undefined) => void;
  label: string;
}

export const SelectDeparturePoint = ({
  errors,
  messages,
  control,
  isRequired = false,
  isDisabled = false,
  departurePoint,
  onChange,
  label,
  filterKey,
}: SelectDeparturePointProps) => {
  const { t } = useTranslation(['translation', filterKey]);
  const classes = useStyles();

  const error = errors && errors['departurePoint'];
  const messageErr = messages && messages['departurePoint'];

  const labelTranslated = filterKey ? t(`${filterKey}:${label}`) : t(label);

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
            <InputLabel className={classes.label}>{labelTranslated}</InputLabel>
            <SingleSelectDecouplingData
              isDisabled={isDisabled}
              isSearchable
              value={{ value: departurePoint }}
              isClearable={!isRequired}
              service={async () => {
                const response = await getListDepartures({});
                return response.data.map(item => ({ value: item }));
              }}
              transformToOption={model => ({
                key: model.value,
                label: model.value,
                value: model,
              })}
              styles={customStyles as any}
              placeholder={labelTranslated}
              onChange={selected => onChange(selected?.value)}
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
