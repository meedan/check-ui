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
    global.Keep = mod.exports;
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
  _exports.KeepIcon = void 0;
  _react = _interopRequireDefault(_react);
  _SvgIcon = _interopRequireDefault(_SvgIcon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var KeepIcon = function KeepIcon(props) {
    return /*#__PURE__*/ _react['default'].createElement(
      _SvgIcon['default'],
      props,
      /*#__PURE__*/ _react['default'].createElement('path', {
        d: 'M9.5818 13.3413h-.0391v5.5216H5V5h4.523v5.1105h.0392L13.263 5h5.4826l-5.2084 6.344L19 18.863h-5.7175z',
      })
    );
  };

  _exports.KeepIcon = KeepIcon;
});
