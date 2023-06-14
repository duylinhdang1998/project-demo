import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Alert } from 'antd';
import Button from 'components/Button/Button';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { DialogTitle } from 'components/DialogTitle/DialogTitle';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import CalendarIcon from 'components/SvgIcon/CalendarIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { Calendar, CalendarProps, dateFnsLocalizer, Event, SlotInfo, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { DayInWeekMappingToString } from 'services/models/DayInWeek';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import { createArrayDateFromRange } from 'utils/createArrayDateFromRange';
import { dateClamp } from 'utils/dateClamp';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';
import { minutesToTimeString } from 'utils/timeStringNMinutes';
import { toDayjs } from 'utils/toDayjs';
import { EditPriceStepThreeOfForm, EditPriceStepThreeOfFormValues } from '../FormEditPrice/EditPriceStepThreeOfForm';
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

type StepThreeValues = EditPriceStepThreeOfFormValues;

interface StepThreeProps {
  onCancel?: () => void;
  isEdit?: boolean;
}

export default function StepThree({ onCancel, isEdit }: StepThreeProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm<StepThreeValues>({
    defaultValues: { priceOfRoutePoints: [] },
  });
  const priceOfRoutePoints = watch('priceOfRoutePoints');

  const navigate = useNavigate();

  const { t } = useTranslation(['routers', 'translation', 'message_error']);
  const classes = useStyles();

  const [selectedSlot, setSelectedSlot] = useState<{ date: SlotInfo['slots'][number]; isCreateDayoffAction: boolean } | null>(null);
  const [open, setOpen] = useState(false);
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);

  const { route, statusRemoveDayActive, statusUpdateParticularDayPrice } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();

  const isDateClampRouterPeriod = (timestamp: number) => {
    return (
      route &&
      typeof route.startPeriod === 'number' &&
      typeof route.endPeriod === 'number' &&
      dateClamp(timestamp, route.startPeriod, route.endPeriod)
    );
  };

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.();
  };

  const handleOpenDialogEdit: CalendarProps['onSelectSlot'] = event => {
    if (route) {
      const selected = new Date(event.slots[0].setHours(12));
      const isWorkingDay = route.dayActives.includes(DayInWeekMappingToString[selected.getDay()]);
      if (isWorkingDay && isDateClampRouterPeriod(selected.getTime())) {
        setSelectedSlot({
          date: selected,
          isCreateDayoffAction: !route.dayoffs.find(dayoff => isTimestampEqualDayInYear(dayoff, selected.getTime())),
        });
        reset({
          priceOfRoutePoints: route.routePoints.map(routePoint => {
            const particularPrice = route.particularPrices.find(item => {
              const applyDay = dayjs(item.applyDay);
              return isTimestampEqualDayInYear(applyDay.valueOf(), selected.getTime()) && routePoint._id === item.routePoint;
            });
            return {
              ecoAdult: particularPrice?.ECOPrices.ADULT ?? route.routePoints[0].ECOPrices?.ADULT,
              ecoChildren: particularPrice?.ECOPrices.CHILD ?? route.routePoints[0].ECOPrices?.CHILD,
              ecoStudent: particularPrice?.ECOPrices.STUDENT ?? route.routePoints[0].ECOPrices?.STUDENT,
              vipChildren: particularPrice?.VIPPrices.CHILD ?? route.routePoints[0].VIPPrices?.CHILD,
              vipStudent: particularPrice?.VIPPrices.STUDENT ?? route.routePoints[0].VIPPrices?.STUDENT,
              vipAdult: particularPrice?.VIPPrices.ADULT ?? route.routePoints[0].VIPPrices?.STUDENT,
              routePointId: routePoint._id,
              durationTime: toDayjs({
                value: minutesToTimeString(routePoint.durationTime),
                format: 'HH:mm',
              }),
              stopPoint: routePoint.stopPoint,
            };
          }),
        });
      }
    }
  };
  const handleCloseDialogEdit = () => setSelectedSlot(null);

  const handleOpenDialogConfirmDelete = () => setOpenDialogConfirmDelete(true);
  const handleCloseDialogConfirmDelete = () => setOpenDialogConfirmDelete(false);

  const handleToggleActiveDay = () => {
    if (route && selectedSlot) {
      dispatch(
        routesActions.toggleDayActiveRequest({
          targetRoute: route,
          data: {
            routeCode: route.routeCode,
            dayoff: selectedSlot.date.setHours(12),
            type: selectedSlot.isCreateDayoffAction ? 'ADD' : 'REMOVE',
          },
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('routers:trip').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            handleCloseDialogEdit();
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('routers:trip').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    }
  };

  const handleUpdateTicketPrices = (formValues: StepThreeValues) => {
    if (route && selectedSlot) {
      dispatch(
        routesActions.updateParticularDayPriceRequest({
          data: {
            routeCode: route.routeCode,
            particularDay: selectedSlot.date.setHours(12),
            routeParticulars: formValues.priceOfRoutePoints.map(item => ({
              routePointId: item.routePointId,
              ECOPrices: [
                { passengerType: 'ADULT', price: Number(item.ecoAdult) },
                { passengerType: 'CHILD', price: Number(item.ecoChildren) },
                { passengerType: 'STUDENT', price: Number(item.ecoStudent) },
              ],
              VIPPrices: [
                { passengerType: 'ADULT', price: Number(item.vipAdult) },
                { passengerType: 'CHILD', price: Number(item.vipChildren) },
                { passengerType: 'STUDENT', price: Number(item.vipStudent) },
              ],
            })),
          },
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('routers:trip').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            handleCloseDialogEdit();
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('routers:trip').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    }
  };

  const renderDialogEdit = () => {
    if (!selectedSlot) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogEdit}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle>{t('routers:edit_ticket_prices')}</DialogTitle>
            <IconButton onClick={handleCloseDialogEdit}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ marginY: '16px' }} />
          <Box className={classes.selectedDate}>
            <CalendarIcon />
            <span style={{ marginLeft: 4 }}>{dayjs(selectedSlot[0]).format('dddd, DD/MM/YYYY')}</span>
          </Box>
          <EditPriceStepThreeOfForm control={control} errors={errors} priceOfRoutePoints={priceOfRoutePoints} setValue={setValue} trigger={trigger} />
          <ComboButton
            textCancel={selectedSlot.isCreateDayoffAction ? t('translation:delete') : t('translation:reactive')}
            onCancel={handleOpenDialogConfirmDelete}
            onSave={handleSubmit(handleUpdateTicketPrices)}
            isSaving={statusUpdateParticularDayPrice === 'loading'}
            isDeleting={statusRemoveDayActive === 'loading'}
          />
        </Box>
      </Dialog>
    );
  };

  const renderDialogConfirmToggle = () => {
    return (
      <Dialog open={openDialogConfirmDelete} onClose={handleCloseDialogConfirmDelete}>
        <Box padding="24px" style={{ maxWidth: 311, textAlign: 'center' }}>
          <Typography marginBottom="24px" fontSize="16px" fontWeight={700}>
            {t('routers:reactive_title')}
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
                handleToggleActiveDay();
              }}
            >
              {selectedSlot?.isCreateDayoffAction ? t('translation:delete') : t('translation:reactive')}
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
        onSelecting={() => false}
        onSelectSlot={handleOpenDialogEdit}
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
          ...(typeof route.startPeriod === 'number' && typeof route.endPeriod === 'number'
            ? createArrayDateFromRange({
                start: route.startPeriod,
                end: route.endPeriod,
                isNeedIgnore(date) {
                  return route.dayActives.includes(DayInWeekMappingToString[date.getDay()]);
                },
              }).map(item => ({
                start: new Date(item),
                end: new Date(item),
                allDay: true,
                title: t('translation:off'),
              }))
            : []),
        ]}
      />
      <ComboButton
        textOk={t('translation:save')}
        textCancel={t('translation:back')}
        onCancel={handleCancel}
        isSaving={statusUpdateParticularDayPrice === 'loading' || statusRemoveDayActive === 'loading'}
        onSave={() => {
          toast(
            <ToastCustom
              type="success"
              text={t('translation:edit_type_success', {
                type: t('routers:trip').toLowerCase(),
              })}
            />,
            { className: 'toast-success' },
          );
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
      {renderDialogConfirmToggle()}
    </Box>
  );
}
