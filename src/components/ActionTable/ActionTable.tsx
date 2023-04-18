import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Menu } from 'antd';
import { MouseEvent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropdownCustom from 'components/DropdownCustom/DropdownCustom';

export interface ActionItem<T> {
  id?: string;
  label?: string;
  icon?: ReactNode;
  onClick?: (row: T) => void;
  color?: string;
}

export interface ActionTableProps<T> {
  actions?: ActionItem<T>[];
  row: T;
}

function ActionTable<T>({ actions, row }: ActionTableProps<T>) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAction = (act: ActionItem<T>) => () => {
    act?.onClick?.(row);
    handleClose();
  };

  const menu = (
    <>
      {actions?.map(act => (
        <Menu.Item onClick={handleClickAction(act)} key={act.id}>
          <Stack direction="row" alignItems="center" spacing={1} padding="8px">
            <Box display="flex" alignItems="center">
              {act.icon}
            </Box>
            <Typography fontSize="14px" color={act.color}>
              {t(`translation:${act.label}`)}
            </Typography>
          </Stack>
        </Menu.Item>
      ))}
    </>
  );

  return (
    <div>
      <DropdownCustom trigger={['click']} placement="bottomLeft" menuChildren={menu}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </DropdownCustom>
    </div>
  );
}

export default ActionTable;
