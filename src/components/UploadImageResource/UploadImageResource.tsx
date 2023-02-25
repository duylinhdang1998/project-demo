import ClearIcon from '@mui/icons-material/Clear';
import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Image } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { UploadProps, UploadFile, UploadFileStatus, ItemRender } from 'antd/lib/upload/interface';
import clxs from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { ImageResource } from 'services/models/Resource';
import { uploadImageResource } from 'services/Resource/uploadImageResource';
import { getUrlOfResource } from 'utils/getUrlOfResource';
import { UploadButton } from './components/UploadButton';
import { handleCheckRequirements } from './utils/handleCheckRequirements';
import './styles.css';
import 'antd/lib/upload/style/css';
import 'antd/lib/image/style/css';

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
  response: ImageResource;
  status: Extract<UploadFileStatus, 'success'>;
}

interface FilePassViaProps extends FileBase {
  response: ImageResource;
  status: Extract<UploadFileStatus, 'done'>;
}

type FileItem = FileUploading | FileUploadSuccess | FilePassViaProps;

export interface UploadImageResourceProps {
  resources: ImageResource[];
  onChange?: (resources: ImageResource[]) => void;
  multiple?: boolean;
  className?: string;
  disabled?: boolean;
}

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
    height: '170px !important',
    objectFit: 'cover',
  },
  imgWrapper: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#858C93',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    padding: '10px',
  },
}));

export const UploadImageResource = ({ resources = [], multiple = false, className, disabled = false, onChange }: UploadImageResourceProps) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
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
          name: sessionId,
          url: URL.createObjectURL(file),
          thumbUrl: URL.createObjectURL(file),
          type: file.type,
          status: 'uploading',
          response: null,
        });
      });
      setLoading(true);
      try {
        const response = await uploadImageResource({ file });
        handleSetFileListStateByInteractive(state => {
          return state.map(item => {
            if (item.uid === sessionId) {
              return {
                uid: response.data._id,
                name: response.data._id,
                url: getUrlOfResource(response.data),
                thumbUrl: getUrlOfResource(response.data),
                type: response.data.mimetype,
                status: 'success',
                response: response.data,
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
      } finally {
        setLoading(false);
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
          thumbUrl: getUrlOfResource(resource),
          url: getUrlOfResource(resource),
          response: resource,
        })),
      );
    }
  }, [resources]);

  useEffect(() => {
    if (!isStateChangedByResourcesProps.current) {
      onChange?.(
        fileListState.reduce<ImageResource[]>((result, file) => {
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
      return <CircularProgress />;
    }
    return (
      <Box width="100%" height="170px" position="relative">
        <Image src={file.url} className={classes.img} />
        <Box
          className={classes.imgWrapper}
          onClick={() => {
            handleSetFileListStateByInteractive([]);
          }}
        >
          <ClearIcon sx={{ color: '#fff' }} />
        </Box>
      </Box>
    );
  };

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
        accept="image/*"
        fileList={fileListState}
        beforeUpload={beforeUpload}
        itemRender={renderImage}
        disabled={disabled}
      >
        {!!fileListState.length && !loading ? null : <UploadButton loading={loading} />}
      </Dragger>
    </div>
  );
};
