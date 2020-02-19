'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireDefault(require('react'));

var _grey = _interopRequireDefault(require('@material-ui/core/colors/grey'));

var _styles = require('@material-ui/styles');

var _styles2 = require('@material-ui/core/styles');

require('../assets/fonts/noto/stylesheet.css');

require('../assets/fonts/roboto/stylesheet.css');

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
  return _react['default'].createElement(
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
exports['default'] = _default;
