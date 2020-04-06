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
    global.Expand = mod.exports;
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

  var ExpandIcon = function ExpandIcon(props) {
    return /*#__PURE__*/ _react['default'].createElement(
      _SvgIcon['default'],
      props,
      /*#__PURE__*/ _react['default'].createElement('path', {
        d:
          'M12.478 11.043h2.87v-2.87L19.174 12l-3.826 3.826v-2.87H8.652v2.87L4.826 12l3.826-3.826v2.87h3.826zM1 19.653h1.913V4.347H1v15.304zm20.087 0H23V4.347h-1.913v15.304z',
      })
    );
  };

  var _default = ExpandIcon;
  _exports['default'] = _default;
});
