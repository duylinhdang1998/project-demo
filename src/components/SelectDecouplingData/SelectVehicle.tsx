import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Vehicle } from 'services/models/Vehicle';
import { getVehicles } from 'services/Vehicle/Company/getVehicles';
import { useStyles } from './styles';

export interface SelectVehicleProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  label: string;
  vehicle: Vehicle | null;
  onChange: (vehicle: Vehicle | undefined) => void;
}

export const SelectVehicle = ({
  errors,
  messages,
  control,
  vehicle,
  isRequired = false,
  isDisabled = false,
  onChange,
  label,
  filterKey,
}: SelectVehicleProps) => {
  const { t } = useTranslation(['translation', filterKey]);
  const classes = useStyles();

  const error = errors && errors[label];
  const messageErr = messages && messages[label];
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
            <InputLabel className={classes.label}>
              {labelTranslated} {isRequired && <span className={classes.error}>*</span>}
            </InputLabel>
            <SingleSelectDecouplingData
              isDisabled={isDisabled}
              isSearchable
              value={vehicle ?? undefined}
              isClearable={!isRequired}
              service={async () => {
                try {
                  const response = await getVehicles({
                    page: 0,
                    searcher: {},
                    sorter: {
                      brandModel: 'asc',
                    },
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
              placeholder={labelTranslated}
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
