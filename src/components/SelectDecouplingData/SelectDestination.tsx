import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getListDestinations } from 'services/Destinations/getListDestinations';
import { Destination } from 'services/models/Destination';
import { useStyles } from './styles';
import { isEqual } from 'lodash-es';

export interface Result {
  _id: Destination['_id'];
  title: Destination['title'];
}

export interface SelectDestinationProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  label: string;
  destination: Result;
  onChange: (destination?: Result) => void;
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
              value={{ value: destination }}
              isClearable={!isRequired}
              service={async () => {
                try {
                  const response = await getListDestinations({
                    page: 0,
                    searcher: {},
                    sorter: {},
                    isGetAll: true,
                  });
                  return response.data.hits.map(item => ({
                    value: {
                      _id: item._id as string,
                      title: item.title as string,
                    },
                  }));
                } catch {
                  return [];
                }
              }}
              transformToOption={model => ({
                key: model.value._id,
                label: model.value.title,
                value: model,
              })}
              equalFunc={isEqual}
              styles={customStyles as any}
              placeholder={labelTranslated}
              onChange={selected => {
                onChange(selected?.value);
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
