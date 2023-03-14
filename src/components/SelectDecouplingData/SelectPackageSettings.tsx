import { Box, InputLabel, Typography } from '@mui/material';
import { customStyles } from 'components/FilterTicket/customStyles';
import { Control, Controller, FieldErrors, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PackageSetting } from 'services/models/PackageSetting';
import { getPackageSettings } from 'services/PackageSetting/Company/getPackageSettings';
import { MultipleSelectDecouplingData } from './MultipleSelectDecouplingData';
import { useStyles } from './styles';

export interface SelectPackageSettingsProps {
  errors?: FieldErrors<any>;
  messages?: Record<string, string>;
  control?: Control<any, any>;
  isRequired?: boolean;
  isDisabled?: boolean;
  filterKey?: string;
  label: string;
  packageSettings: PackageSetting[];
  onChange: (packageSettings: PackageSetting[]) => void;
}

export const SelectPackageSettings = ({
  errors,
  messages,
  control,
  packageSettings,
  isRequired = false,
  isDisabled = false,
  onChange,
  label,
  filterKey,
}: SelectPackageSettingsProps) => {
  const { t } = useTranslation(['translation', filterKey]);
  const classes = useStyles();

  const error = errors && errors['packageSetting'];
  const messageErr = messages && messages['packageSetting'];

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
            <MultipleSelectDecouplingData
              isDisabled={isDisabled}
              isSearchable
              isClearable={!isRequired}
              service={async () => {
                try {
                  const response = await getPackageSettings({
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
              styles={customStyles as any}
              placeholder={labelTranslated}
              onChange={selected => onChange(selected)}
              values={packageSettings}
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
