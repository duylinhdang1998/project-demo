import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TextWithLink from 'components/TextWithLink/TextWithLink';

const useStyles = makeStyles(() => ({
  upload: {
    height: '170px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

interface UploadButtonProps {
  loading: boolean;
}
export const UploadButton = ({ loading }: UploadButtonProps) => {
  const classes = useStyles();
  return <Box className={classes.upload}>{loading ? <CircularProgress /> : <TextWithLink text="Drag & drop or" highlight="browse" />}</Box>;
};
