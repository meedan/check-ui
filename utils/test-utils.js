import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';

import ThemeProvider from 'src/ThemeProvider';

const renderWithReactIntl = component => {
  return render(<IntlProvider locale="en">{component}</IntlProvider>)
}

const AllTheProviders = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui, options) => renderWithReactIntl(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
