import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { memo, ReactNode } from 'react';

interface CardWhiteProps {
  children: ReactNode;
  title?: string;
}

function CardWhite({ children, title }: CardWhiteProps) {
  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '90%' }} padding="24px">
        <Typography color="#0c1132" fontWeight={700}>
          {title}
        </Typography>
        <Divider sx={{ margin: '16px 0' }} />
        {children}
      </Box>
    </Box>
  );
}

export default memo(CardWhite);
