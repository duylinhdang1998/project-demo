import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { InputLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Values } from 'pages/admin/ServicesSettings/AddService';
import { memo, useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { uploadImageResource } from 'services/Resource/uploadImageResource';
import { selectAuth } from 'store/auth/selectors';
import { getUrlImage, getUrlOfResource } from 'utils/getUrlOfResource';

interface Props {
  props: UseControllerProps<Values>;
  isEdit?: boolean;
  defaultIcon?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: '14px !important',
    color: '#45485E',
    marginBottom: '4px',
  },
  inputSearch: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    padding: '12px 14px',
    height: '40px !important',
    fontSize: '14px !important',
  },
  icon: {
    width: 60,
    height: 60,
    objectFit: 'cover',
  },
  error: {
    marginTop: '8px !important',
    color: theme.palette.error.main,
  },
}));

function ListIcon({ props, isEdit, defaultIcon }: Props) {
  const classes = useStyles();
  const { field, fieldState } = useController(props);
  const { t } = useTranslation('serviceSetting');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const authSelector = useSelector(selectAuth);

  useEffect(() => {
    if (isEdit) {
      setImageUrl(getUrlImage(defaultIcon ?? ''));
    }
  }, [isEdit, defaultIcon]);

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // eslint-disable-next-line prettier/prettier
      if (!!info.file.originFileObj) {
        const response = await uploadImageResource({ file: info.file.originFileObj });
        if (response.code === 0) {
          field.onChange(response.data._id);
          setLoading(false);
          setImageUrl(getUrlOfResource(response.data));
        } else {
          message.error('Upload image error');
          field.onChange(undefined);
          setImageUrl('');
        }
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Box my="24px">
      <InputLabel htmlFor="title" className={classes.label}>
        {t('icon')}
      </InputLabel>
      <Upload
        name={field.name}
        listType="picture-card"
        className="avatar-uploader"
        multiple={false}
        showUploadList={false}
        action="https://api.tbus.biz/v1.0/resources/image"
        headers={{
          Authorization: `${authSelector.token}`,
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" className={classes.icon} /> : uploadButton}
      </Upload>
      {!!fieldState.error && (
        <Typography component="p" className={classes.error} fontSize={12}>
          {fieldState.error?.message}
        </Typography>
      )}
    </Box>
  );
}

export default memo(ListIcon);
