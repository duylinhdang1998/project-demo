import { InputLabel, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import 'assets/icons/fontawesome/css/all.min.css';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    marginTop: '15px',
    border: '1px solid #e0e0e0',
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    transition: '.2s ease all',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    width: 32,
    height: 32,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  label: {
    fontSize: '14px !important',
    color: '#45485E',
    marginBottom: '4px',
  },
  inputSearch: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    padding: '12px 14px',
    height: '40px !important',
    fontSize: '14px !important',
  },
}));

function ListIcon() {
  const classes = useStyles();
  const { t } = useTranslation('serviceSetting');
  return (
    <Box my="24px">
      <InputLabel htmlFor="title" className={classes.label}>
        {t('icon')}
      </InputLabel>
    </Box>
  );
}

export default memo(ListIcon);
