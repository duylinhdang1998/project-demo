import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { AddNewItemButton, AddNewItemButtonProps } from 'components/AddNewItemButton/AddNewItemButton';
import BackButton from 'components/BackButton/BackButton';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';

interface LayoutDetailProps {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  variant?: 'withTable' | 'withoutTable';
  addNewItemButtonProps?: AddNewItemButtonProps;
}

export default function LayoutDetail({ children, title, subTitle, variant = 'withoutTable', addNewItemButtonProps }: LayoutDetailProps) {
  if (variant === 'withTable') {
    return (
      <Box>
        <HeaderLayout subTitleHeader={subTitle} activeSideBarHeader={title} />
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between">
            <BackButton />
            {addNewItemButtonProps && <AddNewItemButton {...addNewItemButtonProps} />}
          </Stack>
          <Stack direction={{ mobile: 'column', laptop: 'row' }} spacing={{ xs: '30px', lg: '60px' }}>
            {children}
          </Stack>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <HeaderLayout subTitleHeader={subTitle} activeSideBarHeader={title} />
      <Box padding="24px">
        <Stack direction={{ mobile: 'column', laptop: 'row' }} spacing={{ xs: '30px', lg: '60px' }}>
          <BackButton />
          {children}
        </Stack>
      </Box>
    </Box>
  );
}
