import React, { Component } from 'react';
import { Button, Typography } from '@mui/material';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div style={{ padding: 20 }}>
          <Typography variant="h6" color="error">Something went wrong!</Typography>
          <Typography variant="body1">{error.message}</Typography>
          <Button onClick={this.handleRetry} variant="contained">Retry</Button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
