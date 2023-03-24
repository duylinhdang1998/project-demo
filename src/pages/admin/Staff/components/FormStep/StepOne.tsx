import { Box } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageResource } from 'services/models/Resource';
import { Staff } from 'services/models/Staff';
import { getFieldsStepOne } from '../../constants';

const fieldKeys: Array<keyof Staff> = ['attach', 'email', 'firstName', 'lastName', 'office', 'phone', 'role'];

export type StepOneValues = Pick<Staff, 'attach' | 'email' | 'firstName' | 'lastName' | 'office' | 'phone' | 'role'>;

export interface StepOneProps {
  onNextStep?: (values: StepOneValues) => void;
  onCancel?: (values: StepOneValues) => void;
  isEdit?: boolean;
  values?: StepOneValues;
  isLoading?: boolean;
}

export default function StepOne({ onNextStep, onCancel, isEdit, values, isLoading }: StepOneProps) {
  const { t } = useTranslation(['staff', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    resetField,
    reset,
    setValue,
  } = useForm<StepOneValues>();

  const [open, setOpen] = useState(false);

  const getOffice = () => getValues().office;
  const getRole = () => getValues().role;
  const getAttach = (): ImageResource[] => {
    const attach = getValues().attach;
    return attach ? [attach] : [];
  };

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.(getValues());
  };

  const handleSave = (values: StepOneValues) => {
    onNextStep?.(values);
  };

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`staff:${key}`) }),
      };
    }, {});
  }, [t]);

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      reset(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box my="24px">
      <FormVerticle
        errors={errors}
        messages={messages}
        control={control}
        fields={[
          {
            type: 'controlSelectRole',
            id: 'role',
            label: 'role',
            disabled: isEdit,
            required: true,
            role: getRole(),
            onChange: role => {
              resetField('role', { defaultValue: role });
            },
          },
          {
            type: 'controlSelectOffice',
            id: 'office',
            label: 'office',
            required: true,
            office: getOffice(),
            onChange: office => {
              resetField('office', { defaultValue: office });
            },
          },
          ...getFieldsStepOne(isEdit),
        ]}
        indexGridHorizon={-1}
        isGridHorizon
        grid
        filterKey="staff"
      />
      <FormVerticle
        errors={errors}
        messages={messages}
        fields={[
          {
            id: 'attach',
            type: 'image_resource',
            label: 'attach',
            required: true,
            multiple: false,
            resources: getAttach(),
            onChange: resources => {
              const lastResource = resources[resources.length - 1] as Staff['attach'] | undefined;
              if (lastResource) {
                resetField('attach', {
                  defaultValue: lastResource,
                });
              } else {
                setValue('attach', undefined as any);
              }
            },
          },
        ]}
        control={control}
        filterKey="staff"
      />
      <ComboButton
        isSaving={isLoading}
        textOk={isEdit ? t('translation:save') : t('translation:next')}
        onCancel={handleCancel}
        onSave={handleSubmit(handleSave)}
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
