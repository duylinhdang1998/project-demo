import ClearIcon from '@mui/icons-material/Clear';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Box, Dialog, DialogTitle, Divider, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import SendIcon from 'components/SvgIcon/SendIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Passenger } from 'services/models/Passenger';
import { passengersActions } from 'store/passengers/passengersSlice';
import { selectPassengers } from 'store/passengers/selectors';
import { EmailEditor } from './components/EmailEditor';
import TablePassenger from './components/TablePassenger';
import { fieldsSearch } from './constants';

const useStyles = makeStyles(() => ({
  btnAdd: {
    height: '40px !important',
    padding: '10px 30px !important',
  },
}));

interface SearchFormValues {
  email: string;
  name: string;
  phone: string;
}

export interface BatchMailFormValues {
  subject: string;
  description: string;
}

export default function Passengers() {
  const { t } = useTranslation(['passenger', 'translation']);
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1200px)');

  const [selectedPassengers, setSelectedPassengers] = useState<Passenger[]>([]);
  const [openEmailEditor, setOpenEmailEditor] = useState(false);

  const { statusSendEmail } = useAppSelector(selectPassengers);
  const dispatch = useAppDispatch();

  const searchForm = useForm<SearchFormValues>();
  const emailEditorForm = useForm<BatchMailFormValues>();
  const emailDescriptionValue = emailEditorForm.watch('description');

  const messages = useMemo(() => {
    return ['subject', 'description'].reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
  }, [t]);

  const handleOpenEmailEditor = () => {
    setOpenEmailEditor(true);
  };

  const handleBatchEmail = async (values: BatchMailFormValues) => {
    dispatch(
      passengersActions.sendEmailRequest({
        data: {
          description: values.description,
          subject: values.subject,
          passengerId: selectedPassengers.map(passenger => passenger._id),
        },
        onSuccess() {
          toast(<ToastCustom type="success" text={t('passenger:send_email_success')} />, { className: 'toast-success' });
          setOpenEmailEditor(false);
          setSelectedPassengers([]);
          emailEditorForm.reset({ description: '', subject: '' });
        },
        onFailure: message => {
          toast(<ToastCustom type="error" text={t('passenger:send_email_error')} description={message} />, { className: 'toast-error' });
        },
      }),
    );
  };

  const onSubmit = (values: SearchFormValues) => {
    dispatch(
      passengersActions.getPassengersRequest({
        page: 0,
        sorter: {},
        searcher: {
          lastName: { operator: 'contains', value: values.name },
          phone: { operator: 'contains', value: values.phone },
          email: { operator: 'contains', value: values.email },
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      passengersActions.getPassengersRequest({
        page: 0,
        sorter: {},
        searcher: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderEmailEditor = () => {
    if (!openEmailEditor || isEmpty(selectedPassengers)) {
      return null;
    }
    return (
      <Dialog open onClose={() => setOpenEmailEditor(false)}>
        <Box minWidth={500} padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>{t('translation:batch_email')}</DialogTitle>
            <IconButton onClick={() => setOpenEmailEditor(false)}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" sx={{ margin: '16px 0' }} />
          <FormVerticle
            errors={emailEditorForm.formState.errors}
            messages={messages}
            fields={[{ id: 'subject', label: 'subject', type: 'text', required: true }]}
            control={emailEditorForm.control}
            filterKey="passenger"
          />
          <EmailEditor
            label="description"
            control={emailEditorForm.control}
            errors={emailEditorForm.formState.errors}
            description={emailDescriptionValue}
            messages={messages}
            required
            onChange={value => {
              emailEditorForm.setValue('description', value);
            }}
          />
          <Stack sx={{ marginTop: '24px' }} direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" alignItems="center">
              <DoneAllIcon sx={{ color: 'rgba(133, 140, 147, 1)', marginRight: '6px' }} />
              <Typography
                sx={{
                  color: 'rgba(133, 140, 147, 1)',
                  fontSize: '13px',
                  '::first-letter': {
                    color: 'rgba(69, 72, 94, 1)',
                    fontSize: '14px',
                  },
                }}
              >
                {t('passenger:total_users_selected', { total: selectedPassengers.length })}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Button
                loading={statusSendEmail === 'loading'}
                sx={{
                  color: 'rgba(26, 166, 238, 1)',
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  border: '1px solid rgba(26, 166, 238, 1)',
                  padding: '10px 38px',
                  marginRight: '16px',
                }}
              >
                {t('translation:cancel')}
              </Button>
              <Button
                loading={statusSendEmail === 'loading'}
                sx={{
                  backgroundColor: 'rgba(26, 166, 238, 1)',
                  color: 'rgba(255, 255, 255, 1)',
                  border: '1px solid rgba(26, 166, 238, 1)',
                  padding: '10px 38px',
                }}
                backgroundButton="rgba(26, 166, 238, 1)"
                onClick={emailEditorForm.handleSubmit(handleBatchEmail)}
              >
                {t('translation:send')}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('passenger:passengers')} />
      <Box padding="24px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container columns={8} rowSpacing={2}>
              <Grid item xs={8} md={7}>
                <FilterTicket control={searchForm.control} fields={fieldsSearch} filterKey="passenger" numberColumns={matches ? 3 : 10} />
              </Grid>
              <Grid item xs={8} md={1} sx={{ alignSelf: 'flex-end', marginLeft: matches ? '-48px' : '0px' }}>
                <Button
                  variant="contained"
                  sx={{ width: matches ? '170px' : '100%' }}
                  backgroundButton={theme.palette.primary.main}
                  onClick={searchForm.handleSubmit(onSubmit)}
                >
                  {t('translation:search')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              backgroundButton="#33CC7F"
              sx={{ alignSelf: 'flex-end' }}
              disabled={isEmpty(selectedPassengers)}
              startIcon={<SendIcon />}
              className={classes.btnAdd}
              onClick={handleOpenEmailEditor}
            >
              {t('translation:batch_email')}
            </Button>
          </Grid>
        </Grid>
        <TablePassenger selectedPassengers={selectedPassengers} onSelect={setSelectedPassengers} />
      </Box>
      {renderEmailEditor()}
    </Box>
  );
}
