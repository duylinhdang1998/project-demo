import { Passenger } from '../../@types/FormValues';
import { GeneralInfomationOfOrder } from '../../@types/GeneralInfomationOfOrder';

export const getTotalPriceForTicketOfPassenger = ({
  passenger,
  generalInfomationOfTicket,
}: {
  passenger: Passenger;
  generalInfomationOfTicket: GeneralInfomationOfOrder;
}) => {
  const seatsTypePricesKey = passenger.seatsType.value && `${passenger.seatsType.value}Prices`;
  const ticketTypePriceKey = passenger.typeTicket.value;

  const departureTrip = generalInfomationOfTicket.type === 'ONE_TRIP' ? generalInfomationOfTicket.data : generalInfomationOfTicket.data.departureTrip;
  const departureTripSeatsTypePrices = seatsTypePricesKey && departureTrip.routePoint?.[seatsTypePricesKey];
  const departureTripTicketPrice = departureTripSeatsTypePrices && ticketTypePriceKey ? departureTripSeatsTypePrices[ticketTypePriceKey] : 0;

  const returnTrip = generalInfomationOfTicket.type === 'ROUND_TRIP' ? generalInfomationOfTicket.data.returnTrip : null;
  const returnTripSeatsTypePrices = returnTrip && seatsTypePricesKey && returnTrip.routePoint?.[seatsTypePricesKey];
  const returnTripTicketPrice = returnTripSeatsTypePrices && ticketTypePriceKey ? returnTripSeatsTypePrices[ticketTypePriceKey] : 0;
  return departureTripTicketPrice + returnTripTicketPrice;
};
