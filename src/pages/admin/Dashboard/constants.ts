import { DailyTicketIcon, DailyPackageIcon, DailyPassengerIcon, DailyParcelsIcon } from 'assets';
import { CardDasboardProps } from 'components/CardDashboard/CardDasboard';

export const statisTics: CardDasboardProps[] = [
  {
    icon: DailyTicketIcon,
    text: 'daily_ticket',
  },
  {
    icon: DailyPackageIcon,
    text: 'daily_package',
  },
  {
    icon: DailyPassengerIcon,
    text: 'daily_passenger',
  },
  {
    icon: DailyParcelsIcon,
    text: 'daily_parcel',
  },
];

export const vehiclesOperations = [
  { car: 'Mercedes', value: 'DX728AM' },
  { car: 'Mercedes', value: 'DX728AM' },
  { car: 'Mercedes', value: 'DX728AM' },
  { car: 'Mercedes', value: 'DX728AM' },
  { car: 'Mercedes', value: 'DX728AM' },
  { car: 'Mercedes', value: 'DX728AM' },
];

export const columnsRoutes = [
  { field: 'route', width: 120 },
  { field: 'times', width: 60 },
  { field: 'ECOseats', width: 60 },
  { field: 'VIPseats', width: 60 },
];

export const routes = [
  { id: 1, routes: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], times: '10h30', ECOseats: 44, VIPseats: 38 },
  { id: 2, routes: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], times: '10h30', ECOseats: 44, VIPseats: 38 },
  { id: 3, routes: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], times: '10h30', ECOseats: 44, VIPseats: 38 },
  { id: 4, routes: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], times: '10h30', ECOseats: 44, VIPseats: 38 },
  { id: 5, routes: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], times: '10h30', ECOseats: 44, VIPseats: 38 },
  { id: 6, routes: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], times: '10h30', ECOseats: 44, VIPseats: 38 },
];
