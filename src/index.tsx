import React from 'react';
import { createRoot } from 'react-dom/client';

import ErrorBoundary from './components/ErrorBoundary';
import Schedule from './components/Schedule';

import './style/normalize.scss';
import './index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ErrorBoundary>
    <Schedule />
  </ErrorBoundary>,
);
