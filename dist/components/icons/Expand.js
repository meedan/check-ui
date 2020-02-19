'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _SvgIcon = _interopRequireDefault(require('@material-ui/core/SvgIcon'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ExpandIcon = function ExpandIcon(props) {
  return _react['default'].createElement(
    _SvgIcon['default'],
    props,
    _react['default'].createElement('path', {
      d:
        'M12.478 11.043h2.87v-2.87L19.174 12l-3.826 3.826v-2.87H8.652v2.87L4.826 12l3.826-3.826v2.87h3.826zM1 19.653h1.913V4.347H1v15.304zm20.087 0H23V4.347h-1.913v15.304z',
    })
  );
};

var _default = ExpandIcon;
exports['default'] = _default;
