import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';

const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];

export const fields: Field[] = [
  { id: uuidv4(), label: 'departures_point', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'arrival_points', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'departure_time', type: 'datetime' },
];
