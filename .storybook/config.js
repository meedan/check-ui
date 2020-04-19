import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';

// import './storybook.css';

import ThemeProvider from '../src/ThemeProvider';

addParameters({
  options: {
    showRoots: true,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
});

configureActions({
  depth: 10,
  limit: 25,
});

addDecorator(story => (
  <ThemeProvider>
    <CssBaseline />
    {story()}
  </ThemeProvider>
));

addDecorator(withTests({ results }));
