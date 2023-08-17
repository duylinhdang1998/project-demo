import { v4 } from 'uuid';
import { Passenger } from '../../@types/FormValues';
import { seatsTypeOptions, getTypeTicketOptions } from './const';
import { TFunction } from 'i18next';

export const getEmptyPassenger = (t: TFunction): Passenger => ({
  firstName: '',
  lastName: '',
  typeTicket: getTypeTicketOptions(t).find(option => option.value === 'ADULT') as Passenger['typeTicket'],
  seatsType: seatsTypeOptions.find(option => option.value === 'ECO') as Passenger['seatsType'],
  uniqKey: v4(),
});
