import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface AntTableColumnDisplayAsTypographProps {
  children: ReactNode;
}

export const AntTableColumnDisplayAsTypograph = ({ children }: AntTableColumnDisplayAsTypographProps) => {
  return (
    <Typography color="rgba(12, 17, 50, 1)" fontSize="14px">
      {children}
    </Typography>
  );
};
