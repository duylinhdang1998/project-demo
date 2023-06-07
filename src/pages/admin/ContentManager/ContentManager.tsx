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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Content } from 'services/models/Content';
import { contentManagerActions } from 'store/contentManager/contentManagerSlice';
import { selectContentManager } from 'store/contentManager/selectors';
import { ForContentField } from './components/ForContentField';
import { ForSidebarNFooterField } from './components/ForSidebarNFooterField';

type Values = Pick<Content, 'footerText' | 'content' | 'sidebar'>;
const fieldKeys: Array<keyof Values> = ['content', 'footerText', 'sidebar'];

function ContentManager() {
  const { t } = useTranslation(['account', 'translation', 'message_error']);

  const { handleSubmit, setValue, trigger, watch } = useForm<Values>();
  const contentValueOfForm = watch('content');
  const sidebarValueOfForm = watch('sidebar');
  const footerTextValueOfForm = watch('footerText');

  const [open, setOpen] = useState(false);

  const { statusGetContent, statusUpdateContent, content } = useAppSelector(selectContentManager);
  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(true);

  const onSubmit = (values: Values) => {
    dispatch(
      contentManagerActions.updateContentRequest({
        data: values,
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
            <Typography fontWeight={700} color="#0C1132">
              {t('account:content')}
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
              <Typography fontWeight={700} color="#0C1132" my="10px">
                {t('translation:sideBar')}
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
              <Typography fontWeight={700} color="#0C1132" my="10px">
                {t('translation:footer')}
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
