import initStoryshots from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';

initStoryshots({
  framework: 'react',
  renderer: render,
});
