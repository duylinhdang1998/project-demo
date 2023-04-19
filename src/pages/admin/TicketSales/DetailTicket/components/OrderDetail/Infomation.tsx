import { Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface InformationProps {
  left: ReactNode;
  right: ReactNode;
}

export const Infomation = ({ left, right }: InformationProps) => {
  return (
    <Grid container>
      <Grid item xs={5.5}>
        <Typography py="8px" fontSize="14px">
          {left}:
        </Typography>
      </Grid>
      <Grid item xs={6.5}>
        {right}
      </Grid>
    </Grid>
  );
};
