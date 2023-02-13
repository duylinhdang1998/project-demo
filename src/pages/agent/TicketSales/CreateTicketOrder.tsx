import SearchIcon from '@mui/icons-material/Search';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import LayoutDetail from 'layout/LayoutDetail';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CardSelectTrip from './components/CardSelectTrip';
import FilterBy from './components/FilterBy';
import { fields } from './constants';

interface Values {
  departures_point: string;
  arrival_points: string;
  departure_time: string;
}

export const useStyles = makeStyles((theme: Theme) => ({
  highlightText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: '400',
    fontSize: 12,
    color: theme.palette.grey[100],
  },
}));

export default function CreateTicketOrder() {
  const { t } = useTranslation(['ticketSales']);
  const navigate = useNavigate();
  const { control } = useForm<Values>();
  const matches = useMediaQuery('(max-width:768px)');
  const classes = useStyles();

  const handleSelect = () => {
    navigate('/agent/traveller-contact-details');
  };

  return (
    <LayoutDetail title={t('create_ticket_orders')} subTitle={t('sidebar.ticket_sale')}>
      <CardWhite title={t('select_your_trip')}>
        <Grid container sx={{ margin: '20px 0' }} rowSpacing="24px" columnSpacing="0">
          <Grid item xs={12} md={11}>
            <FilterTicket fields={fields} control={control} filterKey="ticketSales" numberColumns={3} />
          </Grid>
          <Grid item xs={12} md={1} sx={{ alignSelf: 'flex-end' }}>
            <Button backgroundButton="#1AA6EE" fullWidth={matches}>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing="24px">
          <Grid item xs={12} sm={6} md={4}>
            <FilterBy />
          </Grid>
          <Grid item xs={12} md={8}>
            <Highlighter textToHighlight={`5 trips found`} highlightClassName={classes.highlightText} searchWords={['5']} autoEscape={true} className={classes.title} />
            <CardSelectTrip
              timeStart="08:30"
              timeEnd="10:30"
              placeStart="Lyon Gare Perrache"
              placeEnd="Paris Gare Perrache"
              price={20}
              duration="about 2 hours"
              vehicle="Mercedes S450"
              onSelect={handleSelect}
            />
          </Grid>
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
}
