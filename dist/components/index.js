(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', './timeline/Timeline', './player/Player', './map/Map'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./timeline/Timeline'), require('./player/Player'), require('./map/Map'));
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.Timeline, global.Player, global.Map);
    global.index = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _Timeline,
  _Player,
  _Map
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  Object.keys(_Timeline).forEach(function (key) {
    if (key === 'default' || key === '__esModule') return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _Timeline[key];
      },
    });
  });
  Object.keys(_Player).forEach(function (key) {
    if (key === 'default' || key === '__esModule') return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _Player[key];
      },
    });
  });
  Object.keys(_Map).forEach(function (key) {
    if (key === 'default' || key === '__esModule') return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _Map[key];
      },
    });
  });
});
