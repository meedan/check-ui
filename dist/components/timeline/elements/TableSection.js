(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'prop-types',
      'react',
      '@material-ui/core/Grid',
      '@material-ui/core/Typography',
      '@material-ui/core/styles/makeStyles',
      './TableBlock',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/Grid'),
      require('@material-ui/core/Typography'),
      require('@material-ui/core/styles/makeStyles'),
      require('./TableBlock')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.react,
      global.Grid,
      global.Typography,
      global.makeStyles,
      global.TableBlock
    );
    global.TableSection = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _Grid,
  _Typography,
  _makeStyles,
  _TableBlock
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = TableSection;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);
  _Grid = _interopRequireDefault(_Grid);
  _Typography = _interopRequireDefault(_Typography);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _TableBlock = _interopRequireDefault(_TableBlock);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var useStyles = (0, _makeStyles['default'])({
    root: {
      width: '100%',
      position: 'relative',
    },
    grid: {
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  });

  function TableSection(props) {
    var classes = useStyles();
    var actions = props.actions,
      children = props.children,
      firstRowContent = props.firstRowContent,
      title = props.title;
    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: classes.root,
        onMouseLeave: props.onMouseLeave,
      },
      /*#__PURE__*/ _react['default'].createElement(_TableBlock['default'], {
        plain: props.plain,
        section: true,
        leftColContent: /*#__PURE__*/ _react['default'].createElement(
          _Grid['default'],
          {
            alignItems: 'center',
            className: classes.grid,
            container: true,
            justify: 'space-between',
          },
          /*#__PURE__*/ _react['default'].createElement(
            _Grid['default'],
            {
              item: true,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _Typography['default'],
              {
                variant: 'subtitle2',
              },
              title
            )
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Grid['default'],
            {
              item: true,
            },
            actions
          )
        ),
        rightColContent: firstRowContent,
      }),
      children
    );
  }

  TableSection.propTypes = {
    actions: _propTypes['default'].oneOfType([
      _propTypes['default'].arrayOf(_propTypes['default'].node),
      _propTypes['default'].node,
    ]),
    children: _propTypes['default'].oneOfType([
      _propTypes['default'].arrayOf(_propTypes['default'].node),
      _propTypes['default'].node,
    ]),
    onMouseLeave: _propTypes['default'].func,
    plain: _propTypes['default'].bool,
    title: _propTypes['default'].string.isRequired,
    firstRowContent: _propTypes['default'].oneOfType([
      _propTypes['default'].arrayOf(_propTypes['default'].node),
      _propTypes['default'].node,
    ]),
  };
  TableSection.defaultProps = {
    children: null,
    plain: false,
  };
});
