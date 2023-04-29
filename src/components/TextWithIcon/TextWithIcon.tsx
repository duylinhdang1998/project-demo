import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TypographyProps } from '@mui/system';
import { ReactNode } from 'react';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: '6px',
  },
});

interface TextWithIconProps {
  text?: ReactNode;
  icon?: string;
  typography?: TypographyProps;
  color?: string;
  onClick?: () => void;
}

export default function TextWithIcon({ text, icon, typography, color, onClick }: TextWithIconProps) {
  const classes = useStyles();
  return (
    <Box className={classes.root} onClick={onClick} sx={{ cursor: 'pointer' }}>
      <img src={icon} className={classes.icon} />
      <Typography {...typography} fontSize={14} color={color}>
        {text}
      </Typography>
    </Box>
  );
}
