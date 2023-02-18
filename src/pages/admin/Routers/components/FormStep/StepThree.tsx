import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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
}));

export interface StepThreeValues {}

interface StepThreeProps {
  values?: StepThreeValues;
  onCancel?: (values: StepThreeValues) => void;
  onSave?: (values: StepThreeValues) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

// FIXME: FORM này để làm gì?
export default function StepThree({ values, onCancel, onSave, isEdit, isLoading }: StepThreeProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.({});
  };

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      console.log('SET FORM VALUE');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box my="24px">
      <Calendar
        selectable
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
        }}
        onSelectSlot={event => {
          console.log('select lot', event);
        }}
      />
      <ComboButton
        isLoading={isLoading}
        textOk={t('translation:save')}
        textCancel={t('translation:back')}
        onCancel={handleCancel}
        onSave={() => {
          onSave?.({});
        }}
      />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(`routers:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
