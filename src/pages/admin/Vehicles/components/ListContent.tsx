import { Box, Divider, Grid, List, ListItem, Stack, Typography } from '@mui/material';
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import FileIcon from 'components/SvgIcon/FileIcon';

const dataDetail = [
  {
    id: uuid(),
    date: '03/04/2022',
    descriptions:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    driver_name: 'May Max',
    kilometers: '100 kms',
    fuel_fees: '50$',
    extra_fees: '10$',
  },
  {
    id: uuid(),
    date: '03/04/2022',
    descriptions:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    driver_name: 'May Max',
    kilometers: '100 kms',
    fuel_fees: '50$',
    extra_fees: '10$',
  },
];

function ListContent() {
  const { t } = useTranslation('vehicles');
  return (
    <List>
      {dataDetail.map((item, idx) => (
        <Fragment key={item.id}>
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Grid container>
              {Object.keys(item).map(
                (key, index) =>
                  index !== 0 && (
                    <Fragment key={key}>
                      <Grid item xs={3} sx={{ padding: '10px 0' }}>
                        <Typography variant="body2">{t(`${key}`)}:</Typography>
                      </Grid>
                      <Grid item xs={9} sx={{ padding: '10px 0' }}>
                        <Typography variant="body2">{item[key]}</Typography>
                      </Grid>
                    </Fragment>
                  ),
              )}
            </Grid>
            <Stack direction="row" spacing={2} alignItems="center" py="10px">
              <FileIcon />
              <Box>
                <Typography fontSize={14} color="#45485E">
                  Document.pdf
                </Typography>
                <Typography component="span" color="#858C93" fontSize={12}>
                  4, March 2022 at 10:44 AM . <span>15,69 KB</span>
                </Typography>
              </Box>
            </Stack>
          </ListItem>
          {idx < dataDetail.length - 1 && <Divider variant="middle" sx={{ border: '1.5px dashed #AEB1C5 !important' }} />}
        </Fragment>
      ))}
    </List>
  );
}
export default memo(ListContent);
