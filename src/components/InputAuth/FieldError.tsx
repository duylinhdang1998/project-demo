import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { Typography } from '@mui/material';

interface Props {
  fieldMessage?: string;
  fieldValue?: any;
}

export const PASSWORD_VALID_PATTERN_MESSAGE = 'PASSWORD_VALID_PATTERN_MESSAGE';
export const FieldError: FC<Props> = ({ fieldMessage }) => {
  const classes = useStyles();
  const { t } = useTranslation(['translation']);

  if (fieldMessage === PASSWORD_VALID_PATTERN_MESSAGE) {
    return (
      <Typography component="p" className={classes.error} fontSize={12}>
        {t('translation:password_is_not_strong')}
      </Typography>
    );
  }
  return (
    <Typography component="p" className={classes.error} fontSize={12}>
      {fieldMessage}
    </Typography>
  );
};
