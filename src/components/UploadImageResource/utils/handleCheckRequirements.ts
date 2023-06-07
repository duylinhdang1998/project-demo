import { RcFile } from 'antd/lib/upload';

interface HandleCheckRequirements {
  file: RcFile;
}

type RT = 'INVALID_TYPE' | 'INVALID_FILE_SIZE' | undefined;

export const handleCheckRequirements = ({ file }: HandleCheckRequirements): RT => {
  const isValidType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
  if (!isValidType) {
    return 'INVALID_TYPE';
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return 'INVALID_FILE_SIZE';
  }
};
