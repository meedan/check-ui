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
exports['default'] = Slider;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireWildcard(require('react'));

var _makeStyles = _interopRequireDefault(
  require('@material-ui/core/styles/makeStyles')
);

var _Instance = _interopRequireDefault(require('./Instance'));

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

var useStyles = (0, _makeStyles['default'])(function(theme) {
  return {
    sliderRoot: {
      height: '28px',
      position: 'relative',
      userSelect: 'none',
      width: '100%',
    },
  };
});

function Slider(props) {
  var classes = useStyles();
  var sliderRoot = (0, _react.useRef)();
  var duration = props.duration,
    instances = props.instances;

  var _useState = (0, _react.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    draggedInstance = _useState2[0],
    setDraggedInstance = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    rootRect = _useState4[0],
    setRootRect = _useState4[1];

  (0, _react.useEffect)(
    function() {
      setRootRect(sliderRoot.current.getBoundingClientRect());
    },
    [sliderRoot]
  );
  return _react['default'].createElement(
    'div',
    {
      className: classes.sliderRoot,
      ref: sliderRoot,
    },
    rootRect
      ? instances.map(function(instance) {
          var id = instance.id,
            start_seconds = instance.start_seconds,
            end_seconds = instance.end_seconds;
          return _react['default'].createElement(_Instance['default'], {
            clipInstance: props.clipInstance,
            deleteInstance: function deleteInstance() {
              return props.deleteInstance(id);
            },
            updateInstance: function updateInstance(payload) {
              return props.updateInstance(id, payload);
            }, //
            duration: duration,
            end: end_seconds,
            instance: instance,
            instances: instances,
            isLocked: draggedInstance && draggedInstance !== id,
            key: id,
            lockSiblings: function lockSiblings() {
              return setDraggedInstance(id);
            },
            onHandleMove: props.onDrag,
            onHandlePress: props.onDragStart,
            onHandleRelease: props.onDragEnd,
            sliderRect: rootRect,
            start: start_seconds,
          });
        })
      : null
  );
}

Slider.propTypes = {
  clipInstance: _propTypes['default'].func,
  deleteInstance: _propTypes['default'].func.isRequired,
  duration: _propTypes['default'].number.isRequired,
  instances: _propTypes['default'].array,
  onDrag: _propTypes['default'].func.isRequired,
  onDragEnd: _propTypes['default'].func.isRequired,
  onDragStart: _propTypes['default'].func.isRequired,
  updateInstance: _propTypes['default'].func.isRequired,
};
Slider.defaultProps = {
  clipInstance: null,
  instances: [],
};
