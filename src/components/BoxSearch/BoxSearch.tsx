import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, InputBase, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';

const useStyles = makeStyles(() => ({
  container: {},
  inputSearch: {
    backgroundColor: '#fff',
    border: '1px solid #F7F7F7',
    borderRadius: '4px',
    fontSize: '14px !important',
    width: '370px',
    padding: '10px',
    height: '40px',
  },
  btnAdd: {
    height: '40px !important',
    padding: '10px 30px !important',
    marginTop: '16px !important',
  },
}));

interface BoxSearchProps {
  searchValue?: string;
  addTextButton?: string;
  onAdd?: () => void;
  onSearch?: (value: string) => void;
}

function BoxSearch({ addTextButton, searchValue, onAdd, onSearch }: BoxSearchProps) {
  const { t } = useTranslation('translation');
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1366px)');
  const [searchKey, setSearchKey] = useState(searchValue ?? '');
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (searchKey !== searchValue) {
      timeoutRef.current = window.setTimeout(() => {
        onSearch?.(searchKey);
      }, 200);
      return () => {
        clearTimeout(timeoutRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  useEffect(() => {
    setSearchKey(searchValue ?? '');
  }, [searchValue]);

  return (
    <Box display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center">
      <InputBase
        value={searchKey}
        onChange={e => setSearchKey(e.target.value)}
        placeholder={t('translation:search')}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        fullWidth={!matches}
        className={classes.inputSearch}
      />
      <Button backgroundButton="#1aa6ee" startIcon={<AddIcon />} className={classes.btnAdd} onClick={onAdd}>
        {addTextButton}
      </Button>
    </Box>
  );
}

export default memo(BoxSearch);
