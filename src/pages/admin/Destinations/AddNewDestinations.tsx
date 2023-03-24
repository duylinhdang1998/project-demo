import { Box, Divider, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import LayoutDetail from 'layout/LayoutDetail';
import { get } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAddDestination, useUpdateDestination } from 'services/Destinations/destinations';
import { Destination } from 'services/models/Destination';
import { getNotifcation } from 'utils/getNotification';
import { fieldsDestinations } from './constants';

interface Values {
  title: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

const fieldKeys: Array<keyof Destination> = ['title', 'address', 'city', 'company', 'country', 'zipCode'];

export default function AddNewDestinations() {
  const { t } = useTranslation(['destinations', 'translation']);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const destinationDetail: Destination = get(location, 'state.destination', {});
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    mode: 'all',
  });
  const [open, setOpen] = useState(false);

  const { run: addNewDestination, loading } = useAddDestination({
    onSuccess(data) {
      getNotifcation({
        code: data.code,
        success: t('translation:add_type_success', { type: t('destinations').toLowerCase() }),
        error: t('translation:add_type_error', { type: t('destinations').toLowerCase() }),
        onSuccess: () => {
          navigate(-1);
        },
      });
    },
  });

  const { run: updateDestination, loading: loadingUpdate } = useUpdateDestination({
    onSuccess(data) {
      getNotifcation({
        code: data.code,
        success: t('translation:edit_type_success', { type: t('destinations').toLowerCase() }),
        error: t('translation:edit_type_error', { type: t('destinations').toLowerCase() }),
        onSuccess: () => {
          navigate(-1);
        },
      });
    },
  });

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
  }, [t]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const onSave = (values: Values) => {
    if (!!params.id) {
      updateDestination(params.id, values);
      return;
    }
    addNewDestination(values);
  };

  useEffect(() => {
    if (!!params.id) {
      reset({
        title: destinationDetail.title,
        address: destinationDetail.address,
        zipCode: destinationDetail.zipCode,
        city: destinationDetail.city,
        country: destinationDetail.country,
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [params]);

  return (
    <LayoutDetail
      title={
        !params.id
          ? t('translation:create_new', { type: t('destination').toLowerCase() })
          : t(`translation:edit_type`, { type: t('destination').toLowerCase() })
      }
    >
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {!params.id
              ? t(`translation:add_new`, { type: t('destination').toLowerCase() })
              : t(`translation:edit_type`, { type: t('destination').toLowerCase() })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <FormVerticle fields={fieldsDestinations} control={control} filterKey="destinations" errors={errors} messages={messages} />
          <ComboButton onCancel={handleCancel} onSave={handleSubmit(onSave)} isSaving={!params.id ? loading : loadingUpdate} />
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('destination').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </LayoutDetail>
  );
}
