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
exports['default'] = Instance;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireWildcard(require('react'));

var _lodash = _interopRequireDefault(require('lodash'));

var _hooks = require('material-ui-popup-state/hooks');

var _Tooltip = _interopRequireDefault(require('@material-ui/core/Tooltip'));

var _makeStyles = _interopRequireDefault(
  require('@material-ui/core/styles/makeStyles')
);

var _HandlePopover = _interopRequireDefault(require('./HandlePopover'));

var _InstancePopover = _interopRequireDefault(require('./InstancePopover'));

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

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
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

var useStyles = function useStyles() {
  return (0, _makeStyles['default'])(function(theme) {
    return {
      instance: {
        backfaceVisibility: 'visible',
        background: 'rgba(71, 123, 181, 0.4)',
        bottom: '0',
        position: 'absolute',
        top: '0',
        '&:hover': {
          zIndex: '3000',
        },
      },
      handle: {
        background: 'rgba(71, 123, 181, 1)',
        bottom: '0',
        cursor: 'ew-resize',
        position: 'absolute',
        top: '0',
        transition: 'transform 250ms, opacity 250ms, width 250ms',
        zIndex: '2000',
        '&:hover': {
          opacity: '1 !important',
        },
      },
      handleThumb: {
        height: '28px',
        transform: 'translateX(-12px)',
        width: '24px',
      },
    };
  });
};

