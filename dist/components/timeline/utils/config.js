(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports);
    global.config = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (_exports) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = void 0;
  var _default = {
    TIMELINE_OFFSET: 224,
  };
  _exports['default'] = _default;
});
