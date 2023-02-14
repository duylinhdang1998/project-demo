import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';
import { Ticket } from 'models/Ticket';

const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];
const paymentsStatus: Option[] = [
  { key: 'paid', value: 'paid', label: 'Paid' },
  { key: 'not_paid', value: 'not_paid', label: 'Not Paid' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'departures_point', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'arrival_points', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'order_date', type: 'datetime' },
  { id: uuidv4(), label: 'payment_status', options: paymentsStatus, type: 'select' },
  { id: uuidv4(), label: 'order_id', type: 'text', placeholder: 'order_id' },
];

export const fieldsSearch2: Field[] = [
  { id: uuidv4(), label: 'departures_point', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'arrival_points', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'order_date', type: 'datetime' },
  { id: uuidv4(), label: 'order_id', type: 'text', placeholder: 'order_id' },
];

export const keysFieldsSearch = ['departures_point', 'arrival_points', 'payment_status', 'order_id'] as const;

export const dataTicketDemo = () => {
  const data: Ticket[] = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      id: uuidv4(),
      lastName: 'Payoun-' + i.toString(),
      firstName: 'Samia',
      trip: ['Lyon Gare Perrache', 'Lyon Gare Perrache'],
      createdBy: i % 3 === 1 ? 'Client' : 'Agent',
      paxCount: i,
      payment_status: i % 2 === 0 ? 'Paid' : 'Not paid',
      dateTime: new Date(),
      orderId: '6699',
    });
  }
  return data;
};
