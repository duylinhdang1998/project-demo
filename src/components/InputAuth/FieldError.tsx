import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { Typography } from '@mui/material';

interface Props {
  fieldMessage?: string;
  fieldValue?: any;
}

export const PASSWORD_VALID_PATTERN_MESSAGE = 'PASSWORD_VALID_PATTERN_MESSAGE';
export const FieldError: FC<Props> = ({ fieldMessage, fieldValue }) => {
  const classes = useStyles();
  const { t } = useTranslation(['translation']);

  if (fieldMessage === PASSWORD_VALID_PATTERN_MESSAGE) {
    return (
      <>
        {typeof fieldValue === 'string' && fieldValue.length < 8 && (
          <Typography component="p" className={classes.error} fontSize={12}>
            - {t('translation:password_must_at_lease_8_character')}
          </Typography>
        )}
        {typeof fieldValue === 'string' && fieldValue.search(/[0-9]/) < 0 && (
          <Typography component="p" className={classes.error} fontSize={12}>
            - {t('translation:password_must_at_lease_one_number_character')}
          </Typography>
        )}
        {typeof fieldValue === 'string' && fieldValue.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) < 0 && (
          <Typography component="p" className={classes.error} fontSize={12}>
            - {t('translation:password_must_at_lease_one_special_character')}
          </Typography>
        )}
        {typeof fieldValue === 'string' && fieldValue.search(/[a-z]/) < 0 && (
          <Typography component="p" className={classes.error} fontSize={12}>
            - {t('translation:password_must_at_lease_one_lowercase_letter')}
          </Typography>
        )}
        {typeof fieldValue === 'string' && fieldValue.search(/[A-Z]/) < 0 && (
          <Typography component="p" className={classes.error} fontSize={12}>
            - {t('translation:password_must_at_lease_one_uppercase_letter')}
          </Typography>
        )}
      </>
    );
  }
  return (
    <Typography component="p" className={classes.error} fontSize={12}>
      {fieldMessage}
    </Typography>
  );
};
