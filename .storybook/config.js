import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator, addParameters } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';

import ThemeProvider from '../src/utils/ThemeProvider';

addParameters({
  options: {
    showRoots: true,
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  dependencies: {
    //display only dependencies/dependents that have a story in storybook
    //by default this is false
    withStoriesOnly: false,

    //completely hide a dependency/dependents block if it has no elements
    //by default this is false
    hideEmpty: false,
  },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
});

configureActions({
  depth: 50,
  // Limit the number of items logged into the actions panel
  limit: 10,
});

addDecorator(story => (
  <ThemeProvider>
    <CssBaseline />
    {story()}
  </ThemeProvider>
));
