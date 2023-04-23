import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ToolbarProps } from 'react-big-calendar';

const useStyles = makeStyles(() => ({
  btnIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
  },
}));

interface CalendarToolbarProps extends ToolbarProps {}

export const CalendarToolbar = ({ label, onNavigate }: CalendarToolbarProps) => {
  const classes = useStyles();

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" border="1px solid #ddd" py="10px">
      <Box className={classes.btnIcon} onClick={() => onNavigate('PREV')}>
        <ChevronLeftIcon sx={{ color: '#333', fontSize: 20 }} />
      </Box>
      <Typography fontSize={18} fontWeight={700}>
        {label}
      </Typography>
      <Box className={classes.btnIcon} onClick={() => onNavigate('NEXT')}>
        <ChevronRightIcon sx={{ color: '#333', fontSize: 14 }} />
      </Box>
    </Stack>
  );
};
