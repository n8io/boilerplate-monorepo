import { func, node } from 'prop-types';
import React, { Component } from 'react';
import { ErrorPage } from '../ErrorPage';

class ErrorBoundary extends Component {
  static defaultProps = {
    renderError: error => <ErrorPage message={error.message} />,
  };

  static propTypes = {
    children: node.isRequired,
    renderError: func,
  };

  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { children, renderError } = this.props;
    const { error } = this.state;

    return error ? renderError(error) : children;
  }
}

export { ErrorBoundary };
