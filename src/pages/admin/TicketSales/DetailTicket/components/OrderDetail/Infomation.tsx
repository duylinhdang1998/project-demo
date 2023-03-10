import { Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface InformationProps {
  left: ReactNode;
  right: ReactNode;
}

export const Infomation = ({ left, right }: InformationProps) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography py="8px" fontSize="14px">
          {left}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        {right}
      </Grid>
    </Grid>
  );
};
