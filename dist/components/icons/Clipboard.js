(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'react', '@material-ui/core/SvgIcon'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('react'), require('@material-ui/core/SvgIcon'));
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.react, global.SvgIcon);
    global.Clipboard = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _react,
  _SvgIcon
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = void 0;
  _react = _interopRequireDefault(_react);
  _SvgIcon = _interopRequireDefault(_SvgIcon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var ClipboardIcon = function ClipboardIcon(props) {
    return /*#__PURE__*/ _react['default'].createElement(
      _SvgIcon['default'],
      props,
      /*#__PURE__*/ _react['default'].createElement('path', {
        d:
          'M14.8636 5H7.2273c-.7032 0-1.2728.5695-1.2728 1.2727v8.9091h1.2728v-8.909h7.6363V5zm1.9091 2.5455h-7c-.7032 0-1.2727.5695-1.2727 1.2727v8.909C8.5 18.4306 9.0695 19 9.7727 19h7c.7032 0 1.2728-.5695 1.2728-1.2727V8.8182c0-.7032-.5696-1.2727-1.2728-1.2727zm0 10.1818h-7V8.8182h7v8.909z',
      })
    );
  };

  var _default = ClipboardIcon;
  _exports['default'] = _default;
});
