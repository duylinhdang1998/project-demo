import { ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { RouteSideBar } from 'models/Route';

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
  const { t } = useTranslation('sidebar');
  const resolved = useResolvedPath(item.path);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        to={item.path}
        className={cx(classes.link, {
          [classes.active]: !!match,
        })}
      >
        <ListItem button key={item.name} color="#fff">
          <ListItemIcon>
            <img
              src={item.icon}
              alt={item.name}
              className={cx(classes.icon, {
                [classes.imageActive]: !!match,
              })}
            />
          </ListItemIcon>
          <ListItemText
            primary={t(`${item.name}`)}
            className={cx({
              [classes.activeText]: !!match,
            })}
          />
        </ListItem>
        {!!match && <div className={classes.divider} />}
      </Link>
    </div>
  );
}

export default memo(CustomLink);
