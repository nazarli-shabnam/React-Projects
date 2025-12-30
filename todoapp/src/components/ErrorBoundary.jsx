import { Component } from "react";
import styles from "./errorboundary.module.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContent}>
            <h2 className={styles.errorTitle}>⚠️ Something went wrong</h2>
            <p className={styles.errorMessage}>
              We encountered an unexpected error. Don't worry, your todos are
              safe!
            </p>
            <details className={styles.errorDetails}>
              <summary>Error details</summary>
              <pre>{this.state.error?.toString()}</pre>
            </details>
            <button className={styles.resetButton} onClick={this.handleReset}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
