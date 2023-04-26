import { Passenger } from '../../@types/FormValues';
import { GeneralInfomationOfTicket } from '../../@types/GeneralInfomationOfTicket';

export const getTotalPriceForTicketOfPassenger = ({
  passenger,
  generalInfomationOfTicket,
}: {
  passenger: Passenger;
  generalInfomationOfTicket: GeneralInfomationOfTicket;
}) => {
  const seatsTypePricesKey = passenger.seatsType.value && `${passenger.seatsType.value}Prices`;
  const ticketTypePriceKey = passenger.typeTicket.value;

  const departureTrip = generalInfomationOfTicket.type === 'ONE_WAY' ? generalInfomationOfTicket.data : generalInfomationOfTicket.data.departureTrip;
  const departureTripSeatsTypePrices = seatsTypePricesKey && departureTrip.routePoint?.[seatsTypePricesKey];
  const departureTripTicketPrice = departureTripSeatsTypePrices && ticketTypePriceKey ? departureTripSeatsTypePrices[ticketTypePriceKey] : 0;

  const returnTrip = generalInfomationOfTicket.type === 'ROUND_TRIP' ? generalInfomationOfTicket.data.returnTrip : null;
  const returnTripSeatsTypePrices = returnTrip && seatsTypePricesKey && returnTrip.routePoint?.[seatsTypePricesKey];
  const returnTripTicketPrice = returnTripSeatsTypePrices && ticketTypePriceKey ? returnTripSeatsTypePrices[ticketTypePriceKey] : 0;
  return departureTripTicketPrice + returnTripTicketPrice;
};
