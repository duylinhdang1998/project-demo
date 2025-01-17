import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { FadeIn } from 'components/FadeIn/FadeIn';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { CreateOffice } from 'services/OfficesManager/Company/createOffice';
import { officesManagerActions } from 'store/officesManager/officesManagerSlice';
import { selectOfficesManager } from 'store/officesManager/selectors';
import { fieldsAddOffice1, fieldsAddOffice2, fieldsAddOffice3 } from './constants';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';

const fieldKeys: Array<keyof CreateOffice> = ['title', 'address', 'zipCode', 'country', 'city', 'phone', 'email'];

type Values = Record<keyof CreateOffice, string>;

export default function AddOfficeManager() {
  const { t } = useTranslation(['translation', 'account', 'message_error']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField,
    reset,
  } = useForm<Values>();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { statusCreateOffice, office, statusGetOffice, queueUpdateOffice } = useAppSelector(selectOfficesManager);

  const { officeId } = useParams();
  const navigate = useNavigate();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      if (key === 'email') {
        return {
          ...res,
          [key]: errors.email?.message ?? t('translation:error_required', { name: t(`account:${key}`).toLowerCase() }),
        };
      }
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`account:${key}`).toLowerCase() }),
      };
    }, {});
  }, [errors.email, t]);

  const isEditAction = useMemo(() => {
    return !!officeId;
  }, [officeId]);

  const handleClose = () => setOpenDialog(false);
  const handleCancel = () => setOpenDialog(true);

  const onSubmit = (values: Values) => {
    if (isEditAction && office && officeId) {
      dispatch(
        officesManagerActions.updateOfficeRequest({
          id: officeId,
          targetOffice: office,
          data: {
            address: values.address,
            city: values.city,
            country: values.country,
            email: values.email,
            phone: values.phone,
            title: values.title,
            zipCode: values.zipCode,
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('account:office').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
          onSuccess: () => {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('account:office').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            navigate('/account/offices-manager', { replace: true });
          },
        }),
      );
    } else {
      dispatch(
        officesManagerActions.createOfficeRequest({
          data: {
            address: values.address,
            city: values.city,
            country: values.country,
            email: values.email,
            phone: values.phone,
            title: values.title,
            zipCode: values.zipCode,
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:add_type_error', {
                  type: t('account:office').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
          onSuccess: () => {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:add_type_success', {
                  type: t('account:office').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            navigate('/account/offices-manager');
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (isEditAction && officeId) {
      reset();
      dispatch(officesManagerActions.getOfficeRequest({ id: officeId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  useEffect(() => {
    if (isEditAction && office && statusGetOffice === 'success') {
      fieldKeys.forEach(key => {
        resetField(key, {
          defaultValue: office[key],
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetOffice, office, isEditAction]);

  if (statusGetOffice === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetOffice === 'failure' || (statusGetOffice === 'success' && !office)) {
    return <EmptyScreen description={t('message_error:OFFICE_MANAGER_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <LayoutDetail
        subTitle={t('account:offices_manager')}
        title={
          isEditAction
            ? t('translation:edit_type', { type: t('account:office').toLowerCase() })
            : t('translation:create_new', { type: t('account:office').toLowerCase() })
        }
      >
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <Typography color="#0c1132" fontWeight={700}>
              {isEditAction
                ? t('translation:edit_type', { type: t('account:office').toLowerCase() })
                : t('translation:create_new', { type: t('account:office').toLowerCase() })}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <form onSubmitCapture={handleSubmit(onSubmit)}>
              <FormVerticle errors={errors} messages={messages} fields={fieldsAddOffice1} control={control} filterKey="account" />
              <FormVerticle errors={errors} messages={messages} fields={fieldsAddOffice2} control={control} grid filterKey="account" />
              <FormVerticle errors={errors} messages={messages} fields={fieldsAddOffice3} control={control} filterKey="account" />
              <ComboButton
                isSaving={isEditAction && officeId ? queueUpdateOffice.includes(officeId) : statusCreateOffice === 'loading'}
                onCancel={handleCancel}
                onSave={handleSubmit(onSubmit)}
              />
            </form>
          </Box>
        </Box>
        <DialogConfirm
          openDialog={openDialog}
          title={t('translation:cancel_type', { type: t('account:office').toLowerCase() })}
          subTitle={t('translation:leave_page')}
          onClose={handleClose}
        />
      </LayoutDetail>
    </FadeIn>
  );
}
