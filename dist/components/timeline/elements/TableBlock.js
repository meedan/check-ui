'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = TableBlock;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireDefault(require('react'));

var _TableCell = _interopRequireDefault(require('@material-ui/core/TableCell'));

var _TableRow = _interopRequireDefault(require('@material-ui/core/TableRow'));

var _makeStyles = _interopRequireDefault(
  require('@material-ui/core/styles/makeStyles')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var useStyles = (0, _makeStyles['default'])({
  leftCol: {
    width: '224px',
    paddingLeft: 0,
    paddingRight: 0,
  },
  plain: {
    border: 'none',
  },
});

function TableBlock(props) {
  var classes = useStyles();
  var leftColContent = props.leftColContent,
    rightColContent = props.rightColContent;
  return _react['default'].createElement(
    _TableRow['default'],
    null,
    _react['default'].createElement(
      _TableCell['default'],
      {
        className: ''
          .concat(classes.leftCol, ' ')
          .concat(props.plain ? classes.plain : null),
        padding: !props.section ? 'none' : 'default',
      },
      leftColContent
    ),
    _react['default'].createElement(
      _TableCell['default'],
      {
        className: ''
          .concat(classes.rightCol, ' ')
          .concat(props.plain ? classes.plain : null),
        padding: !props.section ? 'none' : 'default',
      },
      rightColContent
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
