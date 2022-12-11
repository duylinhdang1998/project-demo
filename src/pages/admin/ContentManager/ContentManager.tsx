import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, Divider, InputLabel, TextareaAutosize, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardWhite from 'components/CardWhite/CardWhite';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { Field } from 'models/Field';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

const fields: Field[] = [
  { id: uuid(), type: 'text', label: 'main_office_postal_address' },
  { id: uuid(), type: 'text', label: 'main_office_zip_code' },
  { id: uuid(), type: 'text', label: 'main_office_city' },
  { id: uuid(), type: 'text', label: 'phone_number' },
  { id: uuid(), type: 'text', label: 'email' },
];

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: '14px !important',
    color: '#45485E',
    marginBottom: '4px',
  },
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
}));

function ContentManager() {
  const { t } = useTranslation(['account', 'translation']);
  const [open, setOpen] = useState(false);
  const { control } = useForm();

  const classes = useStyles();

  const handleClose = () => setOpen(false);

  const handleCancel = () => setOpen(true);
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('subcription')} />
      <Box p="24px">
        <CardWhite title={t('content_manager')}>
          <Typography fontWeight={700} color="#0C1132">
            {t('content')}
          </Typography>
          <Box my="20px">
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              config={{
                ckfinder: {
                  uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
            />
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box my="20px">
            <Typography fontWeight={700} color="#0C1132" my="10px">
              {t('translation:sideBar')}
            </Typography>
            <FormVerticle control={control} fields={fields} grid isGridHorizon filterKey="account" />
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box my="20px">
            <Typography fontWeight={700} color="#0C1132" my="10px">
              {t('translation:footer')}
            </Typography>
            <InputLabel htmlFor="description" className={classes.label}>
              {t(`descriptions`)}
            </InputLabel>
            <TextareaAutosize minRows={10} maxRows={10} placeholder={t(`descriptions`)} id="description" className={classes.inputArea} />
          </Box>
          <ComboButton onCancel={handleCancel} />
        </CardWhite>
      </Box>

      <DialogConfirm openDialog={open} title={t('translation:cancel_type', { type: t('content') })} subTitle={t('translation:leave_page')} onClose={handleClose} />
    </Box>
  );
}

export default ContentManager;
