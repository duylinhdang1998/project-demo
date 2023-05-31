import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, InputBase, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useDebounce, useUpdateEffect } from 'ahooks';
import Button from 'components/Button/Button';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
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
  const debouncedValue = useDebounce(searchKey, { wait: 500 });

  useUpdateEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setSearchKey(searchValue ?? '');
  }, [searchValue]);

  return (
    <Box display="flex" gap="16px" justifyContent="space-between" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center">
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
