import SearchIcon from '@mui/icons-material/Search';
import { Grid, useMediaQuery } from '@mui/material';
import Button from 'components/Button/Button';
import FilterTicket, { FilterTicketProps } from 'components/FilterTicket/FilterTicket';
import { Field } from 'models/Field';
import { Control } from 'react-hook-form';
import { v4 } from 'uuid';
import { SelectTripFormValues } from '../SelectTripOnCreateOrder';
import { useMemo } from 'react';
import { disabledDate } from 'utils/disableDate';

const getFields = (tripType: SelectTripFormValues['tripType']): Field[] => {
  const fields: FilterTicketProps<any>['fields'] = [
    { id: v4(), required: true, label: 'departurePoint', type: 'departurePoint' },
    { id: v4(), required: true, label: 'arrivalPoint', type: 'arrivalPoint' },
    { id: v4(), required: true, label: 'departureTime', type: 'datetime', showTime: true, format: 'HH:mm DD-MM-YYYY', disabledDate: disabledDate },
  ];
  if (tripType === 'MULTI_STOP') {
    fields.push({ id: v4(), required: true, label: 'returnTime', type: 'datetime', showTime: true, format: 'HH:mm DD-MM-YYYY' });
  }
  return fields;
};

const fields2: FilterTicketProps<any>['fields'] = [
  { id: v4(), required: false, label: 'departurePoint', type: 'departurePoint' },
  { id: v4(), required: false, label: 'arrivalPoint', type: 'arrivalPoint' },
  { id: v4(), required: false, label: 'merchandises', type: 'packageSettings' },
  { id: v4(), required: false, label: 'departureTime', type: 'datetime', showTime: true, format: 'HH:mm DD-MM-YYYY', disabledDate: disabledDate },
];

export interface FilterRoutesBySearcherProps {
  onSubmit: () => void;
  loading: boolean;
  control: Control<SelectTripFormValues>;
  page?: 'packageSales' | 'ticketSales';
  tripType?: SelectTripFormValues['tripType'];
  errors?: any;
}

export const FilterRoutesBySearcher = ({
  onSubmit,
  loading,
  control,
  page = 'ticketSales',
  tripType = 'ONE_TRIP',
  errors,
}: FilterRoutesBySearcherProps) => {
  const matches = useMediaQuery('(max-width:768px)');

  const fieldsSearchTripType = useMemo(() => {
    return getFields(tripType);
  }, [tripType]);

  return (
    <Grid container sx={{ margin: '20px 0' }}>
      <Grid item xs={12} md={11}>
        <FilterTicket
          fields={page === 'packageSales' ? fields2 : fieldsSearchTripType}
          control={control}
          filterKey="ticketSales"
          numberColumns={2.5}
          errors={errors}
          alignItems="flex-start"
        />
      </Grid>
      <Grid item display="flex" xs={12} md={1} pt="24px" sx={{ justifyContent: 'flex-end' }}>
        <Button loading={loading} onClick={onSubmit} backgroundButton="#1AA6EE" fullWidth={matches}>
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  );
};
