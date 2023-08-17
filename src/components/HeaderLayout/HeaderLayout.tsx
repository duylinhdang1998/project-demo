import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Stack, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import AccountDropdown from 'components/AccountDropdown/AccountDropdown';
import ChangeLanguage from 'components/ChangeLanguage/ChangeLanguage';
import env from 'env';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getTotalRemainingDays } from 'pages/admin/Subscription/utils/getTotalRemainingDays';
import { getTotalTrialDays } from 'pages/admin/Subscription/utils/getTotalTrialDays';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProfile } from 'store/profile/selectors';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { getDomainName } from 'utils/getDomainName';
import { getUrlOfResource } from 'utils/getUrlOfResource';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { isEmpty } from 'lodash-es';
import Layout from 'layout/Layout';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAuth } from '../../store/auth/selectors';
import { UserRole } from '../../utils/constant';

interface HeaderLayoutProps {
  onToggleDrawer?: () => void;
  activeSideBarHeader?: string;
  subTitleHeader?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    fontWeight: 400,
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.grey[100],
  },
  weblink: {
    color: theme.palette.primary.main,
    fontWeight: '600',
    marginLeft: '3px',
    [theme.breakpoints.down('tablet')]: {
      display: 'none',
    },
  },
  subcribe: {
    backgroundColor: 'rgba(51, 204, 127, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
    textAlign: 'center',
  },
}));

function HeaderLayout({ activeSideBarHeader, subTitleHeader, onToggleDrawer }: HeaderLayoutProps) {
  const { t } = useTranslation(['dashboard', 'translation', 'account']);
  const classes = useStyles();

  const { profile } = useSelector(selectProfile);
  const { currentSubscription, subscriptions } = useSelector(selectSubscriptions);
  const { userInfo } = useAppSelector(selectAuth);
  console.log('userInfo>>>', userInfo);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const totalTrialDays = useMemo(() => {
    if (currentSubscription) {
      return getTotalTrialDays(currentSubscription);
    }
    return null;
  }, [currentSubscription]);

  const totalRemainingTrialDays = useMemo(() => {
    if (currentSubscription) {
      return getTotalRemainingDays(currentSubscription);
    }
    return null;
  }, [currentSubscription]);

  const subscriptionName = useMemo(() => {
    return (
      subscriptions?.find(subscription => subscription.subscriptionType === currentSubscription?.subscriptionType)?.name?.toLowerCase() ??
      currentSubscription?.subscriptionType.toLowerCase()
    );
  }, [subscriptions, currentSubscription]);

  const isTrialSubscription = useMemo(() => {
    return currentSubscription?.subscriptionType === 'TRIAL';
  }, [currentSubscription]);

  const handleClick = () => {
    onToggleDrawer?.();
    Layout.getStaticActions().toggleMenu();
  };

  useEffect(() => {
    if (isEmpty(subscriptions)) {
      dispatch(subscriptionsActions.getSubscriptionsRequest({}));
    }
    if (!currentSubscription) {
      dispatch(subscriptionsActions.getCurrentSubscriptionRequest({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderUpgradeSubscriptionMessage = () => {
    if (UserRole.ADMIN !== userInfo?.role) {
      return null;
    }
    if (isTrialSubscription || (totalRemainingTrialDays && totalRemainingTrialDays <= 7)) {
      return (
        <Box className={classes.subcribe}>
          <Typography component="span" fontSize={{ mobile: 12, tablet: 14 }} fontWeight="400">
            {t('account:subscription_expire_warning_message', {
              totalTrialDays,
              totalRemainingTrialDays,
              subscriptionName,
            })}{' '}
            <Typography
              onClick={() => navigate('/account/subscription-package')}
              sx={{ cursor: 'pointer' }}
              component="span"
              variant="subtitle1"
              fontSize={{ mobile: 12, tablet: 14 }}
            >
              {t('account:upgrade_subscription_message', { subscriptionName })}
            </Typography>
          </Typography>
        </Box>
      );
    }
    return null;
  };

  if (!profile) {
    return null;
  }

  return (
    <div>
      <AppBar
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          boxShadow: 'none',
          position: 'relative',
          zIndex: 99,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleClick} sx={{ mr: 2, display: { laptop: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="span"
              fontSize={12}
              color="#45485E"
              display={{
                mobile: 'none',
                laptop: 'block',
              }}
            >
              {subTitleHeader}
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="div"
              color="#0C1132"
              fontWeight="bold"
              display={{
                mobile: 'none',
                laptop: 'block',
              }}
            >
              {activeSideBarHeader}
            </Typography>
          </Box>
          <Stack direction="row" spacing={{ mobile: 2, desktop: 4 }} alignItems="center">
            <div className={classes.link}>
              <LanguageOutlinedIcon sx={{ fontSize: 40, color: '#1AA6EE', marginRight: '10px' }} />
              <Typography
                component="span"
                fontSize="14px"
                display={{
                  mobile: 'none',
                  tablet: 'block',
                }}
              >
                {t('your_website')}:
              </Typography>
              <a href={`https://${getDomainName()}.${env.baseWebDomain}`} target="_blank" className={classes.weblink}>
                {getDomainName()}.{env.baseWebDomain}
              </a>
            </div>
            <ChangeLanguage />
            <AccountDropdown avatar={getUrlOfResource(profile.profileImage)} name={profile.name} email={profile.email} />
          </Stack>
        </Toolbar>
        {renderUpgradeSubscriptionMessage()}
      </AppBar>
    </div>
  );
}

export default memo(HeaderLayout);
