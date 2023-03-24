import { Box, Checkbox, Chip, FormControlLabel, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NumberCount from 'components/NumberCount/NumberCount';
import { equals } from 'ramda';
import { FilterRoutesFormValues } from '../SelectTripOnCreateTicketSale';

export type FilterByTripTypeFormValues = Pick<FilterRoutesFormValues, 'totalPax' | 'tripType'>;

export interface FilterRoutesByTripTypeProps {
  onChange: (values: FilterByTripTypeFormValues) => void;
  counts: Record<FilterByTripTypeFormValues['tripType'][number], number>;
  values: FilterByTripTypeFormValues;
}

const TRIP_TYPES: Array<FilterByTripTypeFormValues['tripType']> = ['ONE_TRIP', 'MULTI_STOP'];
export const FilterRoutesByTripType = ({ onChange, counts, values }: FilterRoutesByTripTypeProps) => {
  const { t } = useTranslation(['ticketSales']);

  const [state, setState] = useState<FilterByTripTypeFormValues>(values);

  useEffect(() => {
    if (!equals(values, state)) {
      onChange(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    if (!equals(values, state)) {
      setState(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box sx={{ position: 'sticky', top: '1rem' }}>
      <Typography component="p" variant="textBold" sx={{ marginBottom: '16px' }}>
        {t('filter_by')}
      </Typography>
      <Box border="1px solid #D7DADC" borderRadius="4px" padding="16px 14px">
        <Typography variant="body2">{t('trip')}</Typography>
        {TRIP_TYPES.map(TRIP_TYPE => {
          const label = TRIP_TYPE === 'ONE_TRIP' ? t('ticketSales:oneway') : t('ticketSales:round_trip');
          return (
            <Stack key={TRIP_TYPE} direction="row" alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={e => {
                      const checked = e.target.checked;
                      if (checked) {
                        setState(state => ({
                          ...state,
                          tripType: state.tripType !== TRIP_TYPE ? TRIP_TYPE : state.tripType,
                        }));
                      }
                    }}
                    checked={state.tripType.includes(TRIP_TYPE)}
                  />
                }
                label={label}
              />
              <Chip label={counts[TRIP_TYPE]} sx={{ backgroundColor: '#E8F6FD' }} />
            </Stack>
          );
        })}
        <Typography variant="body2">{t('pax')}</Typography>
        <NumberCount onChangeValue={value => setState({ ...state, totalPax: value })} value={state.totalPax} />
      </Box>
    </Box>
  );
};
