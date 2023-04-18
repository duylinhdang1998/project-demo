import { Box } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import env from 'env';

export interface ForSidebarNFooterFieldProps {
  valueOfForm: string;
  onChange: (value: string) => void;
  variant: 'footer' | 'sidebar';
}

export const ForSidebarNFooterField = ({ valueOfForm, onChange, variant }: ForSidebarNFooterFieldProps) => {
  return (
    <Box
      sx={{
        '.tox-toolbar__primary': {
          justifyContent: 'space-between',
        },
      }}
    >
      <Editor
        apiKey={env.tinyMCEApiKey}
        initialValue={valueOfForm}
        onChange={e => {
          const data = e.target.getContent();
          onChange(data);
        }}
        init={{
          height: variant === 'footer' ? 169 : 376,
          menubar: false,
          plugins: ['lists', 'emoticons', 'link', 'image', 'media'],
          toolbar: 'bold italic underline emoticons link bullist align | undo redo',
          content_style: `
          body {}
        `,
          images_upload_handler: async blobInfo => {
            return Promise.resolve(URL.createObjectURL(blobInfo.blob()));
          },
          setup: editor => {
            editor.ui.registry.addIcon(
              'bold',
              `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 5.22727C5 3.72104 6.22104 2.5 7.72727 2.5H10.8333C13.1345 2.5 15 4.36548 15 6.66667C15 7.85892 14.4992 8.93422 13.6966 9.69371C14.9714 10.4062 15.8333 11.7691 15.8333 13.3333C15.8333 15.6345 13.9679 17.5 11.6667 17.5H7.70833C6.21256 17.5 5 16.2874 5 14.7917V5.22727ZM7.72727 4.16667H10.8333C12.214 4.16667 13.3333 5.28595 13.3333 6.66667C13.3333 8.04738 12.214 9.16667 10.8333 9.16667H6.66667V5.22727C6.66667 4.64152 7.14152 4.16667 7.72727 4.16667ZM6.66667 10.8333V14.7917C6.66667 15.367 7.13304 15.8333 7.70833 15.8333H11.6667C13.0474 15.8333 14.1667 14.714 14.1667 13.3333C14.1667 11.9526 13.0474 10.8333 11.6667 10.8333H6.66667Z" fill="#33383F"/>
          </svg>`,
            );
            editor.ui.registry.addIcon(
              'italic',
              `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6847 2.5002H13.7503C14.2106 2.5002 14.5837 2.8733 14.5837 3.33354C14.5837 3.79377 14.2106 4.16687 13.7503 4.16687H12.3176L9.40096 15.8335H10.8337C11.2939 15.8335 11.667 16.2066 11.667 16.6669C11.667 17.1271 11.2939 17.5002 10.8337 17.5002H8.35205C8.34024 17.5005 8.32839 17.5005 8.31651 17.5002H6.25033C5.79009 17.5002 5.41699 17.1271 5.41699 16.6669C5.41699 16.2066 5.79009 15.8335 6.25033 15.8335H7.683L10.5997 4.16687H9.16699C8.70675 4.16687 8.33366 3.79377 8.33366 3.33354C8.33366 2.8733 8.70675 2.5002 9.16699 2.5002H11.648C11.6602 2.49993 11.6724 2.49993 11.6847 2.5002Z" fill="#33383F"/>
           </svg>`,
            );
            editor.ui.registry.addIcon(
              'underline',
              `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.16699 17.4993C4.16699 17.0391 4.54009 16.666 5.00033 16.666H15.0003C15.4606 16.666 15.8337 17.0391 15.8337 17.4993C15.8337 17.9596 15.4606 18.3327 15.0003 18.3327H5.00033C4.54009 18.3327 4.16699 17.9596 4.16699 17.4993Z" fill="#33383F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.00033 1.66602C5.46056 1.66602 5.83366 2.03911 5.83366 2.49935V9.16602C5.83366 11.4672 7.69914 13.3327 10.0003 13.3327C12.3015 13.3327 14.167 11.4672 14.167 9.16602V2.49935C14.167 2.03911 14.5401 1.66602 15.0003 1.66602C15.4606 1.66602 15.8337 2.03911 15.8337 2.49935V9.16602C15.8337 12.3877 13.222 14.9993 10.0003 14.9993C6.77866 14.9993 4.16699 12.3877 4.16699 9.16602V2.49935C4.16699 2.03911 4.54009 1.66602 5.00033 1.66602Z" fill="#33383F"/>
          </svg>`,
            );
            editor.ui.registry.addIcon(
              'undo',
              `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.707 17.7929C11.0975 18.1834 11.0975 18.8166 10.707 19.2071C10.3164 19.5976 9.68327 19.5976 9.29274 19.2071L3.49985 13.4142C2.7188 12.6332 2.7188 11.3668 3.49985 10.5858L9.29274 4.79289C9.68327 4.40237 10.3164 4.40237 10.707 4.79289C11.0975 5.18342 11.0975 5.81658 10.707 6.20711L5.91406 11H19.9998C20.5521 11 20.9998 11.4477 20.9998 12C20.9998 12.5523 20.5521 13 19.9998 13H5.91406L10.707 17.7929Z" fill="#9A9FA5"/>
          </svg>`,
            );
            editor.ui.registry.addIcon(
              'redo',
              `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2929 17.7929C12.9024 18.1834 12.9024 18.8166 13.2929 19.2071C13.6834 19.5976 14.3166 19.5976 14.7071 19.2071L20.5 13.4142C21.281 12.6332 21.281 11.3668 20.5 10.5858L14.7071 4.79289C14.3166 4.40237 13.6834 4.40237 13.2929 4.79289C12.9024 5.18342 12.9024 5.81658 13.2929 6.20711L18.0858 11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H18.0858L13.2929 17.7929Z" fill="#9A9FA5"/>
          </svg>`,
            );
            editor.ui.registry.addIcon(
              'link',
              `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 9.23858 4.23858 7 7 7H10C10.5523 7 11 7.44772 11 8C11 8.55228 10.5523 9 10 9H7C5.34315 9 4 10.3431 4 12C4 13.6569 5.34315 15 7 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H7C4.23858 17 2 14.7614 2 12Z" fill="#33383F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 8C13 7.44772 13.4477 7 14 7H17C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17H14C13.4477 17 13 16.5523 13 16C13 15.4477 13.4477 15 14 15H17C18.6569 15 20 13.6569 20 12C20 10.3431 18.6569 9 17 9H14C13.4477 9 13 8.55228 13 8Z" fill="#33383F"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12Z" fill="#33383F"/>
          </svg>`,
            );
          },
        }}
      />
    </Box>
  );
};
