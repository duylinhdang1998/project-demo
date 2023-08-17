import { TFunction } from 'i18next';
import { Passenger } from '../../@types/FormValues';

export const getTypeTicketOptions = (t: TFunction): Array<Passenger['typeTicket']> => {
  return [
    { key: 'adult', value: 'ADULT', label: t('translation:ADULT') },
    { key: 'student', value: 'STUDENT', label: t('translation:STUDENT') },
    { key: 'children', value: 'CHILD', label: t('translation:CHILD') },
  ];
};

export const seatsTypeOptions: Array<Passenger['seatsType']> = [
  { key: 'eco', value: 'ECO', label: 'ECO' },
  { key: 'vip', value: 'VIP', label: 'VIP' },
];
