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
      'lodash',
      'material-ui-popup-state/hooks',
      '@material-ui/core/Tooltip',
      '@material-ui/core/styles/makeStyles',
      './HandlePopover',
      './InstancePopover',
      '../utils/formatSeconds',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('lodash'),
      require('material-ui-popup-state/hooks'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/styles/makeStyles'),
      require('./HandlePopover'),
      require('./InstancePopover'),
      require('../utils/formatSeconds')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.react,
      global.lodash,
      global.hooks,
      global.Tooltip,
      global.makeStyles,
      global.HandlePopover,
      global.InstancePopover,
      global.formatSeconds
    );
    global.Instance = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _lodash,
  _hooks,
  _Tooltip,
  _makeStyles,
  _HandlePopover,
  _InstancePopover,
  _formatSeconds
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Instance;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _lodash = _interopRequireDefault(_lodash);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _HandlePopover = _interopRequireDefault(_HandlePopover);
  _InstancePopover = _interopRequireDefault(_InstancePopover);
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

  function _extends() {
    _extends =
      Object.assign ||
      function (target) {
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

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }

  var useStyles = function useStyles() {
    return (0, _makeStyles['default'])(function (theme) {
      return {
        instance: {
          backfaceVisibility: 'visible',
          background: 'rgba(71, 123, 181, 0.4)',
          bottom: '0',
          position: 'absolute',
          top: '0',
          zIndex: 500,
          '&:hover': {
            zIndex: '500',
          },
        },
        handle: {
          background: 'rgba(71, 123, 181, 1)',
          bottom: '0',
          cursor: 'ew-resize',
          position: 'absolute',
          top: '0',
          transition: 'transform 250ms, opacity 250ms, width 250ms',
          zIndex: '500',
          '&:hover': {
            opacity: '1 !important',
          },
        },
        handleThumb: {
          height: '28px',
          transform: 'translateX(-9px)',
          width: '18px',
        },
      };
    });
  };

  function Instance(_ref) {
    var duration = _ref.duration,
      instances = _ref.instances,
      isLocal = _ref.isLocal,
      isLocked = _ref.isLocked,
      props = _objectWithoutProperties(_ref, ['duration', 'instances', 'isLocal', 'isLocked']);

    var classes = useStyles()();
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
      _lodash['default'].filter(instances, function (i) {
        return i.end_seconds <= start;
      }),
      function (i) {
        return i.end_seconds;
      }
    );

    var nextInstance = _lodash['default'].minBy(
      _lodash['default'].filter(instances, function (i) {
        return i.start_seconds >= end;
      }),
      function (i) {
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
      if (e.pageX <= left - 100 || e.pageX >= left + width + 100) return null;
      var v = ((e.pageX - left) * duration) / width;

      if (draggingHandle === 'start') {
        // 1 check if start doesnt go over (end - MIN_LENGTH)
        // 2 check if start doesnt go over RANGE_MIN
        setStart(function (prevState) {
          return v < end - MIN_LENGTH && v >= RANGE_MIN ? v : prevState;
        });
      } else if (draggingHandle === 'end') {
        // 1 check if end doesnt go over (start + MIN_LENGTH)
        // 2 check if end doesnt go over RANGE_MAX
        setEnd(function (prevState) {
          return v > start + MIN_LENGTH && v <= RANGE_MAX ? v : prevState;
        });
      } // props.onHandleMove(draggingHandle === 'start' ? start : end);

      props.onInstanceUpdate({
        start_seconds: start,
        end_seconds: end,
      });
    };

    var onHandleRelease = function onHandleRelease(e) {
      // props.onInstanceUpdate({
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
      // TODO: it all works perfectly fine, but clean this up one day
      var val = function val(prevState) {
        if (dir === 'fwd') {
          return prevState + UNIT < RANGE_MAX ? prevState + UNIT : RANGE_MAX;
        } else if (dir === 'bwd') {
          return prevState - UNIT > RANGE_MIN ? prevState - UNIT : RANGE_MIN;
        }
      };

      if (dir === 'fwd') {
        edge === 'end'
          ? setEnd(function (prevState) {
              return val(prevState);
            })
          : setStart(function (prevState) {
              return val(prevState);
            });
      } else if (dir === 'bwd') {
        edge === 'end'
          ? setEnd(function (prevState) {
              return val(prevState);
            })
          : setStart(function (prevState) {
              return val(prevState);
            });
      }

      props.onInstanceUpdate({
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
        setStart(props.start);
      },
      [props.start]
    );
    (0, _react.useEffect)(
      function () {
        setEnd(props.end);
      },
      [props.end]
    );
    return /*#__PURE__*/ _react['default'].createElement(
      _react['default'].Fragment,
      null,
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: classes.instance,
          style: {
            left: ''.concat(x1, 'px'),
            width: ''.concat(instanceWidth, 'px'),
            zIndex: hoveringInstance ? '500' : 'default',
            opacity: isLocal ? '0.5' : '1',
          },
          onMouseEnter: !isLocked && !isLocal ? onInstanceEnter : null,
          onMouseLeave: !isLocked && !isLocal ? onInstanceLeave : null,
        },
        !isLocked && !isLocal
          ? /*#__PURE__*/ _react['default'].createElement(
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
        ? /*#__PURE__*/ _react['default'].createElement(_InstancePopover['default'], {
            instance: props.instance,
            onInstanceClip: props.onInstanceClip,
            onInstanceDelete: props.onInstanceDelete,
            popupState: instancePopupState,
          })
        : null,
      !isLocal
        ? handles.map(function (handle) {
            var edge = handle.edge,
              value = handle.value;
            var isDragged = draggingHandle === edge;
            var isHovered = hoveringHandle === edge;
            var isActive = isDragged || isHovered;
            return /*#__PURE__*/ _react['default'].createElement(
              _react.Fragment,
              {
                key: ''.concat(edge, 'Popover'),
              },
              /*#__PURE__*/ _react['default'].createElement(
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
                    left: edge === 'start' ? ''.concat(x1, 'px') : ''.concat(x2, 'px'),
                    opacity: isActive || handlePopupState[edge].isOpen ? '1' : '0',
                    transform: edge === 'end' ? 'translateX(-100%)' : 'none',
                    width: draggingHandle ? '1px' : '3px',
                  },
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _Tooltip['default'],
                  {
                    open: isDragged,
                    placement: 'top',
                    title: (0, _formatSeconds['default'])(value),
                  },
                  /*#__PURE__*/ _react['default'].createElement(
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
                ? /*#__PURE__*/ _react['default'].createElement(_HandlePopover['default'], {
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
        : null
    );
  }

  Instance.propTypes = {
    duration: _propTypes['default'].number.isRequired,
    end: _propTypes['default'].number.isRequired,
    instance: _propTypes['default'].object.isRequired,
    instances: _propTypes['default'].array.isRequired,
    isLocal: _propTypes['default'].bool,
    isLocked: _propTypes['default'].bool,
    lockSiblings: _propTypes['default'].func.isRequired,
    onHandleMove: _propTypes['default'].func.isRequired,
    onHandlePress: _propTypes['default'].func.isRequired,
    onHandleRelease: _propTypes['default'].func.isRequired,
    onInstanceClip: _propTypes['default'].func,
    onInstanceDelete: _propTypes['default'].func.isRequired,
    onInstanceUpdate: _propTypes['default'].func.isRequired,
    sliderRect: _propTypes['default'].object.isRequired,
    start: _propTypes['default'].number.isRequired,
  };
});
