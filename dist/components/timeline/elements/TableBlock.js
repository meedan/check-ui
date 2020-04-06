(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'prop-types', 'react', '@material-ui/core/styles/makeStyles', '../utils/config'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/styles/makeStyles'),
      require('../utils/config')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.propTypes, global.react, global.makeStyles, global.config);
    global.TableBlock = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _makeStyles,
  _config
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = TableBlock;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _config = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    return {
      row: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        width: '100%',
      },
      leftCol: {
        borderBottom: '1px solid '.concat(theme.palette.divider),
        display: 'flex',
        flex: '0 0 '.concat(_config['default'].TIMELINE_OFFSET, 'px'),
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '48px',
        paddingLeft: 0,
        paddingRight: 0,
      },
      rightCol: {
        borderBottom: '1px solid '.concat(theme.palette.divider),
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '48px',
        paddingLeft: 0,
        paddingRight: 0,
      },
      plain: {
        border: 'none',
      },
    };
  });

  function TableBlock(props) {
    var classes = useStyles();
    var leftColContent = props.leftColContent,
      plain = props.plain,
      rightColContent = props.rightColContent;
    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: classes.row,
      },
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: classes.leftCol,
          style: plain
            ? {
                border: 'none',
              }
            : null,
        },
        /*#__PURE__*/ _react['default'].createElement('div', null, leftColContent)
      ),
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: classes.rightCol,
          style: plain
            ? {
                border: 'none',
              }
            : null,
        },
        /*#__PURE__*/ _react['default'].createElement('div', null, rightColContent)
      )
    );
  }

  TableBlock.propTypes = {
    leftColContent: _propTypes['default'].oneOfType([
      _propTypes['default'].arrayOf(_propTypes['default'].node),
      _propTypes['default'].node,
    ]).isRequired,
    plain: _propTypes['default'].bool,
    section: _propTypes['default'].bool,
    rightColContent: _propTypes['default'].oneOfType([
      _propTypes['default'].arrayOf(_propTypes['default'].node),
      _propTypes['default'].node,
    ]),
  };
  TableBlock.defaultProps = {
    plain: false,
    rightColContent: null,
    section: false,
  };
});
