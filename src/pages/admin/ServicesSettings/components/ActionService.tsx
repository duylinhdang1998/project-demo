import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, Menu, MenuItem, SvgIcon, Typography } from '@mui/material';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useToastStyle } from 'theme/toastStyles';

function ActionService() {
  const { t } = useTranslation('translation');
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

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {},
        }}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SvgIcon>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.33331 4.16667C3.1123 4.16667 2.90034 4.25446 2.74406 4.41074C2.58778 4.56702 2.49998 4.77899 2.49998 5V16.6667C2.49998 16.8877 2.58778 17.0996 2.74406 17.2559C2.90034 17.4122 3.1123 17.5 3.33331 17.5H15C15.221 17.5 15.433 17.4122 15.5892 17.2559C15.7455 17.0996 15.8333 16.8877 15.8333 16.6667V12.2167C15.8333 11.7564 16.2064 11.3833 16.6666 11.3833C17.1269 11.3833 17.5 11.7564 17.5 12.2167V16.6667C17.5 17.3297 17.2366 17.9656 16.7677 18.4344C16.2989 18.9033 15.663 19.1667 15 19.1667H3.33331C2.67027 19.1667 2.03439 18.9033 1.56555 18.4344C1.09671 17.9656 0.833313 17.3297 0.833313 16.6667V5C0.833313 4.33696 1.0967 3.70107 1.56555 3.23223C2.03439 2.76339 2.67027 2.5 3.33331 2.5H7.78331C8.24355 2.5 8.61665 2.8731 8.61665 3.33333C8.61665 3.79357 8.24355 4.16667 7.78331 4.16667H3.33331Z"
                fill="#858C93"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.4107 1.07806C14.7362 0.752625 15.2638 0.752625 15.5892 1.07806L18.9226 4.4114C19.248 4.73683 19.248 5.26447 18.9226 5.58991L10.5892 13.9232C10.433 14.0795 10.221 14.1673 9.99998 14.1673H6.66665C6.20641 14.1673 5.83331 13.7942 5.83331 13.334V10.0007C5.83331 9.77964 5.92111 9.56768 6.07739 9.4114L14.4107 1.07806ZM7.49998 10.3458V12.5007H9.6548L17.1548 5.00065L15 2.84583L7.49998 10.3458Z"
                fill="#858C93"
              />
            </SvgIcon>
          </ListItemIcon>
          <Typography fontSize="14px">{t('edit')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <SvgIcon>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.66669 5.00065C1.66669 4.54041 2.03978 4.16732 2.50002 4.16732H17.5C17.9603 4.16732 18.3334 4.54041 18.3334 5.00065C18.3334 5.46089 17.9603 5.83398 17.5 5.83398H2.50002C2.03978 5.83398 1.66669 5.46089 1.66669 5.00065Z"
                fill="#FF2727"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.33335 2.50065C8.11234 2.50065 7.90038 2.58845 7.7441 2.74473C7.58782 2.90101 7.50002 3.11297 7.50002 3.33398V4.16732H12.5V3.33398C12.5 3.11297 12.4122 2.90101 12.2559 2.74473C12.0997 2.58845 11.8877 2.50065 11.6667 2.50065H8.33335ZM14.1667 4.16732V3.33398C14.1667 2.67094 13.9033 2.03506 13.4345 1.56622C12.9656 1.09738 12.3297 0.833984 11.6667 0.833984H8.33335C7.67031 0.833984 7.03443 1.09738 6.56559 1.56622C6.09675 2.03506 5.83335 2.67094 5.83335 3.33398V4.16732H4.16669C3.70645 4.16732 3.33335 4.54041 3.33335 5.00065V16.6673C3.33335 17.3304 3.59675 17.9662 4.06559 18.4351C4.53443 18.9039 5.17031 19.1673 5.83335 19.1673H14.1667C14.8297 19.1673 15.4656 18.9039 15.9345 18.4351C16.4033 17.9662 16.6667 17.3304 16.6667 16.6673V5.00065C16.6667 4.54041 16.2936 4.16732 15.8334 4.16732H14.1667ZM5.00002 5.83398V16.6673C5.00002 16.8883 5.08782 17.1003 5.2441 17.2566C5.40038 17.4129 5.61234 17.5006 5.83335 17.5006H14.1667C14.3877 17.5006 14.5997 17.4129 14.7559 17.2566C14.9122 17.1003 15 16.8883 15 16.6673V5.83398H5.00002Z"
                fill="#FF2727"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.33335 8.33398C8.79359 8.33398 9.16669 8.70708 9.16669 9.16732V14.1673C9.16669 14.6276 8.79359 15.0006 8.33335 15.0006C7.87312 15.0006 7.50002 14.6276 7.50002 14.1673V9.16732C7.50002 8.70708 7.87312 8.33398 8.33335 8.33398Z"
                fill="#FF2727"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6667 8.33398C12.1269 8.33398 12.5 8.70708 12.5 9.16732V14.1673C12.5 14.6276 12.1269 15.0006 11.6667 15.0006C11.2065 15.0006 10.8334 14.6276 10.8334 14.1673V9.16732C10.8334 8.70708 11.2065 8.33398 11.6667 8.33398Z"
                fill="#FF2727"
              />
            </SvgIcon>
          </ListItemIcon>
          <Typography fontSize="14px" color="#FF2727">
            {t('delete')}
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default memo(ActionService);
