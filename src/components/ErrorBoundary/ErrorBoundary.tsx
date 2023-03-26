import React, { Component } from 'react';
import { Box } from '@mui/material';

interface Props {}

interface State {
  hasError: boolean;
}
class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Box height="100vh" sx={{ display: 'flex' }} className="container" justifyContent="center" alignItems="center">
          <img src="https://i.pinimg.com/originals/b8/b8/f7/b8b8f787c454cf1ded2d9d870707ed96.png" />
        </Box>
      );
    }
    return children;
  }
}
export default GlobalErrorBoundary;
