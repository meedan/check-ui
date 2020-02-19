'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = TableSection;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireDefault(require('react'));

var _Grid = _interopRequireDefault(require('@material-ui/core/Grid'));

var _TableBody = _interopRequireDefault(require('@material-ui/core/TableBody'));

var _Typography = _interopRequireDefault(
  require('@material-ui/core/Typography')
);

var _makeStyles = _interopRequireDefault(
  require('@material-ui/core/styles/makeStyles')
);

var _TableBlock = _interopRequireDefault(require('./TableBlock'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var useStyles = (0, _makeStyles['default'])({
  root: {
    width: '100%',
    position: 'relative',
    zIndex: '20',
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
  return _react['default'].createElement(
    _TableBody['default'],
    {
      className: classes.root,
      onMouseLeave: props.onMouseLeave,
    },
    _react['default'].createElement(_TableBlock['default'], {
      plain: props.plain,
      section: true,
      leftColContent: _react['default'].createElement(
        _Grid['default'],
        {
          alignItems: 'center',
          className: classes.grid,
          container: true,
          justify: 'space-between',
        },
        _react['default'].createElement(
          _Grid['default'],
          {
            item: true,
          },
          _react['default'].createElement(
            _Typography['default'],
            {
              variant: 'subtitle2',
            },
            title
          )
        ),
        _react['default'].createElement(
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
