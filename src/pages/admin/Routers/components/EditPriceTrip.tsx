import { InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface EditPriceTripProps {
  control: Control;
  isMulti?: boolean;
  index?: number;
}

const useStyles = makeStyles(() => ({
  cell: {
    border: '1px solid #F7F7F7',
    padding: '8px',
  },
  input: {
    textAlign: 'center',
    width: '100% !important',
  },
}));

export default function EditPriceTrip({ control, isMulti, index }: EditPriceTripProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const classes = useStyles();
  const getNameInput = (defaultName) => {
    if (isMulti) {
      return `stops.${index}.${defaultName}`;
    }
    return defaultName;
  };

  return (
    <TableContainer>
      <Table sx={{ borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '1px solid #F7F7F7', width: 'calc(100% / 3)' }}></TableCell>
            <TableCell component="th" sx={{ border: '1px solid #F7F7F7', width: 'calc(100% / 3)' }} align="center">
              {t('eco_tickets')} ($)
            </TableCell>
            <TableCell component="th" align="center" sx={{ border: '1px solid #F7F7F7', width: 'calc(100% / 3)' }}>
              {t('vip_tickets')} ($)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell} component="th" scope="row" align="center">
              {t('adult')}
            </TableCell>
            <TableCell className={classes.cell}>
              <Controller control={control} name={getNameInput('eco_adult')} render={({ field }) => <InputBase {...field} type="number" className={classes.input} />} />
            </TableCell>
            <TableCell className={classes.cell}>
              <Controller control={control} name={getNameInput('vip_adult')} render={({ field }) => <InputBase {...field} type="number" className={classes.input} />} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell} component="th" scope="row" align="center">
              {t('student')}
            </TableCell>
            <TableCell className={classes.cell}>
              <Controller control={control} name={getNameInput('eco_student')} render={({ field }) => <InputBase {...field} type="number" className={classes.input} />} />
            </TableCell>
            <TableCell className={classes.cell}>
              <Controller control={control} name={getNameInput('vip_student')} render={({ field }) => <InputBase {...field} type="number" className={classes.input} />} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.cell} component="th" scope="row" align="center">
              {t('children')}
            </TableCell>
            <TableCell className={classes.cell}>
              <Controller
                control={control}
                name={getNameInput('eco_children')}
                render={({ field }) => <InputBase {...field} type="number" className={classes.input} />}
              />
            </TableCell>
            <TableCell className={classes.cell}>
              <Controller
                control={control}
                name={getNameInput('vip_children')}
                render={({ field }) => <InputBase {...field} type="number" className={classes.input} />}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
