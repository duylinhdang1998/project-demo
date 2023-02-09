import icons from 'assets/icons/icons.json';
import { InputBase, InputLabel, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import 'assets/icons/fontawesome/css/all.min.css';
import { ChangeEvent, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridCellProps } from 'react-virtualized';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';

interface Icon {
  icon: string;
  type: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    marginTop: '15px',
    border: '1px solid #e0e0e0',
  },
  cell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  icon: {
    transition: '.2s ease all',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    width: 32,
    height: 32,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  label: {
    fontSize: '14px !important',
    color: '#45485E',
    marginBottom: '4px',
  },
  inputSearch: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    padding: '12px 14px',
    height: '40px !important',
    fontSize: '14px !important',
  },
}));

function ListIcon() {
  const classes = useStyles();
  const { t } = useTranslation('serviceSetting');
  const [iconList, setIconsList] = useState<Icon[]>();
  const [valueSearch, setValueSearch] = useState('');

  const getIconsType = () => {
    return Object.keys(icons).map((iconName) => {
      return {
        icon: iconName,
        type: icons[iconName].free[0] as string,
      };
    });
  };

  useEffect(() => {
    const result = getIconsType();
    setIconsList(result);
  }, []);

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setValueSearch(value);
  };

  const getClassName = (data?: Icon) => {
    switch (data?.type) {
      case 'solid':
        return `${classes.icon} fas fa-${data?.icon}`;
      default:
        return `${classes.icon} fab fa-${data?.icon}`;
    }
  };

  const _renderCell =
    (width: number) =>
    ({ columnIndex, key, rowIndex, style }: GridCellProps) => {
      const iconListRender = iconList?.filter((i) => i.icon.indexOf(valueSearch) > -1);
      return (
        <div key={key} className={classes.cell} style={{ ...style, height: width / 14 - 2 }}>
          <i className={getClassName(iconListRender?.[14 * rowIndex + columnIndex])} />
        </div>
      );
    };

  return (
    <Box my="24px">
      <InputLabel htmlFor="title" className={classes.label}>
        {t('icon')}
      </InputLabel>
      <InputBase value={valueSearch} onChange={handleChangeText} placeholder={t('search_icon')} id="title" className={classes.inputSearch} fullWidth />
      <AutoSizer disableHeight>
        {({ width }) => {
          return (
            <div
              className={classes.gridContainer}
              style={{
                width,
              }}
            >
              <Grid
                height={400}
                columnWidth={width / 14 - 2}
                columnCount={14}
                cellRenderer={_renderCell(width)}
                rowHeight={50}
                rowCount={132}
                width={width}
                overscanRowCount={10}
              />
            </div>
          );
        }}
      </AutoSizer>
    </Box>
  );
}

export default memo(ListIcon);
