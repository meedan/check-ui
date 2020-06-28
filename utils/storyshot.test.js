import React from 'react';
import initStoryshots from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

const renderWithReactIntl = component => {
  return render(<IntlProvider locale="en">{component}</IntlProvider>)
}

initStoryshots({
  framework: 'react',
  renderer: renderWithReactIntl,
});