function Instance(props) {
  var classes = useStyles()();
  var isLocked = props.isLocked,
    duration = props.duration,
    instances = props.instances;
  var _props$sliderRect = props.sliderRect,
    left = _props$sliderRect.left,
    width = _props$sliderRect.width;

  var _useState = (0, _react.useState)(props.end),
    _useState2 = _slicedToArray(_useState, 2),
    end = _useState2[0],
    setEnd = _useState2[1];

  var _useState3 = (0, _react.useState)(props.start),
    _useState4 = _slicedToArray(_useState3, 2),
    start = _useState4[0],
    setStart = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    draggingHandle = _useState6[0],
    setDraggingHandle = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    hoveringHandle = _useState8[0],
    setHoveringHandle = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    hoveringInstance = _useState10[0],
    setHoveringInstance = _useState10[1];

  var instancePopupState = (0, _hooks.usePopupState)({
    variant: 'popover',
    popupId: 'instancePopover',
  });
  var handlePopupState = {
    start: (0, _hooks.usePopupState)({
      variant: 'popover',
      popupId: 'startHandlePopover',
    }),
    end: (0, _hooks.usePopupState)({
      variant: 'popover',
      popupId: 'endHandlePopover',
    }),
  }; // Define boundaries for how far the instance can be moved right/left

  var prevInstance = _lodash['default'].maxBy(
    _lodash['default'].filter(instances, function(i) {
      return i.end_seconds <= start;
    }),
    function(i) {
      return i.end_seconds;
    }
  );

  var nextInstance = _lodash['default'].minBy(
    _lodash['default'].filter(instances, function(i) {
      return i.start_seconds >= end;
    }),
    function(i) {
      return i.start_seconds;
    }
  );

  var MIN_LENGTH = (8 * duration) / width;
  var RANGE_MAX = nextInstance ? nextInstance.start_seconds : duration;
  var RANGE_MIN = prevInstance ? prevInstance.end_seconds : 0;
  var UNIT = duration / width;

  var onInstanceEnter = function onInstanceEnter() {
    setHoveringInstance(true);
  };

  var onInstanceLeave = function onInstanceLeave() {
    setHoveringHandle(null);
    setHoveringInstance(false);
  };

  var onHandleEnter = function onHandleEnter(edge) {
    setHoveringHandle(edge);
  };

  var onHandlePress = function onHandlePress(e, edge) {
    if (!e || !edge) return null; // e.persist();

    setDraggingHandle(edge);
    props.lockSiblings();
    props.onHandlePress(edge === 'start' ? start : end);
  };

  var onHandleMove = function onHandleMove(e) {
    if (!draggingHandle) return null;
    if (e.pageX <= -100 || e.pageX >= left + width + 100) return null;
    var v = ((e.pageX - left) * duration) / width;

    if (draggingHandle === 'start') {
      // 1 check if start doesnt go over (end - MIN_LENGTH)
      // 2 check if start doesnt go over RANGE_MIN
      setStart(function(prevState) {
        return v < end - MIN_LENGTH && v >= RANGE_MIN ? v : prevState;
      });
    } else if (draggingHandle === 'end') {
      // 1 check if end doesnt go over (start + MIN_LENGTH)
      // 2 check if end doesnt go over RANGE_MAX
      setEnd(function(prevState) {
        return v > start + MIN_LENGTH && v <= RANGE_MAX ? v : prevState;
      });
    }

    props.onHandleMove(draggingHandle === 'start' ? start : end);
  };

  var onHandleRelease = function onHandleRelease(e) {
    // props.updateInstance({
    //   end_seconds: end,
    //   start_seconds: start,
    // });
    if (!draggingHandle) return null;
    props.onHandleRelease(draggingHandle === 'start' ? start : end);
    setDraggingHandle(null);
    props.lockSiblings(null);
  };

  var onHandleLeave = function onHandleLeave() {
    if (draggingHandle) return null;
    setHoveringHandle(null); // setHoveringInstance(prevState => (prevState ? prevState : null));
  };

  var onHandleAdjust = function onHandleAdjust(edge, dir) {
    // TODO: clean the rest of this up
    var val = function val(prevState) {
      if (dir === 'fwd') {
        return prevState + UNIT < RANGE_MAX ? prevState + UNIT : RANGE_MAX;
      } else if (dir === 'bwd') {
        return prevState - UNIT > RANGE_MIN ? prevState - UNIT : RANGE_MIN;
      }
    };

    if (dir === 'fwd') {
      edge === 'end'
        ? setEnd(function(prevState) {
            return val(prevState);
          })
        : setStart(function(prevState) {
            return val(prevState);
          });
    } else if (dir === 'bwd') {
      edge === 'end'
        ? setEnd(function(prevState) {
            return val(prevState);
          })
        : setStart(function(prevState) {
            return val(prevState);
          });
    }

    props.updateInstance({
      start_seconds: start,
      end_seconds: end,
    });
  };

  var x1 = (start * width) / duration;
  var x2 = (end * width) / duration;
  var instanceLength = end - start;
  var instanceWidth = (instanceLength * width) / duration;
  var handles = [
    {
      edge: 'end',
      value: end,
    },
    {
      edge: 'start',
      value: start,
    },
  ];
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
      setStart(props.start);
    },
    [props.start]
  );
  (0, _react.useEffect)(
    function() {
      setEnd(props.end);
    },
    [props.end]
  );
  return _react['default'].createElement(
    _react['default'].Fragment,
    null,
    _react['default'].createElement(
      'div',
      {
        className: classes.instance,
        style: {
          left: ''.concat(x1, 'px'),
          width: ''.concat(instanceWidth, 'px'),
          zIndex: hoveringInstance ? '1000' : 'default',
        },
        onMouseEnter: !isLocked ? onInstanceEnter : null,
        onMouseLeave: !isLocked ? onInstanceLeave : null,
      },
      !isLocked
        ? _react['default'].createElement(
            'div',
            _extends({}, (0, _hooks.bindHover)(instancePopupState), {
              style: {
                width: '100%',
                height: '28px',
              },
            })
          )
        : null
    ),
    !draggingHandle
      ? _react['default'].createElement(_InstancePopover['default'], {
          clipInstance: props.clipInstance,
          deleteInstance: props.deleteInstance,
          instance: props.instance,
          popupState: instancePopupState,
        })
      : null,
    handles.map(function(handle) {
      var edge = handle.edge,
        value = handle.value;
      var isDragged = draggingHandle === edge;
      var isHovered = hoveringHandle === edge;
      var isActive = isDragged || isHovered;
      return _react['default'].createElement(
        _react.Fragment,
        {
          key: ''.concat(edge, 'Popover'),
        },
        _react['default'].createElement(
          'div',
          {
            className: classes.handle,
            onMouseDown: function onMouseDown(e) {
              return onHandlePress(e, edge);
            },
            onMouseEnter: function onMouseEnter() {
              return onHandleEnter(edge);
            },
            onMouseLeave: onHandleLeave,
            style: {
              left:
                edge === 'start' ? ''.concat(x1, 'px') : ''.concat(x2, 'px'),
              opacity: isActive || handlePopupState[edge].isOpen ? '1' : '0',
              transform: edge === 'end' ? 'translateX(-100%)' : 'none',
              width: draggingHandle ? '1px' : '3px',
            },
          },
          _react['default'].createElement(
            _Tooltip['default'],
            {
              open: isDragged,
              placement: 'top',
              title: (0, _formatSeconds['default'])(value),
            },
            _react['default'].createElement(
              'div',
              _extends(
                {
                  className: classes.handleThumb,
                },
                (0, _hooks.bindHover)(handlePopupState[edge])
              )
            )
          )
        ),
        !draggingHandle
          ? _react['default'].createElement(_HandlePopover['default'], {
              id: ''.concat(edge, 'HandlePopover'),
              moveBackward: function moveBackward() {
                return onHandleAdjust(edge, 'bwd');
              },
              moveForward: function moveForward() {
                return onHandleAdjust(edge, 'fwd');
              },
              popupState: handlePopupState[edge],
            })
          : null
      );
    })
  );
}

Instance.propTypes = {
  clipInstance: _propTypes['default'].func,
  deleteInstance: _propTypes['default'].func.isRequired,
  duration: _propTypes['default'].number.isRequired,
  end: _propTypes['default'].number.isRequired,
  instance: _propTypes['default'].object.isRequired,
  instances: _propTypes['default'].array.isRequired,
  isLocked: _propTypes['default'].bool,
  lockSiblings: _propTypes['default'].func.isRequired,
  onHandleMove: _propTypes['default'].func.isRequired,
  onHandlePress: _propTypes['default'].func.isRequired,
  onHandleRelease: _propTypes['default'].func.isRequired,
  sliderRect: _propTypes['default'].object.isRequired,
  start: _propTypes['default'].number.isRequired,
  updateInstance: _propTypes['default'].func.isRequired,
};
Instance.defaultProps = {
  clipInstance: null,
  isLocked: null,
};
