import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled error rendering the site:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            color: "#09244B",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Something went wrong.</h1>
          <p style={{ color: "#475569" }}>Please refresh the page. If the problem continues, contact us at marketing@edbuddies.ai.</p>
          <a href="/" style={{ color: "#0FB8F1", fontWeight: 600 }}>Back to Home</a>
        </div>
      );
    }

    return this.props.children;
  }
}
