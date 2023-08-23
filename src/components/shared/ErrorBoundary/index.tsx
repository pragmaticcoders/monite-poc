import React, { Component, ErrorInfo, PropsWithChildren } from 'react';

class ErrorBoundary extends Component<PropsWithChildren> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });

    if (process.env.NODE_ENV !== 'production') {
      console.error(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <div className="generic-error-wrapper">Generic error</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
