import PropTypes from 'prop-types';
import React from 'react';

import grey from '@material-ui/core/colors/grey';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import '../assets/fonts/noto/stylesheet.css';
import '../assets/fonts/roboto/stylesheet.css';

const mui = createMuiTheme();

const theme = createMuiTheme({
  // Overrides
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: grey[900],
        fontSize: mui.typography.pxToRem(13),
        fontWeight: mui.typography.fontWeightRegular,
      },
    },
    MuiFab: {
      root: {
        backgroundColor: mui.palette.common.white,
        color: grey[700],
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
        borderBottom: `1px solid ${grey[200]}`,
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
      black: grey[900],
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
    divider: grey[200],
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

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

CustomThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

export default CustomThemeProvider;
