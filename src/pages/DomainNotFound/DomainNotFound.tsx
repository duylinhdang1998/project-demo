import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DomainNotFoundImage from 'assets/images/domain-not-found.png';
import LogoTbus from 'assets/images/logo-blue.png';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { getDomain } from 'utils/getDomainName';
import { getTbusSupportEmail } from 'utils/getTbusSupportEmail';

const useStyles = makeStyles(() => {
  return {
    logo: {
      maxWidth: '141px',
      marginBottom: '36px',
    },
    title: {
      fontSize: '28px !important',
      color: '#0C1132',
      fontWeight: 'bold !important',
      marginBottom: '24px !important',
    },
    message: {
      color: '#475461',
      fontSize: '16px !important',
    },
    image: {
      maxWidth: '100%',
    },
  };
});

export const DomainNotFound = () => {
  const { t } = useTranslation(['domainNotFound']);

  const styles = useStyles();

  return (
    <Grid
      container
      height="100vh"
      sx={{ display: 'flex', maxWidth: '960px', margin: 'auto', padding: '16px 0' }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={6} justifyContent="center" alignItems="center" sx={{ padding: '0px 16px' }}>
        <img className={classNames(styles.logo, styles.image)} src={LogoTbus} alt="Tbus" />
        <Typography
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: t('domainNotFound:title', {
              htmlForDomain: `<span style="color: #1AA6EE">${getDomain()}</span>`,
              interpolation: { escapeValue: false },
            }),
          }}
        />
        <Typography
          className={styles.message}
          dangerouslySetInnerHTML={{
            __html: t('domainNotFound:message', {
              htmlForEmail: `<a href="mailto:${getTbusSupportEmail()}" style="color: #1AA6EE">${getTbusSupportEmail()}</a>`,
              interpolation: { escapeValue: false },
            }),
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ padding: '0px 16px' }}>
        <img className={styles.image} src={DomainNotFoundImage} alt="Domain not found" />
      </Grid>
    </Grid>
  );
};
