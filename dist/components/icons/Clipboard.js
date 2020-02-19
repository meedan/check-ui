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

var ClipboardIcon = function ClipboardIcon(props) {
  return _react['default'].createElement(
    _SvgIcon['default'],
    props,
    _react['default'].createElement('path', {
      d:
        'M14.8636 5H7.2273c-.7032 0-1.2728.5695-1.2728 1.2727v8.9091h1.2728v-8.909h7.6363V5zm1.9091 2.5455h-7c-.7032 0-1.2727.5695-1.2727 1.2727v8.909C8.5 18.4306 9.0695 19 9.7727 19h7c.7032 0 1.2728-.5695 1.2728-1.2727V8.8182c0-.7032-.5696-1.2727-1.2728-1.2727zm0 10.1818h-7V8.8182h7v8.909z',
    })
  );
};

var _default = ClipboardIcon;
exports['default'] = _default;
