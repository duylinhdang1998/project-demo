import SearchIcon from '@mui/icons-material/Search';
import { Grid, useMediaQuery } from '@mui/material';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import { Field } from 'models/Field';
import { Control } from 'react-hook-form';
import { v4 } from 'uuid';
import { SelectTripFormValues } from '../SelectTripOnCreateTicketSale';

const fields: Field[] = [
  { id: v4(), label: 'departurePoint', type: 'departurePoint' },
  { id: v4(), label: 'arrivalPoint', type: 'arrivalPoint' },
  { id: v4(), label: 'departureTime', type: 'datetime', showTime: true, format: 'HH:mm MM-DD-YYYY' },
];

export interface FilterRoutesBySearcherProps {
  onSubmit: () => void;
  loading: boolean;
  control: Control<SelectTripFormValues>;
}

export const FilterRoutesBySearcher = ({ onSubmit, loading, control }: FilterRoutesBySearcherProps) => {
  const matches = useMediaQuery('(max-width:768px)');

  return (
    <Grid container sx={{ margin: '20px 0' }}>
      <Grid item xs={12} md={11}>
        <FilterTicket fields={fields} control={control} filterKey="ticketSales" numberColumns={3} />
      </Grid>
      <Grid item xs={12} md={1} sx={{ alignSelf: 'flex-end' }}>
        <Button loading={loading} onClick={onSubmit} backgroundButton="#1AA6EE" fullWidth={matches}>
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
