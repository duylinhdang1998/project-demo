import ClearIcon from '@mui/icons-material/Clear';
import { Box, Dialog, DialogTitle, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Pagination } from 'antd';
import 'antd/lib/pagination/style/css';
import Button from 'components/Button/Button';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import { ArrowIcon } from 'components/SvgIcon/ArrowIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { RoutePoint } from 'services/models/Route';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import EditPriceTrip from '../EditPriceTrip';
import { DialogMultiStopTripDetailProps } from './DialogMultiStopTripDetail';

export const useStyles = makeStyles(() => ({
  titleIcon: {
    background: 'rgba(255, 138, 0, 1) !important',
    width: '12px !important',
    height: '20px !important',
    borderRadius: '4px !important',
    marginRight: '8px !important',
  },
  titleText: {
    color: 'rgba(69, 72, 94, 1) !important',
    fontWeight: '700 !important',
    fontSize: '14px !important',
  },
  routePointContainer: {
    marginBottom: '16px !important',
    border: '1px solid #F7F7F7 !important',
    borderRadius: '8px !important',
  },
  routePointTitle: {
    color: 'rgba(133, 140, 147, 1) !important',
    fontSize: '12px !important',
  },
  routePointValue: {
    color: 'rgba(69, 72, 94, 1) !important',
    fontSize: '14px !important',
    fontWeight: '500 !important',
  },
  ticketTypeIcon: {
    width: '34px !important',
    height: '18px !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifyContent: 'center !important',
    borderRadius: '4px !important',
    fontSize: '10px !important',
    color: 'rgba(255, 255, 255, 1) !important',
  },
  ticketTypeTitle: {
    fontSize: '12px !important',
    marginRight: '8px !important',
    color: 'rgba(133, 140, 147, 1) !important',
  },
  ticketTypeValue: {
    fontWeight: '500 !important',
    color: 'rgba(69, 72, 94, 1) !important',
    fontSize: '12px !important',
  },
  ticketTypePrice: {},
  ticketTypeDivider: {
    borderRight: '0.5px solid rgba(215, 218, 220, 1) !important',
    borderLeft: '0.5px solid rgba(215, 218, 220, 1) !important',
    textAlign: 'center !important' as any,
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  totalRoutesValue: {
    color: 'rgba(71, 84, 97, 1) !important',
    fontWeight: '500 !important',
    fontSize: '14px !important',
    marginRight: '6px !important',
  },
  totalRoutesTitle: {
    color: 'rgba(133, 140, 147, 1) !important',
    fontWeight: '500 !important',
    fontSize: '14px !important',
  },
}));

const RECORD_PER_PAGE = 2;

interface FormEditPriceValues {
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
}

export const SubRoute = ({ route }: DialogMultiStopTripDetailProps) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormEditPriceValues>();

  const classes = useStyles();
  const { t } = useTranslation(['routers']);

  const { statusUpdateTicketPrices } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [openRoutePoint, setOpenRoutePoint] = useState<RoutePoint | null>(null);

  const subRoutes = useMemo(() => {
    return route.routePoints.filter(routePoint => routePoint.routeType === 'SUB_ROUTE');
  }, [route]);

  const handleOpenDialogEditPrice = (routePoint: RoutePoint) => {
    setOpenRoutePoint(routePoint);
    reset({
      ecoAdult: routePoint.ECOPrices?.ADULT,
      ecoChildren: routePoint.ECOPrices?.CHILD,
      ecoStudent: routePoint.ECOPrices?.STUDENT,
      vipAdult: routePoint.VIPPrices?.ADULT,
      vipChildren: routePoint.VIPPrices?.CHILD,
      vipStudent: routePoint.VIPPrices?.STUDENT,
    });
  };
  const handleCloseDialogEditPrice = () => {
    setOpenRoutePoint(null);
  };

  const handleUpdatePrice = (formValues: FormEditPriceValues) => {
    if (openRoutePoint) {
      dispatch(
        routesActions.updateTicketPricesRequest({
          routeCode: route.routeCode,
          data: {
            particularDay: 0,
            routeCode: route.routeCode,
            routeParticulars: [
              {
                routePointId: openRoutePoint._id,
                ECOPrices: [
                  { passengerType: 'ADULT', price: Number(formValues.ecoAdult) },
                  { passengerType: 'CHILD', price: Number(formValues.ecoChildren) },
                  { passengerType: 'STUDENT', price: Number(formValues.ecoStudent) },
                ],
                VIPPrices: [
                  { passengerType: 'ADULT', price: Number(formValues.vipAdult) },
                  { passengerType: 'CHILD', price: Number(formValues.vipChildren) },
                  { passengerType: 'STUDENT', price: Number(formValues.vipStudent) },
                ],
              },
            ],
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('routers:route') })} />, {
              className: 'toast-success',
            });
            handleCloseDialogEditPrice();
          },
          onFailure() {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('routers:route') })} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  const renderDialogEditPrice = () => {
    if (!openRoutePoint) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogEditPrice}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>{t('routers:edit_price')}</DialogTitle>
            <IconButton onClick={handleCloseDialogEditPrice}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <EditPriceTrip errors={errors} control={control as any} />
          <ComboButton
            isSaving={statusUpdateTicketPrices === 'loading'}
            onCancel={handleCloseDialogEditPrice}
            onSave={handleSubmit(handleUpdatePrice)}
          />
        </Box>
      </Dialog>
    );
  };

  return (
    <Grid item style={{ minWidth: 500, flex: '1 0 auto' }}>
      {renderDialogEditPrice()}
      <Stack style={{ marginBottom: 24 }} direction="row" alignItems="center">
        <Box className={classes.titleIcon} />
        <Typography className={classes.titleText}>{t('routers:Sub_routes')}</Typography>
      </Stack>
      {subRoutes.slice(RECORD_PER_PAGE * (currentPage - 1), RECORD_PER_PAGE * currentPage + 1).map(routePoint => {
        return (
          <Box key={routePoint.routeCode} padding="16px" className={classes.routePointContainer}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography className={classes.routePointTitle} component="p">
                  {t('routers:start_point')}
                </Typography>
                <Typography className={classes.routePointValue} component="p">
                  {routePoint.departurePoint}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <ArrowIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.routePointTitle} component="p">
                  {t('routers:finish_point')}
                </Typography>
                <Typography className={classes.routePointValue} component="p">
                  {routePoint.stopPoint}
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" sx={{ margin: '16px 0', borderStyle: 'dashed' }} />
            <Box>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item flex="1 1 auto">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box className={classes.ticketTypeIcon} bgcolor="rgba(51, 204, 127, 1)">
                        {t('routers:ECO')}
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography component="span" className={classes.ticketTypeTitle}>
                          {t('routers:Adult')}:
                        </Typography>
                        <Typography component="span" className={classes.ticketTypeValue}>
                          {getAppCurrencySymbol()}
                          {routePoint.ECOPrices?.ADULT}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className={classes.ticketTypeDivider}>
                        <Typography component="span" className={classes.ticketTypeTitle}>
                          {t('routers:Student')}:
                        </Typography>
                        <Typography component="span" className={classes.ticketTypeValue}>
                          {getAppCurrencySymbol()}
                          {routePoint.ECOPrices?.STUDENT}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography component="span" className={classes.ticketTypeTitle}>
                          {t('routers:Children')}:
                        </Typography>
                        <Typography component="span" className={classes.ticketTypeValue}>
                          {getAppCurrencySymbol()}
                          {routePoint.ECOPrices?.CHILD}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box bgcolor="rgba(255, 182, 0, 1)" className={classes.ticketTypeIcon}>
                        {t('routers:VIP')}
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography component="span" className={classes.ticketTypeTitle}>
                          {t('routers:Adult')}:
                        </Typography>
                        <Typography component="span" className={classes.ticketTypeValue}>
                          {getAppCurrencySymbol()}
                          {routePoint.ECOPrices?.ADULT}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className={classes.ticketTypeDivider}>
                        <Typography component="span" className={classes.ticketTypeTitle}>
                          {t('routers:Student')}:
                        </Typography>
                        <Typography component="span" className={classes.ticketTypeValue}>
                          {getAppCurrencySymbol()}
                          {routePoint.ECOPrices?.STUDENT}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography component="span" className={classes.ticketTypeTitle}>
                          {t('routers:Children')}:
                        </Typography>
                        <Typography component="span" className={classes.ticketTypeValue}>
                          {getAppCurrencySymbol()}
                          {routePoint.ECOPrices?.CHILD}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    sx={{ border: '1px solid #1AA6EE' }}
                    backgroundButtonHover="rgba(26, 166, 238, 1)"
                    colorButtonHover="rgba(255, 255, 255, 1)"
                    backgroundButton="rgba(255, 255, 255, 1)"
                    colorButton="rgba(26, 166, 238, 1)"
                    onClick={() => handleOpenDialogEditPrice(routePoint)}
                  >
                    {t('translation:edit')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      })}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box>
            <Typography component="span" className={classes.totalRoutesValue} marginRight="6px">
              {subRoutes.length}
            </Typography>
            <Typography component="span" className={classes.totalRoutesTitle}>
              {t('routers:sub_routes')}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Pagination
            current={currentPage}
            onChange={page => setCurrentPage(page)}
            total={subRoutes.length}
            pageSize={RECORD_PER_PAGE}
            showLessItems
            showSizeChanger={false}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
