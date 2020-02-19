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
exports['default'] = CommentForm;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireWildcard(require('react'));

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

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

var useStyles = (0, _styles.makeStyles)(function(theme) {
  return {
    grid: {
      width: '200px',
    },
  };
});

function CommentForm(props) {
  var classes = useStyles();
  var isCreating = props.isCreating,
    isEditing = props.isEditing,
    value = props.value;

  var _useState = (0, _react.useState)(value),
    _useState2 = _slicedToArray(_useState, 2),
    comment = _useState2[0],
    setComment = _useState2[1];

  var onCancel = function onCancel() {
    setComment(value);
    props.onCancel();
  };

  return _react['default'].createElement(
    _core.Grid,
    {
      container: true,
      direction: 'column',
      spacing: 1,
      wrap: 'nowrap',
      className: classes.Grid,
    },
    _react['default'].createElement(
      _core.Grid,
      {
        item: true,
      },
      _react['default'].createElement(_core.TextField, {
        autoFocus: true,
        defaultValue: comment,
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
              return comment.length > 0 ? props.onSubmit(comment) : null;
            }
          },
        },
        onChange: function onChange(e) {
          return setComment(e.currentTarget.value);
        },
        placeholder: isEditing ? 'Enter comment' : 'New comment',
        required: true,
        type: 'text',
      })
    ),
    _react['default'].createElement(
      _core.Grid,
      {
        item: true,
      },
      _react['default'].createElement(
        _core.Grid,
        {
          container: true,
          direction: 'row-reverse',
          justify: 'space-between',
          wrap: 'nowrap',
        },
        _react['default'].createElement(
          _core.Grid,
          {
            item: true,
          },
          _react['default'].createElement(
            _core.Button,
            {
              color: 'primary',
              disabled: !comment || comment.length === 0,
              mini: true,
              onClick: function onClick() {
                return props.onSubmit(comment);
              },
              size: 'small',
            },
            isEditing || isCreating ? 'Save' : 'Reply'
          )
        ),
        _react['default'].createElement(
          _core.Grid,
          {
            item: true,
          },
          _react['default'].createElement(
            _core.Button,
            {
              mini: true,
              onClick: onCancel,
              size: 'small',
            },
            isCreating || isCreating ? 'Cancel' : 'Close'
          )
        )
      )
    )
  );
}

CommentForm.propTypes = {
  onCancel: _propTypes['default'].func.isRequired,
  onSubmit: _propTypes['default'].func.isRequired,
};
