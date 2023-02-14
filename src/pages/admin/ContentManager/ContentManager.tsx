import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CardWhite from 'components/CardWhite/CardWhite';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Content } from 'services/models/Content';
import { contentManagerActions } from 'store/contentManager/contentManagerSlice';
import { selectContentManager } from 'store/contentManager/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { footerFields, sidebarFields } from './constants';
import { uploadPlugin } from './utils/ckeditorPlugins';

type Values = Pick<Content, 'city' | 'email' | 'phone' | 'content' | 'footerText' | 'postalAddress' | 'zipCode'>;
const fieldKeys: Array<keyof Values> = ['city', 'email', 'phone', 'content', 'footerText', 'postalAddress', 'zipCode'];

// FIXME: Chưa lắp upload resource vì cần đọc docs ckeditor
function ContentManager() {
  const { t } = useTranslation(['account', 'translation']);
  const { control, getValues, handleSubmit, setValue } = useForm<Values>();
  const toastClass = useToastStyle();

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
          toast(<ToastCustom type="success" text={t('account:content_manager_updated')} />, {
            className: toastClass.toastSuccess,
          });
        },
        onFailure: () => {
          toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
            className: toastClass.toastSuccess,
          });
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
        setValue(key, content[key]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // FIXME: Retry screen
  if (statusGetContent === 'failure') {
    return <button onClick={() => dispatch(contentManagerActions.getContentRequest({}))}>Retry</button>;
  }

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('account:content_manager')} />
      <Box p="24px">
        <CardWhite title={t('account:content_manager')}>
          <Typography fontWeight={700} color="#0C1132">
            {t('account:content')}
          </Typography>
          <Box my="20px">
            <CKEditor
              config={{
                extraPlugins: [
                  // @ts-ignore
                  uploadPlugin({
                    onSuccess: () => {},
                    onFailure: () => {
                      toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
                        className: toastClass.toastSuccess,
                      });
                    },
                  }),
                ],
              }}
              onReady={editor => {
                // FIXME: Liệu có lỗi với trường hợp nào đấy không?
                editor.setData(getValues().content);
              }}
              editor={ClassicEditor}
              onChange={(_, editor) => {
                const data = editor.getData();
                setValue('content', data);
              }}
            />
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box my="20px">
            <Typography fontWeight={700} color="#0C1132" my="10px">
              {t('translation:sideBar')}
            </Typography>
            <FormVerticle control={control} fields={sidebarFields} grid isGridHorizon filterKey="account" />
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box my="20px">
            <Typography fontWeight={700} color="#0C1132" my="10px">
              {t('translation:footer')}
            </Typography>
            <FormVerticle control={control} fields={footerFields} filterKey="account" />
          </Box>
          <ComboButton
            onSave={handleSubmit(onSubmit)}
            isLoading={statusGetContent === 'loading' || statusUpdateContent === 'loading'}
            onCancel={handleCancel}
          />
        </CardWhite>
      </Box>

      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('account:content') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}

export default ContentManager;
