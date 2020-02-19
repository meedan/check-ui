'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.KeepIcon = void 0;

var _react = _interopRequireDefault(require('react'));

var _SvgIcon = _interopRequireDefault(require('@material-ui/core/SvgIcon'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var KeepIcon = function KeepIcon(props) {
  return _react['default'].createElement(
    _SvgIcon['default'],
    props,
    _react['default'].createElement('path', {
      d:
        'M9.5818 13.3413h-.0391v5.5216H5V5h4.523v5.1105h.0392L13.263 5h5.4826l-5.2084 6.344L19 18.863h-5.7175z',
    })
  );
};

exports.KeepIcon = KeepIcon;
