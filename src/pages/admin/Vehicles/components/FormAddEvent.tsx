import { UploadFileOutlined } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, IconButton, InputLabel, Stack, TextareaAutosize, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Upload } from 'antd';
import { UploadFile, UploadFileStatus } from 'antd/es/upload/interface';
import 'antd/lib/upload/style/css';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import FileIcon from 'components/SvgIcon/FileIcon';
import dayjs from 'dayjs';
import { memo, ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fieldsAddEvent } from '../constants';

interface Values {
  reminder_date: string;
  total_kilometer: string;
  fuel_fees: string;
  extra_fees: string;
  descriptions: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  inputArea: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    fontSize: '14px !important',
    width: '100%',
    padding: '12px 14px',
    '&:focus-visible': {
      outline: 'none !important',
    },
  },
  label: {
    color: theme.palette.grey[200] + '!important',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
  },
}));

function FormAddEvent() {
  const { t } = useTranslation(['vehicles', 'translation']);
  const classes = useStyles();
  const { control } = useForm<Values>();

  const renderAttachment = (originNode: ReactElement, file: UploadFile, fileList: any, actions: any) => {
    return (
      <Stack direction="row" spacing={2} alignItems="center" py="10px" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
          <FileIcon />
          <Box>
            <Typography fontSize={14} color="#45485E">
              {file.name.toUpperCase()}
            </Typography>
            <Typography component="span" color="#858C93" fontSize={12}>
              {dayjs(file.lastModifiedDate).format('DD, MMM YYYY hh:mm a')} <span>{file.size} KB</span>
            </Typography>
          </Box>
        </Stack>
        <IconButton onClick={actions.remove}>
          <ClearIcon />
        </IconButton>
      </Stack>
    );
  };

  const defaultFileList: UploadFile<string>[] = [
    {
      uid: '1',
      name: 'xxx.pdf',
      status: 'done' as UploadFileStatus,
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
      size: 157,
      lastModifiedDate: new Date(),
    },
  ];
  return (
    <Box>
      <FormVerticle control={control} fields={fieldsAddEvent} filterKey="vehicles" grid />
      <Box my="16px">
        <InputLabel htmlFor="description" className={classes.label}>
          {t(`descriptions`)}
        </InputLabel>
        <Controller
          name="descriptions"
          control={control}
          render={({ field }) => <TextareaAutosize {...field} minRows={10} maxRows={10} placeholder={t(`descriptions`)} id="description" className={classes.inputArea} />}
        />
      </Box>
      <Box my="16px">
        <InputLabel htmlFor="description" className={classes.label} sx={{ fontWeight: 'bold !important' }}>
          {t(`attach_document`)}
        </InputLabel>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          defaultFileList={defaultFileList}
          itemRender={renderAttachment}
          showUploadList={{
            removeIcon: <ClearIcon />,
            showRemoveIcon: true,
          }}
        >
          <Button variant="outlined" startIcon={<UploadFileOutlined />} sx={{ color: '#1AA6EE' }}>
            {t(`attach_document`)}
          </Button>
        </Upload>
      </Box>
    </Box>
  );
}

export default memo(FormAddEvent);
