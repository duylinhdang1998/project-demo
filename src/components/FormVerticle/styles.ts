import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  input: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    fontSize: '14px !important',
    height: '40px',
    padding: '12px 14px',
    width: '100%',
    '&:focus-visible': {
      outline: 'none',
    },
    '&.Mui-error': {
      border: '1px solid' + theme.palette.error.main,
      transition: 'all 0.2s ease',
    },
  },
  label: {
    color: theme.palette.grey[200] + '!important',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
    '&.MuiFormControlLabel-label': {
      fontSize: '14px !important',
    },
  },
  select: {
    border: '1px solid #F7F7F7 !important',
    borderRadius: '4px',
    backgroundColor: '#fff',
    height: '40px',
    position: 'relative',
  },
  inputNumber: {
    width: '100%',
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    '&.ant-input-number': {
      height: '40px',
    },
    '& .ant-input-number-input-wrap': {
      height: '100% !important',
    },
    '& .ant-input-number-input-wrap input': {
      height: '100% !important',
    },
  },
  datePicker: {
    width: '100%',
    height: '40px',
    border: '1px solid #f7f7f7 !important',
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
  },
  inputArea: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    fontSize: '14px !important',
    width: '100%',
    padding: '12px 14px',
    '&:focus-visible': {
      outline: 'none !important',
    },
  },
  inputError: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
}));
