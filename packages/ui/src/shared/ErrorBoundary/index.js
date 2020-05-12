import * as Sentry from '@sentry/browser';
import { config } from 'config';
import LogRocket from 'logrocket';
import { func, node, object } from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { ErrorPage } from '../ErrorPage';

const { SENTRY_DSN, SENTRY_ENV, RELEASE, isDebug, isTelemetryEnabled } = config;

class ErrorBoundary extends Component {
  static defaultProps = {
    renderError: (error, onFeedbackClick) => (
      <ErrorPage
        isDebug={isDebug}
        isTelemetryEnabled={isTelemetryEnabled}
        onFeedbackClick={onFeedbackClick}
        message={error.message}
      />
    ),
  };

  state = {
    error: null,
    eventId: null,
  };

  constructor(props) {
    super(props);
    this.onFeedbackClick = this.onFeedbackClick.bind(this);
  }

  componentDidCatch(error, info) {
    this.setState({ error });

    if (!isTelemetryEnabled) return;

    LogRocket.getSessionURL((sessionUrl) => {
      Sentry.withScope((scope) => {
        scope.setExtras(info);
        scope.setExtra('sessionUrl', sessionUrl);

        const eventId = Sentry.captureException(error);

        this.setState({ eventId });
      });
    });
  }

  componentDidMount() {
    if (!isTelemetryEnabled) return;

    Sentry.init({
      dsn: SENTRY_DSN,
      environment: SENTRY_ENV,
      release: RELEASE,
    });

    Sentry.configureScope((scope) => {
      scope.setTag('source', 'ui');
    });
  }

  onFeedbackClick() {
    if (!isTelemetryEnabled) return;

    const { eventId } = this.state;
    const { i18n } = this.props;
    const { lang } = i18n;

    Sentry.showReportDialog({
      eventId,
      lang,
    });
  }

  render() {
    const { children, renderError } = this.props;
    const { error } = this.state;

    return error ? renderError(error, () => this.onFeedbackClick()) : children;
  }
}

ErrorBoundary.propTypes = {
  children: node.isRequired,
  i18n: object.isRequired,
  renderError: func,
};

const TranslatedErrorBoundary = withTranslation('error')(ErrorBoundary);

export { TranslatedErrorBoundary as ErrorBoundary };
