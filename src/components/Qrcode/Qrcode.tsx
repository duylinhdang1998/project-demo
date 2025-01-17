import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, InputBase, Typography, useTheme } from '@mui/material';
import cx from 'classnames';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { useStyles } from './styles';
import ClearIcon from '@mui/icons-material/Clear';
import QRCodeScanner from 'components/QrcodeScanner/QrcodeScanner';
import QrScanner from 'qr-scanner';

interface QrcodeProps {
  code: string;
  onSearch?: (id: string) => void;
  onScanQR?: (result: QrScanner.ScanResult) => void;
  autoDisconnectOnScan?: boolean;
}

export default function Qrcode({ code, autoDisconnectOnScan = true, onSearch, onScanQR }: QrcodeProps) {
  const { t } = useTranslation(['dashboard', 'message_error']);
  const classes = useStyles();
  const theme = useTheme();

  const [isShowCamera, setIsShowCamera] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const handleOpenCamera = () => {
    setIsShowCamera(true);
  };

  const _renderEdge = (edgePosition: string) => {
    return <Box className={cx(classes[edgePosition], classes.edge)} />;
  };

  return (
    <Box>
      <Typography variant="h5" mb="8px" component="p">
        {t('dashboard:search_order_scanqr')}
      </Typography>
      <InputBase
        placeholder={t('dashboard:type_orderid')}
        endAdornment={
          <InputAdornment position="end">
            {searchValue && (
              <Box className={classes.clearButton}>
                <ClearIcon
                  fontSize="inherit"
                  onClick={() => {
                    setSearchValue('');
                    onSearch?.('');
                  }}
                />
              </Box>
            )}
            <Button
              sx={{
                minWidth: '32px',
                minHeight: '32px',
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                padding: '0px',
                fontSize: '18px',
              }}
              backgroundButton={theme.palette.primary.main}
              onClick={() => onSearch?.(searchValue)}
            >
              <SearchIcon fontSize="inherit" />
            </Button>
          </InputAdornment>
        }
        fullWidth
        value={searchValue}
        className={classes.inputSearch}
        onChange={e => setSearchValue(e.target.value)}
      />
      {isShowCamera ? (
        <QRCodeScanner
          onScanQR={result => {
            onScanQR?.(result);
            if (autoDisconnectOnScan) {
              setIsShowCamera(false);
            }
          }}
        />
      ) : (
        <Box
          sx={{ cursor: 'pointer' }}
          my="27px"
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={handleOpenCamera}
        >
          <Box className={classes.scanme}>
            <div className={classes.square} />
            {t('dashboard:scan_me')}
          </Box>
          <Box position="relative" padding="16px">
            {_renderEdge('topLeft')}
            {_renderEdge('topRight')}
            {_renderEdge('bottomLeft')}
            {_renderEdge('bottomRight')}
            <QRCode value={code} width="90%" size={160} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
