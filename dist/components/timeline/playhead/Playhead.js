function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'prop-types',
      'react',
      '@material-ui/core/Tooltip',
      '@material-ui/core/styles/makeStyles',
      '../utils/formatSeconds',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/styles/makeStyles'),
      require('../utils/formatSeconds')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.propTypes, global.react, global.Tooltip, global.makeStyles, global.formatSeconds);
    global.Playhead = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _Tooltip,
  _makeStyles,
  _formatSeconds
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Playhead;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _formatSeconds = _interopRequireDefault(_formatSeconds);

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== 'function') return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
      return cache;
    };
    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || (_typeof(obj) !== 'object' && typeof obj !== 'function')) {
      return { default: obj };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj['default'] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  function _slicedToArray(arr, i) {
    return (
      _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
    );
  }

  function _nonIterableRest() {
    throw new TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(n);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return'] != null) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    var _playheadHandle;

    return {
      playheadRoot: {
        minHeight: '28px',
        overflowX: 'visible',
        position: 'relative',
        userSelect: 'none',
        zIndex: 500,
      },
      playheadHandle:
        ((_playheadHandle = {
          background: 'rgba(0,0,0,0.04)',
          cursor: '-webkit-grab',
        }),
        _defineProperty(_playheadHandle, 'cursor', 'col-resize'),
        _defineProperty(_playheadHandle, 'cursor', 'grab'),
        _defineProperty(_playheadHandle, 'height', '100%'),
        _defineProperty(_playheadHandle, 'pointerEvents', 'all'),
        _defineProperty(_playheadHandle, 'position', 'absolute'),
        _defineProperty(_playheadHandle, 'touchAction', 'pan-x'),
        _defineProperty(_playheadHandle, 'transform', 'translateX(-50%)'),
        _defineProperty(_playheadHandle, 'width', '14px'),
        _defineProperty(_playheadHandle, '&:before', {
          backgroundColor: theme.palette.primary.main,
          borderRadius: '4px',
          content: '" "',
          display: 'block',
          height: '9px',
          left: '50%',
          position: 'absolute',
          top: '0',
          transform: 'translate(-55%, -50%)',
          width: '9px',
        }),
        _defineProperty(_playheadHandle, '&:after', {
          borderColor: theme.palette.primary.main,
          borderStyle: 'solid',
          borderWidth: '0 0 0 1px',
          content: '" "',
          display: 'block',
          height: '100%',
          left: '50%',
          position: 'absolute',
          top: '0',
          transform: 'translateX(-50%)',
          width: '1px',
        }),
        _playheadHandle),
    };
  });

  function Playhead(props) {
    var classes = useStyles();
    var playheadRoot = (0, _react.useRef)();
    var currentTime = props.currentTime,
      duration = props.duration;

    var _React$useState = _react['default'].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dragging = _React$useState2[0],
      setDragging = _React$useState2[1];

    var _React$useState3 = _react['default'].useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      rootRect = _React$useState4[0],
      setRootRect = _React$useState4[1];

    var onHandlePress = function onHandlePress(e) {
      if (!e) return null;
      if (e.pageX <= rootRect.left - 100 || e.pageX >= rootRect.left + rootRect.width + 100) return null;
      var v = ((e.pageX - rootRect.left) * duration) / rootRect.width;
      setDragging(true);
      props.onChange(v < 0 ? 0 : v > duration ? duration : v);
    };

    var onHandleMove = function onHandleMove(e) {
      if (!e || !dragging) return null;
      if (e.pageX <= 0) return null;
      var v = ((e.pageX - rootRect.left) * duration) / rootRect.width;
      props.onChange(v < 0 ? 0 : v > duration ? duration : v);
    };

    var onHandleRelease = function onHandleRelease() {
      setDragging(false);
    };

    var getRootRect = function getRootRect() {
      setRootRect(playheadRoot.current.getBoundingClientRect());
    };

    (0, _react.useEffect)(
      function () {
        window.addEventListener('mousemove', onHandleMove);
        return function () {
          return window.removeEventListener('mousemove', onHandleMove);
        };
      },
      [onHandleMove]
    );
    (0, _react.useEffect)(
      function () {
        window.addEventListener('mouseup', onHandleRelease);
        return function () {
          return window.removeEventListener('mouseup', onHandleRelease);
        };
      },
      [onHandleRelease]
    );
    (0, _react.useEffect)(
      function () {
        getRootRect();
      },
      [playheadRoot]
    );
    (0, _react.useEffect)(
      function () {
        if (props && props.setSkip) props.setSkip(dragging);
      },
      [dragging]
    ); // recalc rootRect on window resize

    (0, _react.useEffect)(function () {
      window.addEventListener('resize', getRootRect);
      return function () {
        return window.removeEventListener('resize', getRootRect);
      };
    });
    var pos = rootRect ? (currentTime * rootRect.width) / duration : 0;
    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: ''.concat(props.className, ' ').concat(classes.playheadRoot),
        onMouseDown: onHandlePress,
        ref: playheadRoot,
      },
      /*#__PURE__*/ _react['default'].createElement(
        _Tooltip['default'],
        {
          open: dragging,
          title: (0, _formatSeconds['default'])(currentTime),
          placement: 'top',
        },
        /*#__PURE__*/ _react['default'].createElement('div', {
          className: classes.playheadHandle,
          onMouseDown: onHandlePress,
          onMouseUp: onHandleRelease,
          style: {
            left: ''.concat(pos, 'px'),
          },
        })
      )
    );
  }

  Playhead.propTypes = {
    currentTime: _propTypes['default'].number.isRequired,
    duration: _propTypes['default'].number.isRequired,
    onChange: _propTypes['default'].func.isRequired,
  };
});
