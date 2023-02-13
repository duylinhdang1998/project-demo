import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Progress } from 'antd';
import 'antd/lib/progress/style/css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';

const subcriptionsInfo = [
  { id: uuid(), label: 'Valid for 15 days after create account', value: true },
  { id: uuid(), label: 'Reporting & dashboard.', value: true },
  { id: uuid(), label: 'Online support', value: false },
  { id: uuid(), label: 'Create unlimited vehicles.', value: false },
  { id: uuid(), label: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor.', value: false },
];

export default function Subscription() {
  const { t } = useTranslation(['account', 'translation']);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/account/subscription-package');
  };
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('account:subscription')} />
      <Box p="24px">
        <CardWhite title={t('account:my_subscription')}>
          <Typography fontWeight={700} color="#0C1132">
            {t('account:free_trial')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {subcriptionsInfo.map(i => (
                <Stack direction="row" alignItems="center" spacing={3} key={i.id} my="10px">
                  {i.value ? <CheckIcon sx={{ color: '#33CC7F', fontSize: '12px' }} /> : <ClearIcon sx={{ color: '#FF2727', fontSize: '12px' }} />}
                  <Typography variant="body2">{i.label}</Typography>
                </Stack>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Progress
                type="circle"
                percent={10}
                format={percent => (
                  <Box>
                    <Typography fontSize={12} color="#858C93">
                      left
                    </Typography>
                    <Typography fontSize={18} color="#0c1132" fontWeight={700}>
                      {percent} days
                    </Typography>
                  </Box>
                )}
                width={120}
                strokeColor="#33CC7F"
              />
            </Grid>
          </Grid>
          <Typography sx={{ margin: '16px 0' }} variant="body2">
            {t('account:after_trial_end')}
          </Typography>
          <Button
            sx={{ margin: '24px 0', alignSelf: 'flex-end', padding: '10px 14px', float: 'right' }}
            backgroundButton="#1AA6EE"
            onClick={handleClick}
          >
            {t('translation:upgrade_now')}
          </Button>
        </CardWhite>
      </Box>
    </Box>
  );
}
