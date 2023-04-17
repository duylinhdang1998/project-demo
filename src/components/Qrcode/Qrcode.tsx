import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, InputBase, Typography, useTheme } from '@mui/material';
import cx from 'classnames';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { isMobile } from 'utils/isMobile';
import { useStyles } from './styles';
import ClearIcon from '@mui/icons-material/Clear';
interface QrcodeProps {
  code: string;
  onSearch?: (id: string) => void;
}

export default function Qrcode({ code, onSearch }: QrcodeProps) {
  const { t } = useTranslation(['dashboard']);
  const classes = useStyles();
  const theme = useTheme();

  const [searchValue, setSearchValue] = useState('');

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
      <Box
        my="27px"
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ display: isMobile() ? 'initial' : 'none' }}
      >
        <Box className={classes.scanme}>
          <div className={classes.square} />
          {t('dashboard:scan_me')}
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
