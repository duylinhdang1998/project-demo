import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Stack, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import AccountDropdown from 'components/AccountDropdown/AccountDropdown';
import ChangeLanguage from 'components/ChangeLanguage/ChangeLanguage';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectProfile } from 'store/profile/selectors';
import { getUrlOfResource } from 'utils/getUrlOfResource';

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

function HeaderLayout({ activeSideBarHeader, subTitleHeader }: HeaderLayoutProps) {
  const { t } = useTranslation(['dashboard', 'translation']);
  const classes = useStyles();
  const { profile } = useSelector(selectProfile);

  const handleClick = () => {
    // toggle();
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
              <a href="##" className={classes.weblink}>
                tbus.biz/yourcompany
              </a>
            </div>
            <ChangeLanguage />
            <AccountDropdown avatar={getUrlOfResource(profile.profileImage)} name={profile.name} email={profile.email} />
          </Stack>
        </Toolbar>
        <Box className={classes.subcribe}>
          <Typography component="span" fontSize={{ mobile: 12, tablet: 14 }} fontWeight="400">
            Your benefit from 15-day trial version, only 7 days left.{' '}
            <Typography component="span" variant="subtitle1" fontSize={{ mobile: 12, tablet: 14 }}>
              Unlock your trial period here
            </Typography>
          </Typography>
        </Box>
      </AppBar>
    </div>
  );
}

export default memo(HeaderLayout);
