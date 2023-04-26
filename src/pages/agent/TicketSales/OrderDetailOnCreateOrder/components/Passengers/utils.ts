import { v4 } from 'uuid';
import { Passenger } from '../../@types/FormValues';
import { seatsTypeOptions, typeTicketOptions } from './const';

export const getEmptyPassenger = (): Passenger => ({
  firstName: '',
  lastName: '',
  typeTicket: typeTicketOptions.find(option => option.value === 'ADULT') as Passenger['typeTicket'],
  seatsType: seatsTypeOptions.find(option => option.value === 'ECO') as Passenger['seatsType'],
  uniqKey: v4(),
});
