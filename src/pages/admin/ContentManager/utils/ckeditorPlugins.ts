import { Editor } from '@ckeditor/ckeditor5-core';
import { UploadAdapter, FileLoader } from '@ckeditor/ckeditor5-upload/src/filerepository';
import { uploadImageResource } from 'services/Resource/uploadImageResource';
import { getUrlOfResource } from 'utils/getUrlOfResource';

interface Callbacks {
  onSuccess: () => void;
  onFailure: () => void;
}

function uploadAdapter(loader: FileLoader, { onFailure, onSuccess }: Callbacks): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          if (file) {
            const response = await uploadImageResource({ file });
            resolve({ default: getUrlOfResource(response.data) });
            onSuccess();
          }
        } catch (error) {
          reject(error);
          onFailure();
        }
      });
    },
    abort: () => {},
  };
}

export function uploadPlugin(callbacks: Callbacks) {
  return function (editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      return uploadAdapter(loader, callbacks);
    };
  };
}
