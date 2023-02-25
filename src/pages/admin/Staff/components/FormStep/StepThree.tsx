import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Alert } from 'antd';
import 'antd/lib/alert/style/css';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectStaffs } from 'store/staffs/selectors';
import { staffsActions } from 'store/staffs/staffsSlice';
import { useToastStyle } from 'theme/toastStyles';
import { dateClamp } from 'utils/dateClamp';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';
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
    marginTop: '12px',
  },
}));

interface StepThreeProps {
  onCancel?: () => void;
  isEdit?: boolean;
}

export default function StepThree({ onCancel, isEdit }: StepThreeProps) {
  const toastClass = useToastStyle();

  const navigate = useNavigate();

  const { t } = useTranslation(['staffs', 'translation']);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const { staff, statusUpdateDayOff } = useAppSelector(selectStaffs);
  const dispatch = useAppDispatch();

  const location = useLocation();

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.();
  };

  const handleSave = () => {
    if (staff) {
      dispatch(
        staffsActions.updateDayOffRequest({
          data: {
            dayOffs: staff.dayOff,
            staffId: staff._id,
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('staff:staff') })} />, {
              className: toastClass.toastSuccess,
            });
            navigate('/admin/staffs');
          },
          onFailure() {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('staff:staff') })} />, {
              className: toastClass.toastError,
            });
          },
        }),
      );
    }
  };

  const isDateClampStaffPeriod = (timestamp: number) => {
    return (
      staff && typeof staff.periodFrom === 'number' && typeof staff.periodTo === 'number' && dateClamp(timestamp, staff.periodFrom, staff.periodTo)
    );
  };

  const renderAlertSuccess = () => {
    if (!location.state?.isConsultSchedule) {
      return (
        <Alert
          closable
          showIcon
          type="success"
          className="alertSuccess"
          message={
            <Box>
              <Typography className="alert__title">Your programing is saved</Typography>
              <Typography className="alert__description">You can delete your employee's days off from the calendar.</Typography>
            </Box>
          }
        />
      );
    }
    return null;
  };

  if (!staff) {
    return <Navigate to="/404" />;
  }

  return (
    <Box my="24px">
      {renderAlertSuccess()}
      <Calendar
        selectable
        defaultDate={staff.periodFrom ? new Date(staff.periodFrom) : undefined}
        localizer={localizer}
        style={{ height: 500 }}
        defaultView="month"
        toolbar={true}
        views={[Views.MONTH]}
        className="staff custom-big-calendar"
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
              <Box display="flex" className="cell_wrapper" flex="1 0">
                {children}
              </Box>
            );
          },
          event: ({ title }) => {
            return <div>{title}</div>;
          },
        }}
        onSelecting={() => false}
        onSelectSlot={event => {
          const selected = event.slots[0];
          if (isDateClampStaffPeriod(selected.getTime())) {
            const isDeleteDayOffAction = staff.dayOff.find(item => isTimestampEqualDayInYear(item, selected.getTime()));
            dispatch(
              staffsActions.updateDayOffLocal({
                dayOff: isDeleteDayOffAction
                  ? staff.dayOff.filter(item => !isTimestampEqualDayInYear(item, selected.getTime()))
                  : staff.dayOff.concat(selected.getTime()),
              }),
            );
          }
        }}
        elementProps={{ style: { background: 'cyan' } }}
        slotPropGetter={date => {
          if (isDateClampStaffPeriod(date.getTime())) {
            return {
              style: { background: 'blue' },
            };
          }
          return {
            style: { background: 'green' },
          };
        }}
        dayPropGetter={date => {
          if (isDateClampStaffPeriod(date.getTime())) {
            return {
              className: 'selectable',
            };
          }
          return {};
        }}
        events={[
          ...staff.dayOff.map<Event>(dayoff => ({
            start: new Date(dayoff),
            end: new Date(dayoff),
            allDay: true,
            title: t('translation:off'),
          })),
        ]}
      />
      <ComboButton
        isSaving={statusUpdateDayOff === 'loading'}
        textOk={t('translation:save')}
        textCancel={t('translation:back')}
        onCancel={handleCancel}
        onSave={handleSave}
      />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(`staff:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
