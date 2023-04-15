import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Alert } from 'antd';
import Button from 'components/Button/Button';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import CalendarIcon from 'components/SvgIcon/CalendarIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, SlotInfo, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import { dateClamp } from 'utils/dateClamp';
import EditPriceTrip from '../EditPriceTrip';
import './styles.scss';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  locales,
  startOfWeek,
  getDay,
});

const useStyles = makeStyles(() => ({
  btnIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  selectedDate: {
    background: 'rgba(232, 246, 253, 1)',
    padding: '8px 16px',
    borderRadius: '24px',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#45485E',
  },
}));

export interface StepThreeValues {
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
}

interface StepThreeProps {
  onCancel?: () => void;
  isEdit?: boolean;
}

// FIXME: RESET FORM VALUES
export default function StepThree({ onCancel, isEdit }: StepThreeProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<StepThreeValues>();

  const navigate = useNavigate();

  const { t } = useTranslation(['routers', 'translation', 'message_error']);
  const classes = useStyles();

  const [selectedSlot, setSelectedSlot] = useState<SlotInfo['slots']>([]);
  const [open, setOpen] = useState(false);
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);

  const { route, statusRemoveDayActive, statusUpdateTicketPrices } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.();
  };

  const handleCloseDialogEdit = () => setSelectedSlot([]);

  const handleOpenDialogConfirmDelete = () => setOpenDialogConfirmDelete(true);
  const handleCloseDialogConfirmDelete = () => setOpenDialogConfirmDelete(false);

  const handleRemoveActiveDay = () => {
    if (route) {
      dispatch(
        routesActions.removeDayActiveRequest({
          routeCode: route.routeCode,
          data: { routeCode: route.routeCode, dayoff: selectedSlot[0].setHours(12) },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('routers:route') })} />, {
              className: 'toast-success',
            });
            handleCloseDialogEdit();
          },
          onFailure: message => {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('routers:route') })} description={message} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  const handleUpdateTicketPrices = (formValues: StepThreeValues) => {
    if (route) {
      dispatch(
        routesActions.updateTicketPricesRequest({
          routeCode: route.routeCode,
          data: {
            routeCode: route.routeCode,
            particularDay: selectedSlot[0].setHours(12),
            routeParticulars: route.routePoints.map(routePoint => ({
              routePointId: routePoint._id,
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
            })),
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('routers:route') })} />, {
              className: 'toast-success',
            });
            handleCloseDialogEdit();
          },
          onFailure: message => {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('routers:route') })} description={message} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  const isDateClampRouterPeriod = (timestamp: number) => {
    return (
      route &&
      typeof route.startPeriod === 'number' &&
      typeof route.endPeriod === 'number' &&
      dateClamp(timestamp, route.startPeriod, route.endPeriod)
    );
  };

  useEffect(() => {
    // FIXME: RESET FORM VALUES -> Đang k có cái gì từ response trả về có thể làm chức năng này
    if (route) {
      reset({
        ecoAdult: route.routePoints[0].ECOPrices?.ADULT,
        ecoChildren: route.routePoints[0].ECOPrices?.CHILD,
        ecoStudent: route.routePoints[0].ECOPrices?.STUDENT,
        vipAdult: route.routePoints[0].VIPPrices?.ADULT,
        vipChildren: route.routePoints[0].VIPPrices?.CHILD,
        vipStudent: route.routePoints[0].VIPPrices?.STUDENT,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const renderDialogEdit = () => {
    if (!selectedSlot.length) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogEdit}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>{t('routers:edit_ticket_prices')}</DialogTitle>
            <IconButton onClick={handleCloseDialogEdit}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Box className={classes.selectedDate}>
            <CalendarIcon />
            <span style={{ marginLeft: 4 }}>{dayjs(selectedSlot[0]).format('dddd, MM/DD/YYYY')}</span>
          </Box>
          <EditPriceTrip errors={errors} control={control as any} />
          <ComboButton
            textCancel={t('translation:delete')}
            onCancel={handleOpenDialogConfirmDelete}
            onSave={handleSubmit(handleUpdateTicketPrices)}
            isSaving={statusUpdateTicketPrices === 'loading'}
            isDeleting={statusRemoveDayActive === 'loading'}
          />
        </Box>
      </Dialog>
    );
  };

  const renderDialogConfirmDelete = () => {
    return (
      <Dialog open={openDialogConfirmDelete} onClose={handleCloseDialogConfirmDelete}>
        <Box padding="24px" style={{ maxWidth: 311, textAlign: 'center' }}>
          <Typography marginBottom="24px" fontSize="16px" fontWeight={700}>
            {t('translation:delete_record_title')}
          </Typography>
          <Typography marginBottom="30px" fontSize="14px" fontWeight={400}>
            {t('translation:delete_record_message')}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Button
              variant="outlined"
              sx={{
                margin: '0 6px',
                color: '#1AA6EE',
                padding: '10px 40px',
              }}
              onClick={handleCloseDialogConfirmDelete}
            >
              {t('translation:cancel')}
            </Button>
            <Button
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                handleCloseDialogConfirmDelete();
                handleRemoveActiveDay();
              }}
            >
              {t('translation:delete')}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  const renderAlertSuccess = () => {
    return (
      <Alert
        closable
        showIcon
        type="success"
        className="alertSuccess"
        message={
          <Box>
            <Typography className="alert__title">{t('routers:alert_title')}</Typography>
            <Typography className="alert__description">{t('routers:alert__description_1')}</Typography>
            <Typography className="alert__description">{t('routers:alert__description_2')}</Typography>
          </Box>
        }
      />
    );
  };

  if (!route) {
    return <EmptyScreen description={t('message_error:ROUTE_NOT_FOUND')} />;
  }

  return (
    <Box my="24px">
      {renderAlertSuccess()}
      <Calendar
        selectable
        defaultDate={route.startPeriod ? new Date(route.startPeriod) : undefined}
        localizer={localizer}
        style={{ height: 500 }}
        defaultView="month"
        toolbar={true}
        views={[Views.MONTH]}
        className="router custom-big-calendar"
        components={{
          toolbar: ({ label, onNavigate }) => {
            return (
              <Stack direction="row" alignItems="center" justifyContent="space-between" border="1px solid #ddd" py="10px">
                <Box className={classes.btnIcon} onClick={() => onNavigate('PREV')}>
                  <ChevronLeftIcon sx={{ color: '#333', fontSize: 20 }} />
                </Box>
                <Typography fontSize={18} fontWeight={700}>
                  {label}
                </Typography>
                <Box className={classes.btnIcon} onClick={() => onNavigate('NEXT')}>
                  <ChevronRightIcon sx={{ color: '#333', fontSize: 14 }} />
                </Box>
              </Stack>
            );
          },
          month: {
            header: ({ label }) => {
              return (
                <Box padding="8px 14px" textAlign="center" fontSize="14px">
                  {label}
                </Box>
              );
            },
            dateHeader: ({ label }) => {
              return <Box textAlign="center">{label}</Box>;
            },
          },
          dateCellWrapper: ({ children }) => {
            return (
              <Box
                display="flex"
                className="cell_wrapper"
                flex="1 0"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                {children}
              </Box>
            );
          },
          event: ({ title }) => {
            return <div>{title}</div>;
          },
        }}
        onSelectSlot={event => {
          setSelectedSlot(event.slots);
        }}
        dayPropGetter={date => {
          if (isDateClampRouterPeriod(date.getTime())) {
            return {
              className: 'selectable',
            };
          }
          return {};
        }}
        events={[
          ...route.dayoffs.map<Event>(dayoff => ({
            start: new Date(dayoff),
            end: new Date(dayoff),
            allDay: true,
            title: t('translation:off'),
          })),
          ...route.particularDays.map<Event>(particularDay => ({
            start: new Date(particularDay),
            end: new Date(particularDay),
            title: t('translation:edited'),
          })),
        ]}
      />
      <ComboButton
        textOk={t('translation:save')}
        textCancel={t('translation:back')}
        onCancel={handleCancel}
        onSave={() => {
          toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('routers:route') })} />, {
            className: 'toast-success',
          });
          navigate('/admin/routers');
        }}
      />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(`routers:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
      {renderDialogEdit()}
      {renderDialogConfirmDelete()}
    </Box>
  );
}
