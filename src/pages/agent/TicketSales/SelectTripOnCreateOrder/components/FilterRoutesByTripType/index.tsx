import { Box } from '@mui/material';
import { Segmented } from 'antd';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectTripFormValues } from '../../SelectTripOnCreateOrder';
import 'antd/lib/segmented/style/css';
import { useStyles } from './useStyles';

interface FilterRoutesByTripTypeProps {
  onChange: (tripType: SelectTripFormValues['tripType']) => void;
  tripType: SelectTripFormValues['tripType'];
}

const TRIP_TYPES: Array<SelectTripFormValues['tripType']> = ['ONE_TRIP', 'MULTI_STOP'];
export const FilterRoutesByTripType = ({ onChange, tripType }: FilterRoutesByTripTypeProps) => {
  const { t } = useTranslation(['ticketSales']);
  const classes = useStyles();

  const [state, setState] = useState<SelectTripFormValues['tripType']>(tripType);

  useEffect(() => {
    if (!equals(tripType, state)) {
      onChange(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (!equals(tripType, state)) {
      setState(tripType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripType]);

  return (
    <Box display="flex" justifyContent="center">
      <Segmented
        className={classes.segmented}
        value={tripType}
        onChange={value => onChange(value as SelectTripFormValues['tripType'])}
        options={TRIP_TYPES.map(TRIP_TYPE => ({
          icon: null,
          value: TRIP_TYPE,
          title: TRIP_TYPE,
          label: <Box className={classes.segmentedItem}>{TRIP_TYPE === 'ONE_TRIP' ? t('ticketSales:oneway') : t('ticketSales:round_trip')}</Box>,
        }))}
      />
    </Box>
  );
};
