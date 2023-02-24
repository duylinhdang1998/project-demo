import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Button from 'components/Button/Button';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import CalendarIcon from 'components/SvgIcon/CalendarIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, SlotInfo, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { staffsActions } from 'store/staffs/staffsSlice';
import { selectStaffs } from 'store/staffs/selectors';
import { useToastStyle } from 'theme/toastStyles';
import './styles.scss';
import { ToggleDayActiveRequest } from 'store/staffs/actions/ToggleDayActive';

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

  const [selectedSlot, setSelectedSlot] = useState<SlotInfo['slots']>([]);
  const [open, setOpen] = useState(false);
  const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);

  const { staff, statusToggleDayActive } = useAppSelector(selectStaffs);
  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.();
  };

  const handleCloseDialogEdit = () => setSelectedSlot([]);

  const handleOpenDialogConfirmDelete = () => setOpenDialogConfirmDelete(true);
  const handleCloseDialogConfirmDelete = () => setOpenDialogConfirmDelete(false);

  const handleToggleActiveDay = (type: ToggleDayActiveRequest['type']) => {
    if (staff) {
      dispatch(
        staffsActions.toggleDayActiveRequest({
          type,
          data: {
            dayOffs: selectedSlot.map<number>(item => item.getTime()),
            staffId: staff._id,
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('staff:staff') })} />, {
              className: toastClass.toastSuccess,
            });
            handleCloseDialogEdit();
            handleCloseDialogConfirmDelete();
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

  const renderDialogEdit = () => {
    if (!selectedSlot.length || !staff) {
      return null;
    }
    const startDateSelected = staff.periodFrom
      ? new Date(Math.max(selectedSlot[0].getTime(), new Date(staff.periodFrom).getTime()))
      : selectedSlot[0];
    const endDateSelected = staff.periodTo
      ? new Date(Math.min(selectedSlot[selectedSlot.length - 1].getTime(), new Date(staff.periodTo).getTime()))
      : selectedSlot[selectedSlot.length - 1];
    console.log(startDateSelected, endDateSelected);
    return (
      <Dialog open onClose={handleCloseDialogEdit}>
        <Box padding="30px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>{t('staff:delete_day_off')}</DialogTitle>
            <IconButton onClick={handleCloseDialogEdit}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Box className={classes.selectedDate}>
            <CalendarIcon />
            <span style={{ marginLeft: 4 }}>
              {moment(startDateSelected).format('dddd, MM/DD/YYYY')} - {moment(endDateSelected).format('dddd, MM/DD/YYYY')}
            </span>
          </Box>
          <ComboButton
            onCancel={handleOpenDialogConfirmDelete}
            onSave={() => handleToggleActiveDay('createDayOff')}
            textOk={t('translation:update')}
            textCancel={t('translation:delete')}
            isSaving={statusToggleDayActive === 'loading'}
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
              loading={statusToggleDayActive === 'loading'}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => handleToggleActiveDay('removeDayOff')}
            >
              {t('translation:delete')}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  if (!staff) {
    return <Navigate to="/404" />;
  }

  return (
    <Box my="24px">
      <Calendar
        selectable
        defaultDate={staff.periodFrom ? new Date(staff.periodFrom) : undefined}
        localizer={localizer}
        style={{ height: 500 }}
        defaultView="month"
        toolbar={true}
        views={[Views.MONTH]}
        className="custom-big-calendar"
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
        events={[
          ...staff.dayOff.map<Event>(dayoff => ({
            start: new Date(dayoff),
            end: new Date(dayoff),
            allDay: true,
            title: t('translation:edited'),
          })),
        ]}
      />
      <ComboButton
        textOk={t('translation:save')}
        textCancel={t('translation:back')}
        onCancel={handleCancel}
        onSave={() => {
          toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('staff:staff') })} />, {
            className: toastClass.toastSuccess,
          });
          navigate('/admin/staffs');
        }}
      />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(`staff:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
      {renderDialogEdit()}
      {renderDialogConfirmDelete()}
    </Box>
  );
}
