import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, Grid, InputBase, InputLabel, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import TrashSvg from 'assets/images/trash.svg';
import Button from 'components/Button/Button';
import { customStyles } from 'components/FilterTicket/customStyles';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { useMount, useRequest } from 'ahooks';
import { getPackageSettings } from 'services/PackageSetting/Company/getPackageSettings';
import { isEmpty } from 'lodash-es';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.grey[200],
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
  },
  select: {
    border: '1px solid #F7F7F7 !important',
    borderRadius: '4px',
    backgroundColor: '#fff',
    height: '40px',
    position: 'relative',
  },
  input: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    fontSize: '14px !important',
    height: '40px',
    padding: '0 10px',
    '&:focus-visible': {
      outline: 'none',
    },
  },
  inputNumberWrap: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    height: '40px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  inputNumber: {
    width: '100%',
    height: '35px',
    borderColor: 'transparent',
    '&:focus-visible': {
      outline: 'none',
    },
  },
  prefix: {
    fontSize: '14px',
  },
  btn: {
    border: '1px solid #1AA6EE',
    borderStyle: 'dashed !important',
    color: '#1AA6EE',
    backgroundColor: 'transparent !important',
    '&:hover': {
      color: '#1AA6EE !important',
    },
  },
}));

interface Props {
  showButton?: boolean;
  control: any;
  errors?: any;
}

export default function FormMerchandise({ control, errors }: Props) {
  const { t } = useTranslation(['packageSales', 'translation']);
  const classes = useStyles();

  const { data, run } = useRequest(getPackageSettings, {
    manual: true,
  });

  useMount(() => {
    run({ isGetAll: true, searcher: {}, sorter: {}, page: 0 });
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'merchandise' as never,
  });

  const handleAppend = () => {
    append({ title: '', weight: '', price: '' });
  };

  return (
    <Box>
      {fields.map((i, index) => (
        <Box key={i.id} my="16px">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="textBold" mb="16px">
              {t('translation:merchandise')} {index + 1} <span style={{ color: '#FF2727' }}>*</span>
            </Typography>
            {fields.length > 1 && <TextWithIcon icon={TrashSvg} text={t('translation:delete')} color="#FF2727" onClick={remove} />}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Controller
                control={control}
                name={`merchandise.${index}.title`}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Box>
                    <InputLabel htmlFor={`merchandise.${index}.title`} className={classes.label}>
                      {t(`title`)}
                    </InputLabel>
                    <Select
                      {...field}
                      id={`merchandise.${index}.title`}
                      options={data?.data.hits.map(i => ({
                        value: i._id,
                        label: i.title,
                      }))}
                      styles={customStyles}
                      placeholder={t(`title`)}
                    />
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={`merchandise.${index}.weight`}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Box>
                    <InputLabel htmlFor={`merchandise.${index}.weight`} className={classes.label}>
                      {t(`weight`)}
                    </InputLabel>
                    <InputBase fullWidth {...field} id={`merchandise.${index}.weight`} placeholder={t(`weight`)} className={classes.input} />
                  </Box>
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name={`merchandise.${index}.price`}
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Box>
                    <InputLabel htmlFor={`merchandise.${index}.price`} className={classes.label}>
                      {t(`price`)}
                    </InputLabel>
                    <Box className={classes.inputNumberWrap}>
                      <span className={classes.prefix}>$</span>
                      <input {...field} id={`merchandise.${index}.price`} min={0} defaultValue={1} type="number" className={classes.inputNumber} />
                    </Box>
                  </Box>
                )}
              />
            </Grid>
          </Grid>
          {!isEmpty(errors.merchandise) && (
            <Typography fontSize={12} paddingY="8px" color="#FF2727">
              {t('translation:error_required', { name: t(`merchandise`).toLowerCase() })}
            </Typography>
          )}
          <Typography fontSize={12} component="p" my="16px" color="#858C93">
            Admin description: Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
          </Typography>
          <Divider sx={{ borderStyle: 'dashed' }} />
        </Box>
      ))}
      <Button variant="outlined" fullWidth className={classes.btn} startIcon={<AddIcon sx={{ color: '#1AA6EE' }} />} onClick={handleAppend}>
        {t('add_new_merchandise')}
      </Button>
    </Box>
  );
}
