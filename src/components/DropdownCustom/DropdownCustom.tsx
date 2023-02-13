import { makeStyles } from '@mui/styles';
import { Dropdown, DropDownProps, Menu } from 'antd';
import clxs from 'classnames';
import { memo, ReactNode } from 'react';

interface DropdownCustomProps extends Omit<DropDownProps, 'overlay'> {
  children?: ReactNode;
  menuChildren?: ReactNode;
  menuClassName?: string;
}

const useStyles = makeStyles(() => ({
  menu: {
    borderRadius: '4px',
  },
}));

function DropdownCustom({ menuChildren, children, menuClassName, ...props }: DropdownCustomProps) {
  const classes = useStyles();
  const menu = <Menu className={clxs(classes.menu, menuClassName)}>{menuChildren}</Menu>;
  return (
    <Dropdown {...props} overlay={menu}>
      {children}
    </Dropdown>
  );
}

export default memo(DropdownCustom);
