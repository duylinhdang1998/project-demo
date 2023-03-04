import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import cx from 'classnames';
import { memo } from 'react';

interface ButtonProps extends Omit<LoadingButtonProps, 'className'> {
  backgroundButton?: string;
  colorButton?: string;
  backgroundButtonHover?: string;
  colorButtonHover?: string;
  className?: string;
}

const useStyles = makeStyles(() => {
  return {
    container: {
      height: '40px',
    },
  };
});

function Button({ backgroundButton, backgroundButtonHover, colorButton, colorButtonHover, className, ...props }: ButtonProps) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1200px)');

  return (
    <LoadingButton
      fullWidth={!matches}
      {...props}
      sx={{
        backgroundColor: backgroundButton + '!important',
        '&:hover': {
          backgroundColor: (backgroundButtonHover ? backgroundButtonHover : backgroundButton) + '!important',
          color: (colorButtonHover ? colorButtonHover : colorButton) + '!important',
        },
        color: colorButton + '!important',
        padding: '10px 14px',
        ...props.sx,
      }}
      className={cx(classes.container, className)}
    >
      {props.children}
    </LoadingButton>
  );
}

export default memo(Button);
