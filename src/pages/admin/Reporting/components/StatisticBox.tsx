import { Box } from '@mui/material';

interface Props {
  title: string;
  total: string;
  color: '#0A89CA' | '#33CC7F';
}

export const StatisticBox = ({ title, total, color }: Props) => {
  return (
    <Box
      sx={{ background: '#ffffff', display: 'flex' }}
      padding="12px 16px"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="8px"
      minWidth="250px"
      // boxShadow="0px 4px 16px 0px rgba(0, 0, 0, 0.10)"
    >
      <span style={{ fontSize: 14, color: '#858C93' }}>{title}:</span>
      <span style={{ fontSize: 18, fontWeight: 700, color }}>{total}</span>
    </Box>
  );
};
