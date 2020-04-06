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
    define(['exports', 'prop-types', 'react', '@material-ui/core/styles/makeStyles', './Instance'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/styles/makeStyles'),
      require('./Instance')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.propTypes, global.react, global.makeStyles, global.Instance);
    global.Slider = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _makeStyles,
  _Instance
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Slider;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _Instance = _interopRequireDefault(_Instance);

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

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    return {
      sliderRoot: {
        height: '28px',
        position: 'relative',
        userSelect: 'none',
        width: '100%',
      },
    };
  });

  function Slider(_ref) {
    var duration = _ref.duration,
      _ref$instances = _ref.instances,
      instances = _ref$instances === void 0 ? [] : _ref$instances,
      props = _objectWithoutProperties(_ref, ['duration', 'instances']);

    var classes = useStyles();
    var sliderRoot = (0, _react.useRef)();

    var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      draggedInstance = _useState2[0],
      setDraggedInstance = _useState2[1];

    var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      rootRect = _useState4[0],
      setRootRect = _useState4[1]; //

    var getRootRect = function getRootRect() {
      setRootRect(sliderRoot.current.getBoundingClientRect());
    }; // get rootRect on component mount

    (0, _react.useEffect)(
      function () {
        getRootRect();
      },
      [sliderRoot]
    ); // recalc rootRect on window resize

    (0, _react.useEffect)(function () {
      window.addEventListener('resize', getRootRect);
      return function () {
        return window.removeEventListener('resize', getRootRect);
      };
    }); // pass rootRect up to Entities where it’s needed to calc new instance default width

    (0, _react.useEffect)(
      function () {
        if (props.returnSliderRect) props.returnSliderRect(rootRect);
      },
      [rootRect]
    );

    var renderInstances = function renderInstances() {
      if (!rootRect) return null;
      return instances.map(function (_ref2) {
        var end_seconds = _ref2.end_seconds,
          id = _ref2.id,
          isLocal = _ref2.isLocal,
          start_seconds = _ref2.start_seconds,
          instance = _objectWithoutProperties(_ref2, ['end_seconds', 'id', 'isLocal', 'start_seconds']);

        return /*#__PURE__*/ _react['default'].createElement(_Instance['default'], {
          duration: duration,
          end: end_seconds,
          instance: instance,
          instances: instances,
          isLocal: isLocal,
          isLocked: draggedInstance && draggedInstance !== id,
          key: id,
          lockSiblings: function lockSiblings() {
            return setDraggedInstance(id);
          },
          onHandleMove: props.onDrag,
          onHandlePress: props.onDragStart,
          onHandleRelease: props.onDragEnd,
          onInstanceClip: props.onInstanceClip
            ? function () {
                return props.onInstanceClip(id);
              }
            : null,
          onInstanceDelete: function onInstanceDelete() {
            return props.onInstanceDelete(id);
          },
          onInstanceUpdate: function onInstanceUpdate(payload) {
            return props.onInstanceUpdate(id, payload);
          },
          sliderRect: rootRect,
          start: start_seconds,
        });
      });
    };

    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: classes.sliderRoot,
        ref: sliderRoot,
      },
      renderInstances()
    );
  }

  Slider.propTypes = {
    duration: _propTypes['default'].number.isRequired,
    instances: _propTypes['default'].array,
    onDrag: _propTypes['default'].func.isRequired,
    onDragEnd: _propTypes['default'].func.isRequired,
    onDragStart: _propTypes['default'].func.isRequired,
    onInstanceClip: _propTypes['default'].func,
    onInstanceDelete: _propTypes['default'].func.isRequired,
    onInstanceUpdate: _propTypes['default'].func.isRequired,
    returnSliderRect: _propTypes['default'].func,
  };
});
