import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Theme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import { RouteSideBar } from 'models/Route';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Layout from 'layout/Layout';

const useStyles = makeStyles((theme: Theme) => ({
  active: {
    backgroundColor: '#011F2E',
  },
  link: {
    fontSize: '14px !important',
    color: '#B2BABE !important',
    textDecoration: 'none',
    display: 'block',
    position: 'relative',
  },
  activeText: {
    color: theme.palette.primary.main,
    fontWeight: '700 !important',
  },
  icon: {
    filter: 'invert(88%) sepia(8%) saturate(216%) hue-rotate(156deg) brightness(85%) contrast(85%)',
    width: 20,
    height: 20,
  },
  divider: {
    position: 'absolute',
    borderRadius: '0px 10px 10px 0px',
    transform: 'matrix(-1, 0, 0, 1, 0, 0)',
    backgroundColor: '#1AA6EE',
    top: 0,
    right: 0,
    width: '4px',
    height: '100%',
  },
  imageActive: {
    filter: 'invert(65%) sepia(78%) saturate(4155%) hue-rotate(170deg) brightness(99%) contrast(88%)',
  },
}));

interface CustomLinkProps {
  item: RouteSideBar;
}

function CustomLink({ item }: CustomLinkProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { t } = useTranslation('sidebar');
  const resolved = useResolvedPath(item.path);
  const match = useMatch({ path: resolved.pathname, end: item.isRouteStrict });
  const matches = useMediaQuery('(max-width:768px)');

  const handleClick = (name?: string) => () => {
    if (matches) {
      setOpen(!open);
      if (name !== 'reporting') {
        Layout.getStaticActions().toggleMenu();
      }
    }
  };

  useEffect(() => {
    if (item.name === 'reporting' && !!matches) {
      const pathname = location.pathname.split('/')[2];
      setOpen(pathname === 'reportings-ticket-sales' || pathname === 'reportings-package-sales');
    }
  }, [item.name, location.pathname, matches]);

  const renderSubmenu = () => {
    if (item.name === 'reporting') {
      return (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavLink
              to="/admin/reportings-package-sales"
              className={({ isActive }) =>
                cx(classes.link, {
                  [classes.active]: isActive,
                })
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <div className={cx(classes.icon)} />
                </ListItemIcon>
                <ListItemText primary={t('package_sale')} />
              </ListItemButton>
            </NavLink>
            <NavLink
              to="/admin/reportings-ticket-sales"
              className={({ isActive }) =>
                cx(classes.link, {
                  [classes.active]: isActive,
                })
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <div className={cx(classes.icon)} />
                </ListItemIcon>
                <ListItemText primary={t('ticket_sale')} />
              </ListItemButton>
            </NavLink>
          </List>
        </Collapse>
      );
    }
  };

  return (
    <div>
      <Link
        to={item.name === 'reporting' ? '#' : item.path}
        className={cx(classes.link, {
          [classes.active]: !!match,
        })}
        onClick={handleClick(item.name)}
      >
        <ListItem button key={item.name} color="#fff">
          <ListItemIcon>
            <img
              src={item.icon}
              alt={item.name}
              className={cx(classes.icon, {
                [classes.imageActive]: !!match || (item.name === 'reporting' && open),
              })}
            />
          </ListItemIcon>
          <ListItemText
            primary={t(`${item.name}`)}
            className={cx({
              [classes.activeText]: !!match || (item.name === 'reporting' && open),
            })}
          />
          {item.name === 'reporting' && (open ? <ExpandLess color="primary" /> : <ExpandMore />)}
        </ListItem>
        {!!match && <div className={classes.divider} />}
        {renderSubmenu()}
      </Link>
    </div>
  );
}

export default memo(CustomLink);
