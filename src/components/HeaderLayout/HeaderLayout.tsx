import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Stack, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import AccountDropdown from 'components/AccountDropdown/AccountDropdown';
import ChangeLanguage from 'components/ChangeLanguage/ChangeLanguage';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

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

  const handleClick = () => {
    // toggle();
  };

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
            <AccountDropdown
              avatar="https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              role="TWC Travelnet"
              fullname="Thomas Nguyen"
            />
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
