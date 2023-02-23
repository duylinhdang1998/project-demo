import { Box, Grid } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageResource } from 'services/models/Resource';
import { Staff } from 'services/models/Staff';
import { getFieldsStepOne } from '../../constants';
import { SelectOffice } from '../../../../../components/SelectDecouplingData/SelectOffice';
import { SelectRole } from 'components/SelectDecouplingData/SelectRole';

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
  const { t } = useTranslation(['routers', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    resetField,
    reset,
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
        [key]: t('translation:error_required', { name: t(`routers:${key}`) }),
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
      <Grid my="16px" container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SelectRole
            isRequired
            isDisabled={isEdit}
            control={control}
            errors={errors}
            messages={messages}
            role={getRole()}
            onChange={value => {
              resetField('role', { defaultValue: value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectOffice
            control={control}
            errors={errors}
            messages={messages}
            office={getOffice()}
            onChange={value => {
              resetField('office', { defaultValue: value });
            }}
            isRequired
          />
        </Grid>
      </Grid>
      <FormVerticle
        errors={errors}
        messages={messages}
        control={control}
        fields={getFieldsStepOne(isEdit)}
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
              const lastResource = resources[resources.length - 1];
              resetField('attach', {
                defaultValue: lastResource ? lastResource : undefined,
              });
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
        title={t('translation:cancel_type', { type: t(`routers:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
