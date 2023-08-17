import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar, IconButton, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Dropdown, Menu } from 'antd';
import cx from 'classnames';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authActions } from 'store/auth/authSlice';
import { accountSettings } from './accountSettings';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAuth } from '../../store/auth/selectors';
import { UserRole } from 'utils/constant';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    textAlign: 'left',
  },
  name: {
    fontWeight: '700',
    fontSize: '16px',
    color: theme.palette.grey[100],
  },
  email: {
    fontSize: '12px',
    fontWeight: 400,
    color: theme.palette.grey[700],
    display: 'block',
  },
  item: {
    padding: '16px !important',
    transition: '0.3ms ease all',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
      color: '#fff',
      '& img': {
        filter: 'invert(100%) sepia(90%) saturate(0%) hue-rotate(265deg) brightness(105%) contrast(100%)',
      },
    },
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: '10px',
  },
  menuList: {
    zIndex: 999,
  },
  logoutItem: {
    '& img': {
      filter: 'invert(31%) sepia(39%) saturate(5360%) hue-rotate(346deg) brightness(110%) contrast(107%)',
    },
  },
  hidden: {
    [theme.breakpoints.down('tablet')]: {
      display: 'none',
    },
  },
  avatar: {
    width: '40px',
    height: '40px',
    [theme.breakpoints.down('tablet')]: {
      width: '28px',
      height: '28px',
    },
  },
}));

interface AccountDropdownProps {
  avatar: string;
  name: string;
  email: string;
}

function AccountDropdown({ avatar, name, email }: AccountDropdownProps) {
  const classes = useStyles();
  const { t } = useTranslation('account');
  const { userInfo } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleItem = (i: any) => () => {
    if (i.name === 'logout') {
      dispatch(authActions.logout({}));
      return;
    }
    return navigate('/account' + i.path);
  };

  const menu = (
    <Menu className={classes.menuList}>
      <Stack direction="row" spacing={2} alignItems="center" p="16px" display={{ mobile: 'flex', tablet: 'none' }}>
        <Avatar src={avatar} alt="avatar-user" className={classes.avatar} />
        <Box className={classes.userInfo}>
          <span className={classes.name}>{name}</span>
          <span className={classes.email}>{email}</span>
        </Box>
      </Stack>
      {accountSettings.map(i => {
        if (i?.role && !i?.role?.includes(userInfo?.role as UserRole)) {
          return null;
        }
        return (
          <Menu.Item
            key={i.name}
            onClick={handleItem(i)}
            className={cx(classes.item, {
              [classes.logoutItem]: i.name === 'logout',
            })}
          >
            <Stack direction="row">
              <img src={i.icon} className={classes.icon} alt="" />
              <Typography fontSize="14px" fontWeight="400" color={i.name === 'logout' ? '#FF2727' : '-moz-initial'}>
                {t(`${i.name}`)}
              </Typography>
            </Stack>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <IconButton disableFocusRipple disableRipple>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={avatar} alt="avatar-user" className={classes.avatar} />
            <Box className={cx(classes.hidden, classes.userInfo)}>
              <span className={classes.name}>{name}</span>
              <span className={classes.email}>{email}</span>
            </Box>
            <div className={classes.hidden}>
              <ArrowDropDownIcon />
            </div>
          </Stack>
        </IconButton>
      </Dropdown>
    </div>
  );
}

export default memo(AccountDropdown);
