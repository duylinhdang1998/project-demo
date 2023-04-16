import { Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface InformationProps {
  left: ReactNode;
  right: ReactNode;
}

export const Infomation = ({ left, right }: InformationProps) => {
  return (
    <Grid container spacing={2} my="2px">
      <Grid item xs={3}>
        <Typography variant="body2">{left}</Typography>
      </Grid>
      <Grid item xs={9}>
        {right}
      </Grid>
    </Grid>
  );
};
