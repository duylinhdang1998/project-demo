import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getListDestinations } from 'services/Destinations/getListDestinations';
import { Destination } from 'services/models/Destination';
import { useStyles } from './styles';

export interface SelectDestinationProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  label: string;
  destination: Destination['title'];
  onChange: (destination: Destination['title']) => void;
}

export const SelectDestination = ({
  errors,
  messages,
  control,
  destination,
  isRequired = false,
  isDisabled = false,
  onChange,
  label,
  filterKey,
}: SelectDestinationProps) => {
  const { t } = useTranslation(['translation', filterKey]);
  const classes = useStyles();

  const error = errors && errors['destination'];
  const messageErr = messages && messages['destination'];

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
              value={{ value: destination }}
              isClearable={!isRequired}
              service={async () => {
                const response = await getListDestinations({
                  page: 0,
                  searcher: {},
                  sorter: {},
                  isGetAll: true,
                });
                return response.data.hits.map(item => ({ value: item.title as string }));
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
