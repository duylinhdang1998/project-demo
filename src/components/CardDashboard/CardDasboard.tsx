import { Card, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { memo } from 'react';

export interface CardDasboardProps {
  icon?: string;
  text?: string;
  unit?: string;
  value?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
    [theme.breakpoints.down('laptop')]: {
      width: 28,
      height: 28,
      marginRight: 8,
    },
  },
  container: {
    boxShadow: '0px 8px 12px rgba(128, 128, 128, 0.04)',
    borderRadius: '8px !important',
    border: 'none !important',
    height: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function CardDasboard({ icon, text, unit, value }: CardDasboardProps) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box height="100%">
      <Card variant="outlined" className={classes.container}>
        <Box display="flex" flex={1} alignItems="center" mb="16px">
          <img src={icon} className={classes.icon} />
          <Typography fontSize={{ mobile: 11, tablet: 14, desktop: 16 }} fontWeight={400} color={theme.palette.grey[300]}>
            {text}
          </Typography>
        </Box>
        <Typography
          component="span"
          sx={{
            marginTop: 'auto',
          }}
          fontSize={{ mobile: 14, desktop: 24 }}
          fontWeight={700}
          color={theme.palette.grey[100]}
        >
          {value} {unit}
        </Typography>
      </Card>
    </Box>
  );
}

export default memo(CardDasboard);
