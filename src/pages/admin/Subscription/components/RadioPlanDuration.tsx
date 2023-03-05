import { Box, Radio, RadioGroup, RadioGroupProps, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clxs from 'classnames';
import { useAppSelector } from 'hooks/useAppSelector';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { PlanDuration } from '../@types/PlanDuration';
import { planDurations } from '../constants';
import { getPlanDurationsFromSubscriptionPlans } from '../utils/getPlanDurationsFromSubscriptionPlans';

interface RadioPlanDurationProps {
  planDurationState: PlanDuration;
  setPlanDurationState: (planDuration: PlanDuration) => void;
}
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

export const RadioPlanDuration = ({ planDurationState, setPlanDurationState }: RadioPlanDurationProps) => {
  const { t } = useTranslation(['account', 'translation']);
  const classes = useStyles();

  const { plans } = useAppSelector(selectSubscriptions);

  const handleChange: RadioGroupProps['onChange'] = (_, value) => {
    setPlanDurationState(value as PlanDuration);
  };

  return (
    <RadioGroup row name="subscription" value={planDurationState} onChange={handleChange}>
      <Stack direction="row" alignItems="center" spacing={3} width="100%">
        {planDurations.map(planDuration => {
          const label = planDuration === 'monthly' ? t('account:monthly_payment') : t('account:yearly_payment');
          const price = get(getPlanDurationsFromSubscriptionPlans(plans), planDuration).price;
          return (
            <label htmlFor={planDuration} className={classes.label}>
              <Box className={clxs(classes.item, { [classes.selected]: planDurationState === planDuration })}>
                <Box>
                  <Typography fontSize={14} color="#858C93">
                    {label}
                  </Typography>
                  <Typography fontSize="18px" fontWeight={700} color="#0C1132">
                    {price}
                    {getAppCurrencySymbol}/{t(`translation:${planDuration}`)}
                  </Typography>
                </Box>
                <Radio value={planDuration} id={planDuration} />
              </Box>
            </label>
          );
        })}
      </Stack>
    </RadioGroup>
  );
};
