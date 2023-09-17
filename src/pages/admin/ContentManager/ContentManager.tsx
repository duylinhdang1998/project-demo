import { Box, Divider, Typography } from '@mui/material';
import CardWhite from 'components/CardWhite/CardWhite';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Content } from 'services/models/Content';
import { contentManagerActions } from 'store/contentManager/contentManagerSlice';
import { selectContentManager } from 'store/contentManager/selectors';
import { ForContentField } from './components/ForContentField';
import { ForSidebarNFooterField } from './components/ForSidebarNFooterField';
import { useStyles } from './styles';
import FormVerticle from '../../../components/FormVerticle/FormVerticle';
import cx from 'classnames';

type Values = Pick<Content, 'footerText' | 'content' | 'sidebar' | 'title' | 'backGround'>;
const fieldKeys: Array<keyof Values> = ['title', 'content', 'footerText', 'sidebar', 'backGround'];

function ContentManager() {
  const { t } = useTranslation(['account', 'translation', 'message_error']);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    resetField,
  } = useForm<Values>();
  const contentValueOfForm = watch('content');
  const sidebarValueOfForm = watch('sidebar');
  const backGroundValueOfForm = watch('backGround');
  const footerTextValueOfForm = watch('footerText');
  const classes = useStyles();
  console.log('backGroundValueOfForm>>>>', backGroundValueOfForm);

  const [open, setOpen] = useState(false);

  const { statusGetContent, statusUpdateContent, content } = useAppSelector(selectContentManager);
  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(true);

  const onSubmit = (values: Values) => {
    dispatch(
      contentManagerActions.updateContentRequest({
        data: {
          ...values,
          backGround: values.backGround?._id?.toString(),
        },
        onSuccess: () => {
          toast(
            <ToastCustom
              type="success"
              text={t('translation:edit_type_success', {
                type: t('account:content_manager').toLowerCase(),
              })}
            />,
            { className: 'toast-success' },
          );
        },
        onFailure: message => {
          toast(
            <ToastCustom
              type="error"
              text={t('translation:edit_type_error', { type: t('account:content_manager').toLowerCase() })}
              description={message}
            />,
            { className: 'toast-error' },
          );
        },
      }),
    );
  };

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`staff:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  useEffect(() => {
    dispatch(contentManagerActions.getContentRequest({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (content) {
      fieldKeys.forEach(key => {
        setValue(key, content[key] ?? '');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (statusGetContent === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetContent === 'failure' || (statusGetContent === 'success' && !content)) {
    return <EmptyScreen description={t('message_error:CONTENT_MANAGER_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <Box>
        <HeaderLayout activeSideBarHeader={t('account:content_manager')} />
        <Box p="24px">
          <CardWhite title={t('account:content_manager')}>
            <Box my="20px">
              <Typography fontWeight={700} color="#0C1132">
                {t('account:banner_content')}
              </Typography>
              <Typography fontSize={13} color="#475461">
                {t('account:banner_content_description')}
              </Typography>

              <FormVerticle
                errors={errors}
                messages={messages}
                control={control}
                fields={[
                  {
                    id: 'title',
                    label: '',
                    name: 'title',
                    type: 'text',
                    required: false,
                    placeholder: t(`account:banner_content`),
                    className: cx('tox-tinymce', classes.bannerInput),
                  },
                ]}
              />
            </Box>

            <Box my="20px">
              <Typography fontWeight={700} color="#0C1132">
                {t('account:banner_content')}
              </Typography>
              <Typography fontSize={13} color="#475461">
                {t('account:banner_content_description')}
              </Typography>
              <FormVerticle
                errors={errors}
                messages={messages}
                fields={[
                  {
                    id: 'backGround',
                    type: 'image_resource',
                    label: 'backGround',
                    required: true,
                    multiple: false,
                    withFileInfomation: false,
                    resources: backGroundValueOfForm ? [backGroundValueOfForm] : [],
                    onChange: resources => {
                      const lastResource = resources[resources.length - 1];
                      if (lastResource) {
                        resetField('backGround', {
                          defaultValue: lastResource,
                        });
                      } else {
                        setValue('backGround', undefined as any);
                      }
                      trigger('backGround');
                    },
                  },
                ]}
                control={control}
              />
            </Box>

            <Typography fontWeight={700} color="#0C1132">
              {t('account:content')}
            </Typography>
            <Typography fontSize={13} color="#475461">
              {t('account:content_description')}
            </Typography>

            <Box my="20px">
              <ForContentField
                contentValueOfForm={contentValueOfForm}
                onChange={value => {
                  setValue('content', value);
                  trigger('content');
                }}
              />
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box my="20px">
              <Typography fontWeight={700} color="#0C1132">
                {t('translation:sideBar')}
              </Typography>
              <Typography fontSize={13} color="#475461">
                {t('translation:sidebar_description')}
              </Typography>
              <ForSidebarNFooterField
                valueOfForm={sidebarValueOfForm ?? ''}
                onChange={value => {
                  setValue('sidebar', value);
                  trigger('sidebar');
                }}
                variant="sidebar"
              />
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box my="20px">
              <Typography fontWeight={700} color="#0C1132">
                {t('translation:footer')}
              </Typography>
              <Typography fontSize={13} color="#475461">
                {t('translation:footer_description')}
              </Typography>
              <ForSidebarNFooterField
                valueOfForm={footerTextValueOfForm}
                onChange={value => {
                  setValue('footerText', value);
                  trigger('footerText');
                }}
                variant="footer"
              />
            </Box>
            <ComboButton onSave={handleSubmit(onSubmit)} isSaving={statusUpdateContent === 'loading'} onCancel={handleCancel} />
          </CardWhite>
        </Box>

        <DialogConfirm
          openDialog={open}
          title={t('translation:cancel_type', { type: t('account:content').toLowerCase() })}
          subTitle={t('translation:leave_page')}
          onClose={handleClose}
        />
      </Box>
    </FadeIn>
  );
}

export default ContentManager;
