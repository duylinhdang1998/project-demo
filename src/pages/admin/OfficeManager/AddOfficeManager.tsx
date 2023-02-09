import { Box, Divider, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateOffice } from 'services/OfficesManager/Company/createOffice';
import { officesManagerActions } from 'store/officesManager/officesManagerSlice';
import { selectOfficesManager } from 'store/officesManager/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { fieldsAddOffice1, fieldsAddOffice2, fieldsAddOffice3 } from './constants';

const fieldKeys: Array<keyof CreateOffice> = ['title', 'address', 'zipCode', 'country', 'city', 'phone', 'email'];

type Values = Record<typeof fieldKeys[number], string>;

export default function AddOfficeManager() {
  const toastClass = useToastStyle();
  const { t } = useTranslation(['translation', 'account']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Values>();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { statusCreateOffice, office, statusGetOffice, queueUpdateOffice } = useSelector(selectOfficesManager);
  const { officeId } = useParams();
  const navigate = useNavigate();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEditAction = useMemo(() => {
    return !!officeId;
  }, [officeId]);

  const handleClose = () => setOpenDialog(false);
  const handleCancel = () => setOpenDialog(true);

  const onSubmit = (values: Values) => {
    if (isEditAction && officeId) {
      dispatch(
        officesManagerActions.updateOfficeRequest({
          id: officeId,
          data: {
            address: values.address,
            city: values.city,
            country: values.country,
            email: values.email,
            phone: values.phone,
            title: values.title,
            zipCode: values.zipCode,
          },
          // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
          onFailure: () => {
            toast.error(t('translation:internal_server_error'));
          },
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('account:office_manager_updated')} />, {
              className: toastClass.toastSuccess,
            });
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
          // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
          onFailure: () => {
            toast.error(t('translation:internal_server_error'));
          },
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('account:office_manager_created')} />, {
              className: toastClass.toastSuccess,
            });
            navigate('/account/offices-manager');
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (isEditAction && officeId) {
      dispatch(officesManagerActions.getOfficeRequest({ id: officeId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  useEffect(() => {
    if (isEditAction && office && statusGetOffice === 'success') {
      Object.keys(office).forEach((key) => {
        const key_ = key as keyof CreateOffice;
        if (fieldKeys.includes(key_)) {
          setValue(key_, office[key_]);
        }
      });
    }
    if (isEditAction && !office && statusGetOffice === 'success') {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetOffice, office, isEditAction]);

  return (
    <LayoutDetail
      subTitle={t('account:offices_manager')}
      title={isEditAction ? t('translation:edit_type', { type: t('account:office') }) : t('translation:create_new', { type: t('account:office') })}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {isEditAction ? t('translation:edit_type', { type: t('account:office') }) : t('translation:create_new', { type: t('account:office') })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <form onSubmitCapture={handleSubmit(onSubmit)}>
            <FormVerticle errors={errors} messages={messages} fields={fieldsAddOffice1} control={control} filterKey="account" />
            <FormVerticle errors={errors} messages={messages} fields={fieldsAddOffice2} control={control} grid filterKey="account" />
            <FormVerticle errors={errors} messages={messages} fields={fieldsAddOffice3} control={control} filterKey="account" />
            <ComboButton
              isLoading={isEditAction && officeId ? queueUpdateOffice.includes(officeId) || statusGetOffice === 'loading' : statusCreateOffice === 'loading'}
              onCancel={handleCancel}
              onSave={handleSubmit(onSubmit)}
            />
          </form>
        </Box>
      </Box>
      <DialogConfirm
        openDialog={openDialog}
        title={t('translation:cancel_type', { type: t('account:office') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </LayoutDetail>
  );
}
