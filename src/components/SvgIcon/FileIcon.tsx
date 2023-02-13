import FileSvg from 'assets/images/file.svg';
import { Box } from '@mui/material';
import { memo } from 'react';

function FileIcon() {
  return (
    <Box>
      <img src={FileSvg} width={60} height={60} />
    </Box>
  );
}
export default memo(FileIcon);
