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
      '@material-ui/core/Button',
      '@material-ui/core/Grid',
      '@material-ui/core/TextField',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/Button'),
      require('@material-ui/core/Grid'),
      require('@material-ui/core/TextField')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.propTypes, global.react, global.Button, global.Grid, global.TextField);
    global.Form = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _Button,
  _Grid,
  _TextField
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Form;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _Button = _interopRequireDefault(_Button);
  _Grid = _interopRequireDefault(_Grid);
  _TextField = _interopRequireDefault(_TextField);

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

  function Form(props) {
    var value = props.value;

    var _useState = (0, _react.useState)(value),
      _useState2 = _slicedToArray(_useState, 2),
      comment = _useState2[0],
      setComment = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      saving = _useState4[0],
      setSaving = _useState4[1];

    var onChange = function onChange(e) {
      setComment(e.target.value);
    };

    var onCancel = function onCancel() {
      setComment(value);
      props.onCancel();
    };

    var onSubmit = function onSubmit() {
      setSaving(true);
      if (comment.length > 0)
        props.onSubmit(comment, function () {
          return setSaving(false);
        });
    };

    var isCreating = !value || value.length === 0;
    return /*#__PURE__*/ _react['default'].createElement(
      _Grid['default'],
      {
        container: true,
        direction: 'column',
        spacing: 1,
        wrap: 'nowrap',
      },
      /*#__PURE__*/ _react['default'].createElement(
        _Grid['default'],
        {
          item: true,
        },
        /*#__PURE__*/ _react['default'].createElement(_TextField['default'], {
          autoFocus: true,
          defaultValue: comment,
          disabled: saving,
          fullWidth: true,
          id: 'comment',
          inputProps: {
            autoComplete: 'off',
            style: {
              fontSize: '13px',
            },
            onKeyPress: function onKeyPress(e) {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
              }
            },
          },
          onChange: onChange,
          placeholder: isCreating ? 'New comment' : 'Enter comment',
          required: true,
          type: 'text',
        })
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _Grid['default'],
        {
          item: true,
        },
        /*#__PURE__*/ _react['default'].createElement(
          _Grid['default'],
          {
            container: true,
            direction: 'row-reverse',
            justify: 'space-between',
            wrap: 'nowrap',
          },
          /*#__PURE__*/ _react['default'].createElement(
            _Grid['default'],
            {
              item: true,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _Button['default'],
              {
                color: 'primary',
                disabled: !comment || comment.length === 0 || saving,
                onClick: onSubmit,
                size: 'small',
              },
              isCreating ? 'Save' : 'Reply'
            )
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Grid['default'],
            {
              item: true,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _Button['default'],
              {
                disabled: saving,
                onClick: onCancel,
                size: 'small',
              },
              isCreating ? 'Cancel' : 'Close'
            )
          )
        )
      )
    );
  }

  Form.propTypes = {
    onCancel: _propTypes['default'].func.isRequired,
    onSubmit: _propTypes['default'].func.isRequired,
  };
  Form.defaultProps = {
    value: null,
  };
});
