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
    global.Check = mod.exports;
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

  var CheckIcon = function CheckIcon(props) {
    return /*#__PURE__*/ _react['default'].createElement(
      _SvgIcon['default'],
      props,
      /*#__PURE__*/ _react['default'].createElement('path', {
        d:
          'M4.026 12c0-1.364.24-2.599.723-3.706a8.515 8.515 0 0 1 1.975-2.84 8.729 8.729 0 0 1 2.951-1.816A10.23 10.23 0 0 1 13.301 3c1.317 0 2.562.213 3.734.638 1.172.425 2.152.998 2.94 1.72l-3.518 4.236a3.103 3.103 0 0 0-1.205-.951 3.894 3.894 0 0 0-1.614-.325c-.482 0-.931.084-1.349.253a3.175 3.175 0 0 0-1.096.734c-.313.32-.558.71-.735 1.167A4.21 4.21 0 0 0 10.193 12c0 .562.093 1.063.277 1.504.185.441.434.822.747 1.143.313.32.679.566 1.096.734.418.168.86.253 1.325.253.659 0 1.225-.137 1.699-.41.473-.272.847-.593 1.12-.962l3.517 4.211c-.77.77-1.718 1.384-2.843 1.841-1.124.457-2.4.686-3.83.686a10.06 10.06 0 0 1-3.626-.65 8.786 8.786 0 0 1-2.95-1.84 8.68 8.68 0 0 1-1.976-2.84c-.482-1.1-.723-2.322-.723-3.67z',
      })
    );
  };

  var _default = CheckIcon;
  _exports['default'] = _default;
});
