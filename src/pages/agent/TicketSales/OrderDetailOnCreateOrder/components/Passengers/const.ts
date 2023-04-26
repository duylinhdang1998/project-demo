import { Passenger } from '../../@types/FormValues';

export const typeTicketOptions: Array<Passenger['typeTicket']> = [
  { key: 'adult', value: 'ADULT', label: 'Adult (26-59)' },
  { key: 'student', value: 'STUDENT', label: 'Student (16-25)' },
  { key: 'children', value: 'CHILD', label: 'Children (1-15)' },
];

export const seatsTypeOptions: Array<Passenger['seatsType']> = [
  { key: 'eco', value: 'ECO', label: 'ECO' },
  { key: 'vip', value: 'VIP', label: 'VIP' },
];
