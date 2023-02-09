import { Box, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clxs from 'classnames';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import CreditCard from 'components/CreditCard/CreditCard';
import LayoutDetail from 'layout/LayoutDetail';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '0.5px solid #D7DADC',
    borderRadius: 4,
    width: '100%',
    padding: '24px',
  },
  label: {
    display: 'block',
    width: '100%',
  },
  selected: {
    border: '2px solid #1AA6EE',
  },
}));

function SubscriptionPayment() {
  const { t } = useTranslation(['account', 'translation']);
  const classes = useStyles();
  const [selected, setSelected] = useState('month');
  const [method, setMethod] = useState('credit');
  const [] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const handleChange = (event: ChangeEvent<HTMLInputElement>, newValue: string) => {
    setSelected(newValue);
  };
  const handleChangeMethod = (event: ChangeEvent<HTMLInputElement>, newValue: string) => {
    setMethod(newValue);
  };
  const renderPaypalValue = () => {
    return (
      <Box my="10px">
        <Typography variant="body2" fontWeight={700}>
          Click the PayPal button to log in.
        </Typography>
        <Typography variant="body2">You'll be prompted for your PayPal account email and password through a secure PayPal login form.</Typography>
        <Button backgroundButton="#0A89CA" sx={{ fontStyle: 'italic', padding: '10px 18px' }}>
          Paypal
        </Button>
      </Box>
    );
  };

  const renderCreditValue = () => {
    return (
      <Box my="10px" display={method !== 'credit' ? 'none' : 'block'}>
        <CreditCard />
      </Box>
    );
  };
  return (
    <LayoutDetail title={t('subcription')}>
      <CardWhite title={t('subcribe_to_tbus_plan')}>
        <RadioGroup row name="subscription" defaultValue="month" onChange={handleChange}>
          <Stack direction="row" alignItems="center" spacing={3} width="100%">
            <label htmlFor="month" className={classes.label}>
              <Box className={clxs(classes.item, { [classes.selected]: selected === 'month' })}>
                <Box>
                  <Typography fontSize={14} color="#858C93">
                    {t('monthly_payment')}
                  </Typography>
                  <Typography fontSize="18px" fontWeight={700} color="#0C1132">
                    $12/month
                  </Typography>
                </Box>
                <Radio value="month" id="month" />
              </Box>
            </label>
            <label htmlFor="year" className={classes.label}>
              <Box className={clxs(classes.item, { [classes.selected]: selected === 'year' })}>
                <Box>
                  <Typography fontSize={14} color="#858C93">
                    {t('yearly_payment')}
                  </Typography>
                  <Typography fontSize="18px" fontWeight={700} color="#0C1132">
                    $12/month
                  </Typography>
                </Box>
                <Radio value="year" id="year" />
              </Box>
            </label>
          </Stack>
        </RadioGroup>
        <RadioGroup defaultValue="credit" name="method" onChange={handleChangeMethod} sx={{ marginTop: '24px' }}>
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" sx={{ width: '140px' }} />
          {method === 'paypal' && renderPaypalValue()}
          <FormControlLabel value="credit" control={<Radio />} label="Credit Card" sx={{ width: '140px' }} />
          {renderCreditValue()}
          <FormControlLabel value="stripe" control={<Radio />} label="Stripe" sx={{ width: '140px' }} />
        </RadioGroup>
      </CardWhite>
    </LayoutDetail>
  );
}

export default SubscriptionPayment;
