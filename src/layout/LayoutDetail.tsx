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
  onBack?: () => void;
}

export default function LayoutDetail({ children, title, subTitle, variant = 'withoutTable', addNewItemButtonProps, onBack }: LayoutDetailProps) {
  if (variant === 'withTable') {
    return (
      <Box>
        <HeaderLayout subTitleHeader={subTitle} activeSideBarHeader={title} />
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" gap="8px" alignItems="center">
            <BackButton onBack={onBack} />
            {addNewItemButtonProps && <AddNewItemButton {...addNewItemButtonProps} />}
          </Stack>
          <Stack direction={{ mobile: 'column', laptop: 'row' }} spacing={{ xs: '30px', lg: '60px' }}>
            <Box flex="1" width="100%">
              {children}
            </Box>
          </Stack>
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <HeaderLayout subTitleHeader={subTitle} activeSideBarHeader={title} />
      <Box padding="24px">
        <Stack position="relative" direction={{ mobile: 'column', laptop: 'row' }}>
          <Box
            position={{ mobile: 'relative', desktop: 'absolute' }}
            marginBottom={{ mobile: '16px', desktop: '0px' }}
            top="0px"
            left="0px"
            zIndex={10}
          >
            <BackButton onBack={onBack} />
          </Box>
          <Box marginLeft={{ laptop: '62px', mobile: undefined }} flex="1">
            {children}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
