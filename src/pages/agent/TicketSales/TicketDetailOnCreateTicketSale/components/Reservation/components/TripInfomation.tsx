import { Box, Stack, Typography } from '@mui/material';
import { MapPinIcon, VehiclesBusIcon } from 'assets';
import ClockSvg from 'assets/images/clock.svg';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { Vehicle } from 'services/models/Vehicle';
import { getUrlImage } from 'utils/getUrlOfResource';

export interface TripInfomationProps {
  variant: 'ONE_WAY' | 'DEPARTURE_TRIP' | 'RETURN_TRIP';
  data: {
    dateFormatted: RouteOfTicketSale['dateQuery'];
    trip: {
      departurePoint?: RouteOfTicketSale['departurePoint'];
      stopPoint?: RouteOfTicketSale['stopPoint'];
    };
    vehicle?: Vehicle;
  };
}

const Title: FC = ({ children }) => (
  <Typography component="p" marginBottom="16px" color="rgba(12, 17, 50, 1)" fontWeight={600} fontSize="14px">
    {children}
  </Typography>
);

export const TripInfomation = ({ data, variant }: TripInfomationProps) => {
  const { t } = useTranslation(['ticketSales']);

  const renderDate = () => {
    const TitleMapping: Record<TripInfomationProps['variant'], string> = {
      DEPARTURE_TRIP: t('ticketSales:depatureDate'),
      ONE_WAY: t('ticketSales:date'),
      RETURN_TRIP: t('ticketSales:returnDate'),
    };
    return (
      <Box marginBottom="24px">
        <Title>{TitleMapping[variant]}</Title>
        <TextWithIcon icon={ClockSvg} color="#45485E" text={data.dateFormatted} />
      </Box>
    );
  };

  const renderPoints = () => {
    const PointMapping: Record<TripInfomationProps['variant'], string> = {
      DEPARTURE_TRIP: t('ticketSales:departure_trip'),
      ONE_WAY: t('ticketSales:trip'),
      RETURN_TRIP: t('ticketSales:return_trip'),
    };
    return (
      <Box marginBottom="24px">
        <Title>{PointMapping[variant]}</Title>
        <TextWithIcon
          text={data.trip.departurePoint}
          icon={MapPinIcon}
          color="#1AA6EE"
          typography={{
            fontSize: '14px',
          }}
        />
        <TextWithIcon
          text={data.trip.stopPoint}
          icon={MapPinIcon}
          color="#1AA6EE"
          typography={{
            fontSize: '14px',
          }}
        />
      </Box>
    );
  };

  const renderVehicle = () => {
    const vehicle = data.vehicle;
    return (
      <Box marginBottom="24px">
        <Title>{t('ticketSales:vehicle')}</Title>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src={VehiclesBusIcon} width={24} />
          <Typography sx={{ marginLeft: '8px !important' }} fontSize="14px" color="rgba(69, 72, 94, 1)">
            {vehicle?.brand} | {vehicle?.model}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const renderVehicleServices = () => {
    return (
      <Box>
        <Title>{t('ticketSales:service')}</Title>
        {data.vehicle?.services?.map(i => (
          <TextWithIcon icon={getUrlImage(i._id)} text={i.title} color="#45485E" />
        ))}
      </Box>
    );
  };

  return (
    <Box paddingY="24px" borderBottom="1px solid rgba(215, 218, 220, 1)">
      {renderDate()}
      {renderPoints()}
      {renderVehicle()}
      {renderVehicleServices()}
    </Box>
  );
};
