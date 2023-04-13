import { Stack } from '@mui/material';
import { Empty } from 'antd';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router';

interface EmptyScreenProps {
  description: string;
}

export const EmptyScreen = ({ description }: EmptyScreenProps) => {
  const navigate = useNavigate();
  return (
    <Stack sx={{ paddingTop: '40px' }} justifyContent="center" alignItems="center">
      <Empty description={description} />
      <Button backgroundButton="#1aa6ee" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </Stack>
  );
};
