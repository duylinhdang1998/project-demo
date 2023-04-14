import { Box } from '@mui/material';
import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary2() {
  const error = useRouteError();
  return error ? (
    <Box height="100vh" sx={{ display: 'flex' }} className="container" justifyContent="center" alignItems="center">
      <img src="https://i.pinimg.com/originals/b8/b8/f7/b8b8f787c454cf1ded2d9d870707ed96.png" />
    </Box>
  ) : null;
}
