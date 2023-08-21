import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ReactNode } from 'react';

export interface InformationProps {
  left: ReactNode;
  right: ReactNode;
}

export const Infomation = ({ left, right }: InformationProps) => {
  return (
    <Grid container spacing="8px">
      <Grid item xs={5.5} display="flex" alignItems="center">
        <Typography py="8px" fontSize="14px">
          {left}:
        </Typography>
      </Grid>
      <Grid item xs={6.5} display="flex" alignItems="center">
        <Stack>{right}</Stack>
      </Grid>
    </Grid>
  );
};
