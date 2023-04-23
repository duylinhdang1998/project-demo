import { Box } from '@mui/system';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DayInWeekMappingToString } from 'services/models/DayInWeek';
import { selectStaffs } from 'store/staffs/selectors';
import { staffsActions } from 'store/staffs/staffsSlice';
import { dateClamp } from 'utils/dateClamp';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';
import { AlertSuccess } from './components/AlertSuccess';
import { CalendarToolbar } from './components/CalendarToolbar';
import './styles.scss';
import { getDayoffsEvent } from './utils/getDayoffsEvent';
import { getDayoffsOutsidePresenceDay } from './utils/getDayoffsOutsidePresenceDay';

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

interface StepThreeProps {
  onCancel?: () => void;
  isEdit?: boolean;
}

export default function StepThree({ onCancel, isEdit }: StepThreeProps) {
  const navigate = useNavigate();

  const { t } = useTranslation(['staffs', 'translation', 'message_error']);

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
        staffsActions.updateDayOffNDayExceptionsRequest({
          data: {
            dayOffs: staff.dayOff,
            dayExceptions: staff.dayExceptions,
            staffId: staff._id,
          },
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('staff:staff').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            navigate('/admin/staffs');
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('staff:staff').toLowerCase(),
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

  const isDateClampStaffPeriod = (timestamp: number) => {
    return (
      staff && typeof staff.periodFrom === 'number' && typeof staff.periodTo === 'number' && dateClamp(timestamp, staff.periodFrom, staff.periodTo)
    );
  };

  if (!staff) {
    return <EmptyScreen description={t('message_error:STAFF_NOT_FOUND')} />;
  }

  return (
    <Box my="24px">
      <AlertSuccess isConsultSchedule={location.state?.isConsultSchedule} />
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
          toolbar: CalendarToolbar,
          month: {
            header: ({ label }) => <Box padding="8px 14px" textAlign="center" fontSize="14px" children={label} />,
            dateHeader: ({ label }) => <Box textAlign="center">{label}</Box>,
          },
          dateCellWrapper: ({ children }) => <Box display="flex" className="cell_wrapper" flex="1 0" children={children} />,
          event: ({ title }) => <div>{title}</div>,
        }}
        onSelecting={() => false}
        onSelectSlot={event => {
          const selected = event.slots[0];
          const isWorkingDay = staff.presenceDay.includes(DayInWeekMappingToString[selected.getDay()]);
          if (isWorkingDay && isDateClampStaffPeriod(selected.getTime())) {
            const isDeleteDayOffAction = staff.dayOff.find(item => isTimestampEqualDayInYear(item, selected.getTime()));
            dispatch(
              staffsActions.updateDayOffNDayExceptionsLocal({
                dayOff: isDeleteDayOffAction
                  ? staff.dayOff.filter(item => !isTimestampEqualDayInYear(item, selected.getTime()))
                  : staff.dayOff.concat(selected.getTime()),
              }),
            );
          }
          if (!isWorkingDay && isDateClampStaffPeriod(selected.getTime())) {
            const isDeleteDayExceptionAction = staff.dayExceptions.find(item => isTimestampEqualDayInYear(item, selected.getTime()));
            dispatch(
              staffsActions.updateDayOffNDayExceptionsLocal({
                dayExceptions: isDeleteDayExceptionAction
                  ? staff.dayExceptions.filter(item => !isTimestampEqualDayInYear(item, selected.getTime()))
                  : staff.dayExceptions.concat(selected.getTime()),
              }),
            );
          }
        }}
        dayPropGetter={date => {
          if (isDateClampStaffPeriod(date.getTime())) {
            return { className: 'selectable' };
          }
          return {};
        }}
        events={[...getDayoffsEvent(staff, t('translation:off')), ...getDayoffsOutsidePresenceDay(staff, t('translation:off'))]}
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
