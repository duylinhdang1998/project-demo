import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

interface TagProps {
  color?: string;
  backgroundColor?: string;
  text?: string;
  variant?: 'success' | 'error';
}

const useStyles = makeStyles(() => ({
  container: {
    borderRadius: '4px',
    padding: '4px 8px',
    display: 'inline-block',
    minWidth: '70px',
    height: '25px',
    overflow: 'hidden',
  },
  text: {
    fontSize: '12px !important',
    fontWeight: '400',
    textAlign: 'center',
  },
}));

function Tag({ color, backgroundColor, text, variant }: TagProps) {
  const classes = useStyles();
  const bgColor = variant === 'success' ? '#F1FFF4' : variant === 'error' ? '#FFEDED' : backgroundColor;
  const colorText = variant === 'success' ? '#33CC7F' : variant === 'error' ? '#FF2727' : color;
  return (
    <Box bgcolor={bgColor} className={classes.container}>
      <Typography color={colorText} className={classes.text}>
        {text}
      </Typography>
    </Box>
  );
}
export default Tag;
