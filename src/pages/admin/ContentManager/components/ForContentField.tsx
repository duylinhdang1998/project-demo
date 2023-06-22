import { Editor } from '@tinymce/tinymce-react';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import env from 'env';
import { toast } from 'react-toastify';
import { uploadImageResource } from 'services/Resource/uploadImageResource';
import { ServiceException } from 'services/utils/ServiceException';
import { blobToFile } from 'utils/blobToFile';
import { getUrlOfResource } from 'utils/getUrlOfResource';

export interface ForContentFieldProps {
  contentValueOfForm: string;
  onChange: (value: string) => void;
  control?: any;
  name?: any;
}

export const ForContentField = ({ contentValueOfForm, onChange }: ForContentFieldProps) => {
  return (
    <Editor
      apiKey={env.tinyMCEApiKey}
      value={contentValueOfForm}
      onEditorChange={value => {
        onChange(value);
      }}
      init={{
        height: 500,
        menubar: false,
        plugins: ['link', 'lists', 'table', 'image', 'media', 'advlist', 'paste', 'undo', 'redo', 'blockquote'],
        toolbar: 'blocks bold italic link bullist numlist outdent indent image blockquote table media undo redo',
        images_upload_handler: async blobInfo => {
          const file = blobToFile(blobInfo.blob(), blobInfo.filename());
          try {
            const response = await uploadImageResource({ file });
            return Promise.resolve(getUrlOfResource(response.data));
          } catch (error) {
            toast(<ToastCustom description={ServiceException.getMessageError(error)} text={`${file.name} file upload failed.`} type="error" />, {
              className: 'toast-error',
            });
            return Promise.reject(error);
          }
        },
      }}
    />
  );
};
