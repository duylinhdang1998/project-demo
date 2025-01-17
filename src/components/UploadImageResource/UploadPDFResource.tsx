import { UploadFileOutlined } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import Dragger from 'antd/lib/upload/Dragger';
import { ItemRender, UploadFile, UploadFileStatus, UploadProps } from 'antd/lib/upload/interface';
import 'antd/lib/upload/style/css';
import clxs from 'classnames';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import Button from 'components/Button/Button';
import FileIcon from 'components/SvgIcon/FileIcon';
import { PDFResource } from 'services/models/Resource';
import { uploadPDFResource } from 'services/Resource/uploadPDFResource';
import './styles.css';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { ServiceException } from 'services/utils/ServiceException';
import { handleCheckRequirements } from './utils/handleCheckRequirements';
import { useTranslation } from 'react-i18next';
import { getNameOfResource } from 'utils/getNameOfResource';
interface FileBase {
  uid: UploadFile['uid'];
  name: UploadFile['name'];
  url: UploadFile['url'];
  thumbUrl: UploadFile['thumbUrl'];
  type: UploadFile['type'];
}

interface FileUploading extends FileBase {
  response: null;
  status: Extract<UploadFileStatus, 'uploading'>;
}

interface FileUploadSuccess extends FileBase {
  // "response" sẽ đóng vai trò như store. Lưu lại những thông tin cần thiết
  response: PDFResource;
  status: Extract<UploadFileStatus, 'success'>;
}

interface FilePassViaProps extends FileBase {
  response: PDFResource;
  status: Extract<UploadFileStatus, 'done'>;
}

type FileItem = FileUploading | FileUploadSuccess | FilePassViaProps;

export interface UploadPDFResourceProps {
  resources: PDFResource[];
  onChange?: (resources: PDFResource[]) => void;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
  buttonText: string;
}

export const UploadPDFResource = ({
  resources = [],
  multiple = false,
  className,
  disabled = false,
  onChange,
  buttonText,
}: UploadPDFResourceProps) => {
  const { t } = useTranslation(['translation']);

  const [fileListState, setFileListState] = useState<FileItem[]>([]);
  const isStateChangedByResourcesProps = useRef(false);

  const handleSetFileListStateByInteractive: typeof setFileListState = state => {
    isStateChangedByResourcesProps.current = false;
    setFileListState(state);
  };

  const beforeUpload: UploadProps['beforeUpload'] = async file => {
    const error = handleCheckRequirements({ file });
    if (!error) {
      const sessionId = v4();
      setFileListState(state => {
        return state.concat({
          uid: sessionId,
          name: file.name,
          url: undefined,
          thumbUrl: undefined,
          type: file.type,
          status: 'uploading',
          response: null,
        });
      });
      try {
        const response = await uploadPDFResource({ file });
        handleSetFileListStateByInteractive(state => {
          return state.map(item => {
            if (item.uid === sessionId) {
              return {
                uid: response.data._id,
                name: response.data._id,
                type: response.data.mimetype,
                status: 'success',
                response: response.data,
                thumbUrl: undefined,
                url: undefined,
              };
            }
            return item;
          });
        });
      } catch (error) {
        setFileListState(state => {
          return state.filter(item => item.uid !== sessionId);
        });
        toast(<ToastCustom type="error" text={ServiceException.getMessageError(error)} />, {
          className: 'toast-error',
        });
      }
    } else {
      if (error === 'INVALID_FILE_SIZE') {
        toast.error(t('translation:attach_invalid_size'));
      }
      if (error === 'INVALID_TYPE') {
        toast.error(t('translation:attach_invalid_mime_type', { mimeType: 'PDF' }));
      }
    }

    return false;
  };

  useEffect(() => {
    if (Array.isArray(resources)) {
      isStateChangedByResourcesProps.current = true;
      setFileListState(
        resources.map(resource => ({
          status: 'done',
          type: resource.mimetype,
          name: resource._id,
          uid: resource._id,
          response: resource,
          url: undefined,
          thumbUrl: undefined,
        })),
      );
    }
  }, [resources]);

  useEffect(() => {
    if (!isStateChangedByResourcesProps.current) {
      onChange?.(
        fileListState.reduce<PDFResource[]>((result, file) => {
          if (file.response !== null) {
            return result.concat(file.response);
          }
          return result;
        }, []),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileListState]);

  const renderImage: ItemRender<FileItem> = (_originNode, antdFile) => {
    const file = antdFile as FileItem;
    if (file.status === 'uploading') {
      return (
        <Stack direction="row" spacing={2} alignItems="center" py="10px" justifyContent="center">
          <CircularProgress />
        </Stack>
      );
    }
    return (
      <Stack direction="row" spacing={2} alignItems="center" py="10px" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <FileIcon />
          <Box>
            <Typography fontSize={14} color="#45485E">
              {getNameOfResource(file.response)}
            </Typography>
            <Typography component="span" color="#858C93" fontSize={12}>
              {dayjs(file.response.createdAt).format('Do, MMMM YYYY [at] hh:mm A')} <span>{filesize(file.response.size, { round: 2 })}</span>
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={() => {
            handleSetFileListStateByInteractive([]);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Stack>
    );
  };

  return (
    <div className="upload-wrapper">
      <Dragger
        disabled={disabled}
        listType="picture"
        className={clxs(
          'picture-uploader',
          {
            ['hidden']: !!fileListState.length,
          },
          className,
        )}
        multiple={multiple}
        accept="application/pdf"
        fileList={fileListState}
        beforeUpload={beforeUpload}
        itemRender={renderImage}
      >
        <Button variant="outlined" startIcon={<UploadFileOutlined />} sx={{ color: '#1AA6EE' }}>
          {buttonText}
        </Button>
      </Dragger>
    </div>
  );
};
