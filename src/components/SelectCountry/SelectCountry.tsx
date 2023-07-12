import { Box } from '@mui/system';
import { memo } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LocationIcon from 'assets/images/location.svg';
import { useStyles } from './styles';

interface Values {
  email: string;
  password: string;
  country: string;
  terms: boolean;
}

interface SelectCountryProps extends ControllerRenderProps<Values, 'country'> {}

function SelectCountry({ value, onChange }: SelectCountryProps) {
  const classes = useStyles();
  const { t } = useTranslation();

  // const handleSelected = (code: string) => {
  //   setSelected(code);
  // };

  const placeholder = (
    <Box className={classes.placeholderWrapper}>
      <img src={LocationIcon} alt="location" className={classes.icon} />
      <span className={classes.placeholderText}>{t('auth:select_country')}</span>
    </Box>
  );

  return (
    <div>
      <p className={classes.label}>{t('auth:select_country')}</p>
      <ReactFlagsSelect
        selectButtonClassName={classes.selectBtn}
        selected={value}
        onSelect={onChange}
        showOptionLabel
        fullWidth
        placeholder={placeholder}
        searchable
      />
    </div>
  );
}

export default memo(SelectCountry);
