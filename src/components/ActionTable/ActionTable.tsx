import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Menu } from 'antd';
import DropdownCustom from 'components/DropdownCustom/DropdownCustom';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useToastStyle } from 'theme/toastStyles';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const toastClass = useToastStyle();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    toast(<ToastCustom type="success" text="Delete the service successfully!" />, {
      className: toastClass.toastSuccess,
    });
    handleClose();
  };

  const handleClickAction = (act: ActionItem<T>) => () => {
    act?.onClick?.(row);
    handleClose();
  };

  const menu = (
    <>
      {actions?.map((act) => (
        <Menu.Item onClick={handleClickAction(act)} key={act.id}>
          <Stack direction="row" justifyContent="flex-start" spacing={1} paddingX="8px">
            <Box>{act.icon}</Box>
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
          onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </DropdownCustom>
    </div>
  );
}

export default ActionTable;
