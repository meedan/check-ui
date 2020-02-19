'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _Timeline = require('./timeline/Timeline');

Object.keys(_Timeline).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Timeline[key];
    },
  });
});

var _Player = require('./player/Player');

Object.keys(_Player).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Player[key];
    },
  });
});

var _Map = require('./map/Map');

Object.keys(_Map).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Map[key];
    },
  });
});
