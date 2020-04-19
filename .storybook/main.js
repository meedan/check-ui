const Dotenv = require('dotenv-webpack');

module.exports = {
  webpackFinal: async config => {
    config.plugins.push(new Dotenv());
    return config;
  },
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-jest/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-links/register',
    '@storybook/addon-viewport/register',
    'storybook-dark-mode/register',
  ],
};
