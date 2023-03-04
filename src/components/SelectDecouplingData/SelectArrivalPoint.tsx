import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SelectDecouplingData } from 'components/SelectDecouplingData/SelectDecouplingData';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StopPoint } from 'services/models/Route';
import { getListArrivals } from 'services/Route/Company/getListArrivals';
import { useStyles } from './styles';

export interface SelectArrivalPointProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  arrivalPoint: StopPoint['stopPoint'];
  onChange: (arrivalPoint: StopPoint['stopPoint'] | undefined) => void;
  label: string;
}

export const SelectArrivalPoint = ({
  errors,
  messages,
  control,
  isRequired = false,
  isDisabled = false,
  arrivalPoint,
  onChange,
  label,
  filterKey,
}: SelectArrivalPointProps) => {
  const { t } = useTranslation(['translation', filterKey]);
  const classes = useStyles();

  const error = errors && errors['arrivalPoint'];
  const messageErr = messages && messages['arrivalPoint'];

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
            <SelectDecouplingData
              isDisabled={isDisabled}
              isSearchable
              value={{ value: arrivalPoint }}
              isClearable={!isRequired}
              service={async () => {
                const response = await getListArrivals({});
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
