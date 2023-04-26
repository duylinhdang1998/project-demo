import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    segmented: {
      borderRadius: '8px !important',
      padding: '4px',
      '& .ant-segmented-item, & .ant-segmented-thumb': {
        borderRadius: '8px !important',
      },
    },
    segmentedItem: {
      padding: '4px 16px',
      fontSize: '14px',
      color: 'rgba(12, 17, 50, 1)',
    },
  };
});
