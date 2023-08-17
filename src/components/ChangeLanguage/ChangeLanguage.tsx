import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
import { Dropdown, Menu } from 'antd';
import cx from 'classnames';
import { memo, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import flagEn from 'assets/images/flag-en.png';
import flagFr from 'assets/images/flag-fr.png';
import { useGlobalContext } from 'context/GlobalContext';
import { useStyles } from './styles';
import dayjs from 'dayjs';

function ChangeLanguage() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [langSelected, setLangSelected] = useState('');

  const classes = useStyles();

  useEffect(() => {
    setLangSelected(language);
    dayjs.locale(language);
  }, [language]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectLang = (val: string) => () => {
    setLanguage(val);
    handleClose();
    i18n.changeLanguage(val);
  };

  const getFlag = () => {
    switch (langSelected) {
      case 'en':
        return flagEn;
      default:
        return flagFr;
    }
  };
  const getLangText = () => {
    switch (langSelected) {
      case 'en':
        return 'English';
      default:
        return 'French';
    }
  };

  const menu = (
    <Menu className={classes.menuList}>
      <Menu.Item key="en" onClick={handleSelectLang('en')} className={classes.menuItem}>
        <img src={flagEn} alt="flag" className={classes.imgFlag} />
        <span className={classes.lngText}>English</span>
      </Menu.Item>
      <Menu.Item key="fr" onClick={handleSelectLang('fr')} className={classes.menuItem}>
        <img src={flagFr} alt="flag" className={classes.imgFlag} />
        <span className={classes.lngText}>French</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          fullWidth
        >
          <img src={getFlag()} alt="flag" className={classes.imgFlag} />
          <span className={cx(classes.lngText, classes.hiddenText)}>{getLangText()}</span>
          <KeyboardArrowDownIcon sx={{ fontSize: '18px', color: '#B9B9B9', display: { mobile: 'none', tablet: 'block' } }} />
        </Button>
      </Dropdown>
    </div>
  );
}
export default memo(ChangeLanguage);
