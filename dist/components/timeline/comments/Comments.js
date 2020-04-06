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
      'rc-slider/assets/index.css',
      'prop-types',
      'react',
      'rc-slider',
      'lodash',
      '@material-ui/icons/Add',
      '@material-ui/core/IconButton',
      '@material-ui/core/Tooltip',
      '@material-ui/core/styles/makeStyles',
      './Marker',
      './NewMarker',
      '../elements/TableSection',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('rc-slider/assets/index.css'),
      require('prop-types'),
      require('react'),
      require('rc-slider'),
      require('lodash'),
      require('@material-ui/icons/Add'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/styles/makeStyles'),
      require('./Marker'),
      require('./NewMarker'),
      require('../elements/TableSection')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.index,
      global.propTypes,
      global.react,
      global.rcSlider,
      global.lodash,
      global.Add,
      global.IconButton,
      global.Tooltip,
      global.makeStyles,
      global.Marker,
      global.NewMarker,
      global.TableSection
    );
    global.Comments = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _index,
  _propTypes,
  _react,
  _rcSlider,
  _lodash,
  _Add,
  _IconButton,
  _Tooltip,
  _makeStyles,
  _Marker,
  _NewMarker,
  _TableSection
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Comments;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _rcSlider = _interopRequireDefault(_rcSlider);
  _lodash = _interopRequireDefault(_lodash);
  _Add = _interopRequireDefault(_Add);
  _IconButton = _interopRequireDefault(_IconButton);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _Marker = _interopRequireDefault(_Marker);
  _NewMarker = _interopRequireDefault(_NewMarker);
  _TableSection = _interopRequireDefault(_TableSection);

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
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

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    return {
      sliderRoot: {
        '& .rc-slider-mark-text': {
          height: '32px',
          width: '32px',
          transform: 'translateY(-27px) !important',
          zIndex: 600,
        },
        '& .rc-slider-disabled, & .rc-slider-disabled .rc-slider-rail': {
          background: 'transparent',
        },
        '& .rc-slider-disabled .rc-slider-mark-text': {
          cursor: 'pointer !important',
        },
        '& .rc-slider-dot': {
          visibility: 'hidden',
        },
      },
    };
  });

  function Comments(props) {
    var classes = useStyles();
    var duration = props.duration,
      currentTime = props.currentTime,
      threads = props.threads,
      user = props.user;

    var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      newTime = _useState2[0],
      setNewTime = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isCreating = _useState4[0],
      setCreatingState = _useState4[1];

    var onCommentThreadStart = function onCommentThreadStart() {
      setCreatingState(true);
    };

    var onCommentThreadStop = function onCommentThreadStop() {
      setCreatingState(false);
    };

    var onCommentThreadCreate = function onCommentThreadCreate(text, popupCallback) {
      var callback = function callback() {
        popupCallback();
        setCreatingState(false);
      };

      props.onCommentThreadCreate(newTime, text, callback);
    };

    var markers = _lodash['default'].reduce(
      threads,
      function (object, param) {
        return _objectSpread(
          {},
          object,
          _defineProperty(
            {},
            param.start_seconds,
            /*#__PURE__*/ _react['default'].createElement(
              _Marker['default'],
              _extends({}, props, {
                key: param.id,
                thread: param,
              })
            )
          )
        );
      },
      {}
    );

    var newThread = {
      id: Date.now() + Math.random(),
      replies: [],
      start_seconds: newTime,
      text: '',
      user: user,
    };

    var newMarker = /*#__PURE__*/ _react['default'].createElement(_NewMarker['default'], {
      key: newThread.id,
      onCommentThreadCreate: onCommentThreadCreate,
      onCommentThreadStop: onCommentThreadStop,
      thread: newThread,
    });

    (0, _react.useEffect)(
      function () {
        if (isCreating) return null;
        setNewTime(currentTime);
      },
      [currentTime]
    );
    return /*#__PURE__*/ _react['default'].createElement(_TableSection['default'], {
      title: 'Comments',
      actions: /*#__PURE__*/ _react['default'].createElement(
        _Tooltip['default'],
        {
          title: 'New comment',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _IconButton['default'],
          {
            onClick: onCommentThreadStart,
          },
          /*#__PURE__*/ _react['default'].createElement(_Add['default'], {
            fontSize: 'small',
          })
        )
      ),
      firstRowContent: /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: classes.sliderRoot,
        },
        /*#__PURE__*/ _react['default'].createElement(_rcSlider['default'], {
          defaultValue: null,
          disabled: true,
          included: false,
          marks: isCreating ? _objectSpread({}, markers, _defineProperty({}, newTime, newMarker)) : markers,
          max: duration,
          min: 0,
          value: null,
        })
      ),
    });
  }

  Comments.propTypes = {
    currentTime: _propTypes['default'].number,
    duration: _propTypes['default'].number.isRequired,
    onCommentCreate: _propTypes['default'].func.isRequired,
    onCommentDelete: _propTypes['default'].func.isRequired,
    onCommentEdit: _propTypes['default'].func.isRequired,
    onCommentThreadCreate: _propTypes['default'].func.isRequired,
    onCommentThreadDelete: _propTypes['default'].func.isRequired,
    threads: _propTypes['default'].array,
    user: _propTypes['default'].shape({
      first_name: _propTypes['default'].string.isRequired,
      id: _propTypes['default'].number.isRequired,
      last_name: _propTypes['default'].string.isRequired,
      profile_img_url: _propTypes['default'].string.isRequired,
    }).isRequired,
  };
  Comments.defaultProps = {
    currentTime: 0,
    threads: [],
  };
});
