import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface AntTableColumnTitleProps {
  children: ReactNode;
}

export const AntTableColumnTitle = ({ children }: AntTableColumnTitleProps) => {
  return (
    <Typography color="rgba(133, 140, 147, 1)" fontWeight={500} fontSize="14px">
      {children}
    </Typography>
  );
};
