import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '1rem',
          backgroundColor: '#fff5f5',
          fontFamily: 'sans-serif'
        }}>
          <h1 style={{ 
            color: '#c53030', 
            marginBottom: '0.625rem',
            fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
            textAlign: 'center'
          }}>Something went wrong</h1>
          <pre style={{
            backgroundColor: '#fff',
            padding: '0.9375rem',
            borderRadius: '0.3125rem',
            maxWidth: '100%',
            width: '100%',
            maxWidth: '42rem',
            overflow: 'auto',
            border: '1px solid #feb2b2',
            fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap'
          }}>
            {this.state.error && this.state.error.toString()}
            {'\n\n'}
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.25rem',
              padding: '0.625rem 1.25rem',
              backgroundColor: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '0.3125rem',
              cursor: 'pointer',
              fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
              fontWeight: 'bold',
              touchAction: 'manipulation',
              minHeight: '44px',
              minWidth: '44px'
            }}
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
