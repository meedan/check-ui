'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = _default;

function _default(seconds) {
  var pad = function pad(num, size) {
    return '000'.concat(num).slice(size * -1);
  };

  var time = parseFloat(seconds).toFixed(3);
  var hours = Math.floor(time / 60 / 60);
  var minutes = Math.floor(time / 60) % 60;
  var seconds = Math.floor(time - minutes * 60);
  return ''
    .concat(pad(hours, 2), ':')
    .concat(pad(minutes, 2), ':')
    .concat(pad(seconds, 2));
}
