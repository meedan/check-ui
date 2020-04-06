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
    global.Cut = mod.exports;
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

  var ContentCut = function ContentCut(props) {
    return /*#__PURE__*/ _react['default'].createElement(
      _SvgIcon['default'],
      props,
      /*#__PURE__*/ _react['default'].createElement('path', {
        d:
          'M17.587 4.8h2.4v.787L14.4 11.212 12.787 9.6l4.8-4.8zM12 12.412a.416.416 0 0 0 .412-.412.416.416 0 0 0-.412-.412.416.416 0 0 0-.413.412c0 .225.188.412.413.412zm-4.8 6c.862 0 1.612-.712 1.612-1.612 0-.9-.75-1.612-1.612-1.612-.863 0-1.613.712-1.613 1.612 0 .9.75 1.613 1.613 1.613zm0-9.6c.862 0 1.612-.712 1.612-1.612 0-.9-.75-1.612-1.612-1.612-.863 0-1.613.712-1.613 1.612 0 .9.75 1.613 1.613 1.613zm2.925-.3l9.862 9.9v.788h-2.4L12 13.613l-1.875 1.875c.187.412.262.825.262 1.312A3.185 3.185 0 0 1 7.2 19.988 3.185 3.185 0 0 1 4.012 16.8 3.185 3.185 0 0 1 7.2 13.613c.487 0 .9.075 1.312.262L10.387 12l-1.875-1.875c-.412.188-.825.263-1.312.263A3.185 3.185 0 0 1 4.012 7.2 3.185 3.185 0 0 1 7.2 4.013 3.185 3.185 0 0 1 10.387 7.2c0 .488-.075.9-.262 1.313z',
      })
    );
  };

  var _default = ContentCut;
  _exports['default'] = _default;
});
