(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'prop-types',
      'react',
      '@material-ui/core/colors/grey',
      '@material-ui/styles',
      '@material-ui/core/styles',
      '../assets/fonts/noto/stylesheet.css',
      '../assets/fonts/roboto/stylesheet.css',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/colors/grey'),
      require('@material-ui/styles'),
      require('@material-ui/core/styles'),
      require('../assets/fonts/noto/stylesheet.css'),
      require('../assets/fonts/roboto/stylesheet.css')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.react,
      global.grey,
      global.styles,
      global.styles,
      global.stylesheet,
      global.stylesheet
    );
    global.ThemeProvider = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _grey,
  _styles,
  _styles2,
  _stylesheet,
  _stylesheet2
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = void 0;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);
  _grey = _interopRequireDefault(_grey);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var mui = (0, _styles2.createMuiTheme)();
  var theme = (0, _styles2.createMuiTheme)({
    // Overrides
    overrides: {
      MuiTooltip: {
        tooltip: {
          backgroundColor: _grey['default'][900],
          fontSize: mui.typography.pxToRem(13),
          fontWeight: mui.typography.fontWeightRegular,
        },
      },
      MuiFab: {
        root: {
          backgroundColor: mui.palette.common.white,
          color: _grey['default'][700],
          '&:hover': {
            backgroundColor: mui.palette.common.white,
            color: 'orange',
          },
        },
        primary: {
          backgroundColor: 'orange',
          color: mui.palette.common.white,
          '&:hover': {
            backgroundColor: 'orange',
            color: mui.palette.common.white,
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: 6,
          '&:hover': {
            backgroundColor: 'transparent',
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
            '&$disabled': {
              backgroundColor: 'transparent',
            },
          },
        },
        colorPrimary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        colorSecondary: {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiTableCell: {
        root: {
          borderBottom: '1px solid '.concat(_grey['default'][200]),
        },
      },
      MuiMenuItem: {
        root: {
          minHeight: 44,
        },
      },
      MuiListItemIcon: {
        root: {
          minWidth: 36,
        },
      },
      MuiListItemText: {
        dense: {
          fontSize: mui.typography.pxToRem(10),
          marginBottom: 2,
          marginTop: 2,
        },
      },
    },
    // Props
    props: {
      MuiButtonBase: {
        disableRipple: true,
      },
    },
    // Palette
    palette: {
      common: {
        black: _grey['default'][900],
        white: '#fff',
      },
      primary: {
        light: '#ff6d01',
        main: '#ff6d01',
        dark: '#ff6d01',
        contrastText: '#fff',
      },
      secondary: {
        light: '#212121',
        main: '#212121',
        dark: '#212121',
        contrastText: '#fff',
      },
      divider: _grey['default'][200],
    },
    // Shape
    shape: {
      borderRadius: 2,
    },
    // Typography
    typography: {
      h6: {
        fontWeight: mui.typography.fontWeightRegular,
      },
    },
  });

  var CustomThemeProvider = function CustomThemeProvider(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/ _react['default'].createElement(
      _styles.ThemeProvider,
      {
        theme: theme,
      },
      children
    );
  };

  CustomThemeProvider.propTypes = {
    children: _propTypes['default'].oneOfType([
      _propTypes['default'].array,
      _propTypes['default'].node,
      _propTypes['default'].object,
      _propTypes['default'].string,
    ]).isRequired,
  };
  var _default = CustomThemeProvider;
  _exports['default'] = _default;
});
