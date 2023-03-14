import { DailyTicketIcon, DailyPackageIcon, DailyPassengerIcon, DailyParcelsIcon } from 'assets';
import { CardDasboardProps } from 'components/CardDashboard/CardDasboard';

export const statisTics: CardDasboardProps[] = [
  {
    icon: DailyTicketIcon,
    text: 'daily_ticket',
    unit: '$',
    value: 'TICKET_MONEY_DAILY',
  },
  {
    icon: DailyPackageIcon,
    text: 'daily_package',
    unit: '$',
    value: 'PACKAGE_MONEY_DAILY',
  },
  {
    icon: DailyPassengerIcon,
    text: 'daily_passenger',
    value: 'PASSENGER_DAILY',
  },
  {
    icon: DailyParcelsIcon,
    text: 'daily_parcel',
    value: 'PARCELS_DAILY',
  },
];

export const columnsRoutes = [
  { field: 'route', width: 120 },
  { field: 'times', width: 60 },
  { field: 'ECOseats', width: 60 },
  { field: 'VIPseats', width: 60 },
];
