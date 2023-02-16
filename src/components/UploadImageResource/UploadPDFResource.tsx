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
  buttonText: string;
}

export const UploadPDFResource = ({ resources = [], multiple = false, className, onChange, buttonText }: UploadPDFResourceProps) => {
  const [fileListState, setFileListState] = useState<FileItem[]>([]);
  const isStateChangedByResourcesProps = useRef(false);

  const beforeUpload: UploadProps['beforeUpload'] = async file => {
    const error = false;
    if (!error) {
      const sessionId = v4();
      setFileListState(state => {
        return state.concat({
          uid: sessionId,
          name: sessionId,
          url: undefined,
          thumbUrl: undefined,
          type: file.type,
          status: 'uploading',
          response: null,
        });
      });
      try {
        const response = await uploadPDFResource({ file });
        setFileListState(state => {
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
        toast.error(`${file.name} file upload failed.`);
      }
    } else {
      if (error === 'INVALID_FILE_SIZE') {
        toast.error('Image must smaller than 2MB!');
      }
      if (error === 'INVALID_TYPE') {
        toast.error('You can only upload JPG/PNG file!');
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
    isStateChangedByResourcesProps.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileListState]);

  const renderImage: ItemRender<FileItem> = (_originNode, antdFile) => {
    const file = antdFile as FileItem;
    if (file.status === 'uploading') {
      return (
        <Stack direction="row" spacing={2} alignItems="center" py="10px" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <FileIcon />
            <Typography fontSize={14} color="#45485E">
              {/* FIXME: Attach đang k có "name" */}
              {file.name.toUpperCase()}
            </Typography>
          </Stack>
          <IconButton>
            <CircularProgress />
          </IconButton>
        </Stack>
      );
    }
    return (
      <Stack direction="row" spacing={2} alignItems="center" py="10px" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <FileIcon />
          <Box>
            <Typography fontSize={14} color="#45485E">
              {/* FIXME: Attach đang k có "name" */}
              {file.response._id}
            </Typography>
            <Typography component="span" color="#858C93" fontSize={12}>
              {dayjs(file.response.createdAt).format('DD/MM/YYYY')} <span>{filesize(file.response.size)}</span>
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={() => {
            setFileListState([]);
          }}
        >
          <ClearIcon />
        </IconButton>
      </Stack>
    );
  };

  // FIXME: Style chưa giống design
  return (
    <div className="upload-wrapper">
      <Dragger
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
