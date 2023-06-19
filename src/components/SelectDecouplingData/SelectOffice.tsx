import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { SingleSelectDecouplingData } from 'components/SelectDecouplingData/SingleSelectDecouplingData';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Office } from 'services/models/Office';
import { getOffices } from 'services/OfficesManager/Company/getOffices';
import { useStyles } from './styles';

export interface SelectOfficeProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  label: string;
  office?: Office;
  onChange: (office: Office | undefined) => void;
}

export const SelectOffice = ({
  errors,
  messages,
  control,
  office,
  isRequired = false,
  isDisabled = false,
  onChange,
  label,
  filterKey,
}: SelectOfficeProps) => {
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
              value={office}
              isClearable={!isRequired}
              service={async () => {
                try {
                  const response = await getOffices({
                    page: 0,
                    searcher: {},
                    sorter: {},
                    isGetAll: true,
                  });
                  return response.data.hits;
                } catch {
                  return [];
                }
              }}
              transformToOption={model => ({
                key: model._id,
                label: model.title,
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
