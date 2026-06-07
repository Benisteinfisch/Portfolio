import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-nordic-bg flex items-center justify-center p-8 transition-colors duration-300">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-serif text-nordic-text mb-4">Etwas ist schiefgelaufen</h1>
            <p className="text-nordic-muted mb-6 text-sm leading-relaxed">
              Ein unerwarteter Fehler ist aufgetreten. Bitte lade die Seite neu.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full bg-nordic-accent text-white text-sm font-semibold hover:bg-nordic-accent-hover transition-colors"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
