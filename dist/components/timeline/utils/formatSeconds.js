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
    global.formatSeconds = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (_exports) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = _default;

  function _default(seconds) {
    var pad = function pad(num, size) {
      return '000'.concat(num).slice(size * -1);
    };

    var time = parseFloat(seconds).toFixed(3);
    var hours = Math.floor(time / 60 / 60);
    var minutes = Math.floor(time / 60) % 60;
    var seconds = Math.floor(time - minutes * 60);
    return ''.concat(pad(hours, 2), ':').concat(pad(minutes, 2), ':').concat(pad(seconds, 2));
  }
});
