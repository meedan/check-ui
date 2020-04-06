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
      'lodash/orderBy',
      '@material-ui/lab/Autocomplete',
      '@material-ui/core/ClickAwayListener',
      '@material-ui/icons/Close',
      '@material-ui/core/IconButton',
      '@material-ui/core/InputAdornment',
      '@material-ui/core/TextField',
      '@material-ui/core/Tooltip',
      '@material-ui/core/Typography',
      '@material-ui/core/styles/makeStyles',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('lodash/orderBy'),
      require('@material-ui/lab/Autocomplete'),
      require('@material-ui/core/ClickAwayListener'),
      require('@material-ui/icons/Close'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/InputAdornment'),
      require('@material-ui/core/TextField'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/Typography'),
      require('@material-ui/core/styles/makeStyles')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.react,
      global.orderBy,
      global.Autocomplete,
      global.ClickAwayListener,
      global.Close,
      global.IconButton,
      global.InputAdornment,
      global.TextField,
      global.Tooltip,
      global.Typography,
      global.makeStyles
    );
    global.NameField = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _orderBy,
  _Autocomplete,
  _ClickAwayListener,
  _Close,
  _IconButton,
  _InputAdornment,
  _TextField,
  _Tooltip,
  _Typography,
  _makeStyles
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = NameField;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _orderBy = _interopRequireDefault(_orderBy);
  _Autocomplete = _interopRequireDefault(_Autocomplete);
  _ClickAwayListener = _interopRequireDefault(_ClickAwayListener);
  _Close = _interopRequireDefault(_Close);
  _IconButton = _interopRequireDefault(_IconButton);
  _InputAdornment = _interopRequireDefault(_InputAdornment);
  _TextField = _interopRequireDefault(_TextField);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _Typography = _interopRequireDefault(_Typography);
  _makeStyles = _interopRequireDefault(_makeStyles);

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

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    return {
      inputRoot: _objectSpread({}, theme.typography.body2, {
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
      }),
      adornmentIcon: {
        position: 'relative',
        top: ''.concat(theme.spacing(0.3) * -1, 'px'),
        left: ''.concat(theme.spacing(0.6) * -1, 'px'),
      },
    };
  });

  function NameField(_ref) {
    var entityName = _ref.entityName,
      entityType = _ref.entityType,
      _ref$suggestions = _ref.suggestions,
      suggestions = _ref$suggestions === void 0 ? [] : _ref$suggestions,
      props = _objectWithoutProperties(_ref, ['entityName', 'entityType', 'suggestions']);

    var classes = useStyles();

    var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      name = _useState2[0],
      setName = _useState2[1];

    var onBeforeSubmit = function onBeforeSubmit(e) {
      var newName = e ? e.target.value : name;

      if (newName !== entityName && newName.length > 0) {
        props.onSubmit(newName);
      } else {
        props.onCancel();
      }
    };

    (0, _react.useEffect)(function () {
      setName(entityName);
    }, []); // order and flatten suggestions’ array

    var options = (0, _orderBy['default'])(suggestions, [''.concat(entityType, 'instance_count')], ['desc']).map(
      function (o) {
        return o.name;
      }
    );
    return /*#__PURE__*/ _react['default'].createElement(
      _ClickAwayListener['default'],
      {
        onClickAway: function onClickAway() {
          return onBeforeSubmit();
        },
      },
      /*#__PURE__*/ _react['default'].createElement(_Autocomplete['default'], {
        autoComplete: true,
        blurOnSelect: true,
        freeSolo: true,
        id: ''.concat(entityType, '-suggestions'),
        onChange: function onChange(e, str) {
          return props.onSubmit(str);
        },
        options: options,
        renderInput: function renderInput(params) {
          return /*#__PURE__*/ _react['default'].createElement(
            _TextField['default'],
            _extends({}, params, {
              autoFocus: true,
              inputProps: _objectSpread({}, params.inputProps, {
                onKeyPress: function onKeyPress(e) {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setName(e.target.value);
                  }
                },
                onBlur: function onBlur(e) {
                  return onBeforeSubmit(e);
                },
              }),
              placeholder: entityName,
              required: true,
              value: name,
              minLength: '1',
              InputProps: {
                className: classes.inputRoot,
                ref: params.InputProps.ref,
                endAdornment: /*#__PURE__*/ _react['default'].createElement(
                  _InputAdornment['default'],
                  {
                    position: 'end',
                  },
                  /*#__PURE__*/ _react['default'].createElement(
                    _Tooltip['default'],
                    {
                      title: 'Cancel',
                    },
                    /*#__PURE__*/ _react['default'].createElement(
                      _IconButton['default'],
                      {
                        size: 'small',
                        onClick: props.onCancel,
                        className: classes.adornmentIcon,
                      },
                      /*#__PURE__*/ _react['default'].createElement(_Close['default'], {
                        fontSize: 'inherit',
                      })
                    )
                  )
                ),
              },
            })
          );
        },
        renderOption: function renderOption(str) {
          return /*#__PURE__*/ _react['default'].createElement(
            _Typography['default'],
            {
              component: 'span',
              display: 'block',
              noWrap: true,
              variant: 'body2',
            },
            str
          );
        },
        size: 'small',
      })
    );
  }

  NameField.propTypes = {
    entityName: _propTypes['default'].string.isRequired,
    entityType: _propTypes['default'].string.isRequired,
    onCancel: _propTypes['default'].func.isRequired,
    onSubmit: _propTypes['default'].func.isRequired,
    suggestions: _propTypes['default'].array,
  };
});
