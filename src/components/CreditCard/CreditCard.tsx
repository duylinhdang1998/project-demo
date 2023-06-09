import { Box, Checkbox, Divider, FormControlLabel, Grid, InputBase, InputLabel, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChangeEvent, FocusEvent, memo, useState } from 'react';
import Card, { CallbackArgument, Focused } from 'react-credit-cards';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import Button from 'components/Button/Button';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { SimpleField } from 'models/Field';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from 'utils/formatText';
import './styles.css';

interface Values {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  postal_code: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  label: {
    color: theme.palette.grey[200] + '!important',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
  },
}));

const fields: SimpleField[] = [
  { id: uuid(), label: 'card_number', type: 'text', required: true, placeholder: 'number' },
  { id: uuid(), label: 'card_name', type: 'text', required: true, placeholder: 'name' },
  { id: uuid(), label: 'card_valid', type: 'text', required: true, placeholder: 'expiry' },
  { id: uuid(), label: 'card_cvc', type: 'text', required: true, placeholder: 'cvc' },
  { id: uuid(), label: 'postal_code', type: 'text', required: true, placeholder: 'postal_code' },
];

function CreditCard() {
  const { t } = useTranslation(['account', 'translation']);
  const classes = useStyles();

  const [focused, setFocused] = useState('');
  const [creditValue, setCreditValue] = useState<Values>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    postal_code: '',
  });

  const navigate = useNavigate();

  const handleCallback = (type: CallbackArgument, isValid: boolean) => {
    console.log({ type, isValid });
    // console.log(getValues('number'));
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(event.target.name);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name: inputName } = event.target;
    if (inputName === 'number') {
      event.target.value = formatCreditCardNumber(event.target.value);
    } else if (inputName === 'expiry') {
      event.target.value = formatExpirationDate(event.target.value);
    } else if (inputName === 'cvc') {
      event.target.value = formatCVC(event.target.value);
    }
    setCreditValue(prev => ({
      ...prev,
      [inputName]: event.target.value,
    }));
  };

  const getPattern = (i: SimpleField) => {
    switch (i.placeholder) {
      case 'number':
        return `[\d| ]{16,22}`;
      case 'name':
        return '';
      case 'expiry':
        return `\d\d/\d\d`;
      case 'cvc':
        return `\d{3,4}`;
      default:
        return '';
    }
  };

  const handleClick = () => {
    toast(<ToastCustom type="success" text="Payment Pro version successfully!" />, {
      className: 'toast-success',
    });
    navigate('/account/subscription');
  };

  return (
    <Box>
      <Card
        number={creditValue.number}
        name={creditValue.name}
        expiry={creditValue.expiry}
        cvc={creditValue.cvc}
        focused={focused as Focused}
        callback={handleCallback}
      />
      <Box my="20px">
        <Grid container spacing={2}>
          {fields.map(i => (
            <Grid item xs={12} md={6} key={i.id}>
              <InputLabel htmlFor={i.placeholder} className={classes.label}>
                {t(`${i.label}`)}
              </InputLabel>
              <InputBase
                type="text"
                id={i.placeholder}
                name={i.placeholder}
                value={creditValue[i.placeholder as keyof Values]}
                onChange={handleChange}
                onFocus={handleFocus}
                fullWidth
                className={classes.input}
                inputProps={{
                  pattern: getPattern(i),
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" my="15px">
        <Typography variant="body2">{t('translation:subtotal')}</Typography>
        <Typography variant="body2">$150</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">{t('translation:saving')}</Typography>
        <Typography variant="body2" color="#33CC7F">
          -$81
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt="15px">
        <Typography fontWeight="bold">{t('translation:total_payment')}</Typography>
        <Typography fontWeight="bold">$69</Typography>
      </Stack>
      <Typography fontSize="12px" color="#868c93" mt="15px">
        All sales are charged in USD and all sales are final. You will be charged $69.00 USD immediately. You will be charged $69.00 USD every yearly
        thereafter while the subscription is active. Cancel any time.
      </Typography>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label={`${t('translation:save_this_card')}`}
        sx={{
          '.MuiFormControlLabel-label': {
            fontSize: '12px !important',
            color: '#1AA6EE',
          },
        }}
      />
      <Box my="15px">
        <Button sx={{ height: '40px', padding: '12px 14px' }} backgroundButton="#1AA6EE" onClick={handleClick}>
          {t('translation:process_payment')}
        </Button>
      </Box>
    </Box>
  );
}

export default memo(CreditCard);
