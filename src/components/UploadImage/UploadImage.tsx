import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Image, Upload } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload/interface';
import 'antd/lib/image/style/css';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import 'antd/lib/upload/style/css';
import clxs from 'classnames';
import TextWithLink from 'components/TextWithLink/TextWithLink';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './styles.css';

const useStyles = makeStyles(() => ({
  upload: {},
  img: {
    width: '100%',
    height: '170px !important',
    objectFit: 'cover',
  },
  avatarUpload: {
    height: '170px',
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

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function UploadImage() {
  const classes = useStyles();
  const [imageUrl, setImg] = useState('');
  const [_, setValid] = useState(false);
  const [loading] = useState(false);
  const [fileList, setFileList] = useState<UploadProps['fileList']>([]);

  async function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      setValid(false);
      toast.error('You can only upload JPG/PNG file!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setValid(false);
      toast.error('Image must smaller than 2MB!');
      return;
    }
  }

  const handleChange = async (info: UploadChangeParam<UploadFile<unknown>>) => {
    if (info.file.status !== 'removed') {
      const { file } = info;
      console.log({ file });
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      setImg(file.preview ?? '');
      setFileList(info.fileList);
    }
  };

  const uploadButton = <Box className={classes.upload}>{loading ? <CircularProgress /> : <TextWithLink text="Drag & drop or" highlight="browse" />}</Box>;
  const renderImage = (originNode: ReactElement, file: UploadFile, filesLists: any, actions: any) => {
    return (
      <Box width="100%" height="170px" position="relative">
        <Image src={file.preview} className={classes.img} />
        <Box
          className={classes.imgWrapper}
          onClick={() => {
            setImg('');
            setFileList([]);
            actions.remove();
          }}
        >
          <ClearIcon sx={{ color: '#fff' }} />
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    console.log({ imageUrl });
  }, [imageUrl]);

  return (
    <div className="upload-wrapper">
      <Upload.Dragger
        name="avatar"
        showUploadList={true}
        listType="picture"
        className={clxs('picture-uploader', {
          ['hidden']: !!imageUrl,
        })}
        fileList={fileList}
        onChange={handleChange}
        itemRender={renderImage}
        beforeUpload={beforeUpload}
      >
        {!!imageUrl ? null : uploadButton}
      </Upload.Dragger>
    </div>
  );
}
