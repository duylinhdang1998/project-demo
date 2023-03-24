import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CardWhite from 'components/CardWhite/CardWhite';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { FadeIn } from 'components/FadeIn/FadeIn';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Content } from 'services/models/Content';
import { contentManagerActions } from 'store/contentManager/contentManagerSlice';
import { selectContentManager } from 'store/contentManager/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { footerFields, sidebarFields } from './constants';
import { Editor } from '@tinymce/tinymce-react';
import { uploadImageResource } from 'services/Resource/uploadImageResource';
import { getUrlOfResource } from 'utils/getUrlOfResource';
import { blobToFile } from 'utils/blobToFile';
import env from 'env';

type Values = Pick<Content, 'city' | 'email' | 'phone' | 'content' | 'footerText' | 'postalAddress' | 'zipCode'>;
const fieldKeys: Array<keyof Values> = ['city', 'email', 'phone', 'content', 'footerText', 'postalAddress', 'zipCode'];

function ContentManager() {
  const { t } = useTranslation(['account', 'translation']);
  const { control, getValues, handleSubmit, setValue } = useForm<Values>();
  const toastClass = useToastStyle();

  const [open, setOpen] = useState(false);

  const { statusGetContent, statusUpdateContent, content } = useAppSelector(selectContentManager);
  const dispatch = useAppDispatch();

  const getContent = () => {
    return getValues().content;
  };

  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(true);

  const onSubmit = (values: Values) => {
    dispatch(
      contentManagerActions.updateContentRequest({
        data: values,
        onSuccess: () => {
          toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('account:content_manager') })} />, {
            className: toastClass.toastSuccess,
          });
        },
        onFailure: () => {
          toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('account:content_manager') })} />, {
            className: toastClass.toastError,
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

  if (statusGetContent === 'loading') {
    return <LoadingScreen />;
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
              <Editor
                apiKey={env.tinyMCEApiKey}
                initialValue={getContent()}
                onChange={e => {
                  const data = e.target.getContent();
                  setValue('content', data);
                }}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: ['link', 'lists', 'table', 'image', 'media', 'advlist', 'paste', 'undo', 'redo', 'blockquote'],
                  toolbar: 'blocks bold italic link bullist numlist outdent indent image blockquote table media undo redo',
                  images_upload_handler: async blobInfo => {
                    try {
                      const file = blobToFile(blobInfo.blob(), blobInfo.filename());
                      const response = await uploadImageResource({ file });
                      return Promise.resolve(getUrlOfResource(response.data));
                    } catch (error) {
                      return Promise.reject(error);
                    }
                  },
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
            <ComboButton onSave={handleSubmit(onSubmit)} isSaving={statusUpdateContent === 'loading'} onCancel={handleCancel} />
          </CardWhite>
        </Box>

        <DialogConfirm
          openDialog={open}
          title={t('translation:cancel_type', { type: t('account:content') })}
          subTitle={t('translation:leave_page')}
          onClose={handleClose}
        />
      </Box>
    </FadeIn>
  );
}

export default ContentManager;
