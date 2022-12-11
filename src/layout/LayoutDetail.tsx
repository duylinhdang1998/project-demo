import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import BackButton from 'components/BackButton/BackButton';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React, { ReactNode } from 'react';

interface LayoutDetailProps {
  title?: string;
  subTitle?: string;
  children: ReactNode;
}

export default function LayoutDetail({ children, title, subTitle }: LayoutDetailProps) {
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
