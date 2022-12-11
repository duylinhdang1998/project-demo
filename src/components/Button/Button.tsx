import { Button as MuiButton, ButtonProps as MuiButtonProps, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import React, { memo } from 'react';

interface ButtonProps extends Omit<MuiButtonProps, 'className'> {
  backgroundButton?: string;
  className?: string;
}

const useStyles = makeStyles(() => {
  return {
    container: {
      height: '40px',
    },
  };
});

function Button({ backgroundButton, className, ...props }: ButtonProps) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1200px)');

  return (
    <MuiButton
      fullWidth={!matches}
      {...props}
      sx={{
        backgroundColor: backgroundButton + '!important',
        '&:hover': {
          backgroundColor: backgroundButton,
        },
        padding: '10px 14px',
        ...props.sx,
      }}
      className={cx(classes.container, className)}>
      {props.children}
    </MuiButton>
  );
}

export default memo(Button);
