'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = Playhead;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireWildcard(require('react'));

var _Tooltip = _interopRequireDefault(require('@material-ui/core/Tooltip'));

var _makeStyles = _interopRequireDefault(
  require('@material-ui/core/styles/makeStyles')
);

var _formatSeconds = _interopRequireDefault(require('../utils/formatSeconds'));

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
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
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
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
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
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var useStyles = (0, _makeStyles['default'])(function(theme) {
  var _playheadHandle;

  return {
    playheadRoot: {
      minHeight: '28px',
      overflowX: 'visible',
      position: 'relative',
      userSelect: 'none',
    },
    playheadHandle:
      ((_playheadHandle = {
        cursor: '-webkit-grab',
      }),
      _defineProperty(_playheadHandle, 'cursor', 'col-resize'),
      _defineProperty(_playheadHandle, 'cursor', 'grab'),
      _defineProperty(_playheadHandle, 'height', '100%'),
      _defineProperty(_playheadHandle, 'pointerEvents', 'all'),
      _defineProperty(_playheadHandle, 'position', 'absolute'),
      _defineProperty(_playheadHandle, 'touchAction', 'pan-x'),
      _defineProperty(_playheadHandle, 'transform', 'translateX(-50%)'),
      _defineProperty(_playheadHandle, 'width', '28px'),
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

  var _React$useState5 = _react['default'].useState(currentTime),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    time = _React$useState6[0],
    setTime = _React$useState6[1];

  var onHandlePress = function onHandlePress(e) {
    if (!e) return null;
    if (e.pageX <= 0) return null;
    var v = ((e.pageX - rootRect.left) * duration) / rootRect.width;
    setDragging(true);
    setTime(v < 0 ? 0 : v > duration ? duration : v);
    props.onChange(v);
  };

  var onHandleMove = function onHandleMove(e) {
    if (!e || !dragging) return null;
    if (e.pageX <= 0) return null;
    var v = ((e.pageX - rootRect.left) * duration) / rootRect.width;
    setTime(v < 0 ? 0 : v > duration ? duration : v);
    props.onChange(v);
  };

  var onHandleRelease = function onHandleRelease(e) {
    setDragging(false);
  };

  (0, _react.useEffect)(
    function() {
      window.addEventListener('mousemove', onHandleMove);
      return function() {
        return window.removeEventListener('mousemove', onHandleMove);
      };
    },
    [onHandleMove]
  );
  (0, _react.useEffect)(
    function() {
      window.addEventListener('mouseup', onHandleRelease);
      return function() {
        return window.removeEventListener('mouseup', onHandleRelease);
      };
    },
    [onHandleRelease]
  );
  (0, _react.useEffect)(
    function() {
      setRootRect(playheadRoot.current.getBoundingClientRect());
    },
    [playheadRoot]
  );
  (0, _react.useEffect)(
    function() {
      if (props && props.setSkip) props.setSkip(dragging);
    },
    [dragging]
  );
  var val = dragging ? time : currentTime;
  var pos = rootRect ? (time * rootRect.width) / duration : 0;
  return _react['default'].createElement(
    'div',
    {
      className: ''.concat(props.className, ' ').concat(classes.playheadRoot),
      onMouseDown: onHandlePress,
      ref: playheadRoot,
    },
    _react['default'].createElement(
      _Tooltip['default'],
      {
        open: dragging,
        title: (0, _formatSeconds['default'])(val),
        placement: 'top',
      },
      _react['default'].createElement('div', {
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
  currentTime: _propTypes['default'].number,
  duration: _propTypes['default'].number.isRequired,
  onChange: _propTypes['default'].func.isRequired,
};
Playhead.defaultProps = {
  currentTime: 0,
};
