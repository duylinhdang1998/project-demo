import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, InputBase, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';

interface QrcodeProps {
  code: string;
}

const useStyles = makeStyles(() => ({
  inputSearch: {
    backgroundColor: '#fff',
    border: '1px solid #F7F7F7',
    borderRadius: '4px',
    fontSize: '14px !important',
    padding: '10px',
    height: '40px',
  },
  scanme: {
    textAlign: 'center',
    fontSize: '30px',
    color: '#fff',
    textTransform: 'uppercase',
    padding: '10px 80px',
    backgroundColor: '#000',
    borderRadius: '10px',
    fontWeight: 'bold',
    marginBottom: '32px',
    position: 'relative',
  },
  square: {
    content: '',
    width: '20px',
    height: '20px',
    backgroundColor: '#000',
    display: 'block',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%) rotate(-45deg)',
  },
  edge: {
    width: 20,
    height: 20,
    borderColor: '#000',
    zIndex: 2,
    position: 'absolute',
  },
  topLeft: {
    borderTop: '4px solid #000',
    borderLeft: '4px solid #000',
    borderTopLeftRadius: 4,
    top: -4,
    left: -4,
  },
  topRight: {
    borderRight: '4px solid #000',
    borderTop: '4px solid #000',
    borderTopRightRadius: 4,
    top: -4,
    right: -4,
  },
  bottomLeft: {
    borderBottom: '4px solid #000',
    borderLeft: '4px solid #000',
    borderBottomLeftRadius: 4,
    bottom: -4,
    left: -4,
  },
  bottomRight: {
    borderBottom: '4px solid #000',
    borderRight: '4px solid #000',
    borderBottomRightRadius: 4,
    bottom: -4,
    right: -2,
  },
}));

export default function Qrcode({ code }: QrcodeProps) {
  const { t } = useTranslation('dashboard');
  const classes = useStyles();

  const _renderEdge = (edgePosition: string) => {
    return <Box className={cx(classes[edgePosition], classes.edge)} />;
  };

  return (
    <Box>
      <Typography variant="h5" mb="8px" component="p">
        {t('search_order_scanqr')}
      </Typography>
      <InputBase
        placeholder={t('type_orderid')}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        fullWidth
        className={classes.inputSearch}
      />
      <Box my="27px" flexDirection="column" display="flex" justifyContent="center" alignItems="center">
        <Box className={classes.scanme}>
          <div className={classes.square} />
          {t('scan_me')}
        </Box>
        <Box position="relative" padding="20px">
          {_renderEdge('topLeft')}
          {_renderEdge('topRight')}
          {_renderEdge('bottomLeft')}
          {_renderEdge('bottomRight')}
          <QRCode value={code} width="90%" />
        </Box>
      </Box>
    </Box>
  );
}
