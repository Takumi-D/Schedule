import React, { Component } from 'react';

interface State {
  error: boolean;
  errorMessage: string;
}

interface Children {
  children: React.JSX.Element;
}

export default class ErrorBoundary extends Component<Children, State> {
  constructor(props: Children) {
    super(props);
  }

  state = {
    error: false,
    errorMessage: '',
  };

  compounentDidCatch(error: Error): void {
    this.setState({
      error: true,
      errorMessage: error.message,
    });
  }

  render() {
    const { error, errorMessage } = this.state;
    const { children } = this.props;

    if (error) {
      return <div>Ошибка: {errorMessage}</div>;
    }

    return children;
  }
}
