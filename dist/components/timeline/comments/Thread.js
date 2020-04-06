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
      '@material-ui/core/CircularProgress',
      '@material-ui/icons/Delete',
      '@material-ui/core/IconButton',
      '@material-ui/core/List',
      '@material-ui/core/ListItem',
      '@material-ui/core/ListItemSecondaryAction',
      '@material-ui/core/ListItemText',
      '@material-ui/core/Tooltip',
      '@material-ui/core/Typography',
      '@material-ui/core/colors/grey',
      '@material-ui/core/styles/makeStyles',
      './Comment',
      './Form',
      '../utils/formatTime',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/CircularProgress'),
      require('@material-ui/icons/Delete'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/List'),
      require('@material-ui/core/ListItem'),
      require('@material-ui/core/ListItemSecondaryAction'),
      require('@material-ui/core/ListItemText'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/Typography'),
      require('@material-ui/core/colors/grey'),
      require('@material-ui/core/styles/makeStyles'),
      require('./Comment'),
      require('./Form'),
      require('../utils/formatTime')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.react,
      global.CircularProgress,
      global.Delete,
      global.IconButton,
      global.List,
      global.ListItem,
      global.ListItemSecondaryAction,
      global.ListItemText,
      global.Tooltip,
      global.Typography,
      global.grey,
      global.makeStyles,
      global.Comment,
      global.Form,
      global.formatTime
    );
    global.Thread = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _CircularProgress,
  _Delete,
  _IconButton,
  _List,
  _ListItem,
  _ListItemSecondaryAction,
  _ListItemText,
  _Tooltip,
  _Typography,
  _grey,
  _makeStyles,
  _Comment,
  _Form,
  _formatTime
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Thread;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _CircularProgress = _interopRequireDefault(_CircularProgress);
  _Delete = _interopRequireDefault(_Delete);
  _IconButton = _interopRequireDefault(_IconButton);
  _List = _interopRequireDefault(_List);
  _ListItem = _interopRequireDefault(_ListItem);
  _ListItemSecondaryAction = _interopRequireDefault(_ListItemSecondaryAction);
  _ListItemText = _interopRequireDefault(_ListItemText);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _Typography = _interopRequireDefault(_Typography);
  _grey = _interopRequireDefault(_grey);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _Comment = _interopRequireDefault(_Comment);
  _Form = _interopRequireDefault(_Form);
  _formatTime = _interopRequireDefault(_formatTime);

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

  var useStyles = function useStyles(isActionable) {
    return (0, _makeStyles['default'])(function (theme) {
      return {
        list: {
          cursor: isActionable ? 'pointer' : 'inherit',
          maxHeight: '300px',
          overflowY: 'auto',
        },
        subheader: {
          background: _grey['default'][200],
        },
        buttonProgress: {
          marginRight: 8,
        },
      };
    });
  };

  function Thread(props) {
    var classes = useStyles(props.isActionable)();
    var isActionable = props.isActionable,
      thread = props.thread;
    var c_pretty_created_date = thread.c_pretty_created_date,
      replies = thread.replies,
      start_seconds = thread.start_seconds,
      text = thread.text,
      user = thread.user; // make clear what is what

    var threadId = thread.id;

    var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isProcessing = _useState2[0],
      setProcessingState = _useState2[1];

    var onCommentCreate = function onCommentCreate(text, formCallback) {
      setProcessingState(true);

      var callback = function callback() {
        formCallback();
        setProcessingState(false);
      };

      props.onCommentCreate(threadId, text, callback);
    };

    var onCommentThreadDelete = function onCommentThreadDelete() {
      setProcessingState(true);
      props.onCommentThreadDelete(threadId);
    };

    return /*#__PURE__*/ _react['default'].createElement(
      _List['default'],
      {
        dense: true,
        component: 'div',
        subheader: /*#__PURE__*/ _react['default'].createElement(
          _ListItem['default'],
          {
            component: 'div',
            className: classes.subheader,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _ListItemText['default'],
            null,
            /*#__PURE__*/ _react['default'].createElement(
              _Typography['default'],
              {
                color: 'textSecondary',
                variant: 'overline',
              },
              (0, _formatTime['default'])(start_seconds)
            )
          ),
          isActionable
            ? /*#__PURE__*/ _react['default'].createElement(
                _ListItemSecondaryAction['default'],
                null,
                isProcessing
                  ? /*#__PURE__*/ _react['default'].createElement(_CircularProgress['default'], {
                      size: 16,
                      className: classes.buttonProgress,
                    })
                  : /*#__PURE__*/ _react['default'].createElement(
                      _IconButton['default'],
                      {
                        'aria-label': 'Delete thread',
                        onClick: onCommentThreadDelete,
                      },
                      /*#__PURE__*/ _react['default'].createElement(
                        _Tooltip['default'],
                        {
                          title: 'Delete thread',
                        },
                        /*#__PURE__*/ _react['default'].createElement(_Delete['default'], {
                          fontSize: 'small',
                        })
                      )
                    )
              )
            : null
        ),
        className: classes.list,
      },
      /*#__PURE__*/ _react['default'].createElement(
        _Comment['default'],
        _extends({}, props, {
          avatar: user.profile_img_url,
          date: c_pretty_created_date,
          fname: user.first_name,
          id: threadId,
          isActionable: isActionable,
          isRoot: true,
          lname: user.last_name,
          text: text,
          threadId: threadId,
        })
      ),
      replies.map(function (reply, i) {
        return /*#__PURE__*/ _react['default'].createElement(
          _Comment['default'],
          _extends({}, props, {
            avatar: reply.user.profile_img_url,
            date: reply.c_pretty_created_date,
            fname: reply.user.first_name,
            id: reply.id,
            isActionable: isActionable,
            key: reply.id,
            lname: reply.user.last_name,
            text: reply.text,
            threadId: reply.thread_id,
          })
        );
      }),
      isActionable
        ? /*#__PURE__*/ _react['default'].createElement(
            _ListItem['default'],
            null,
            /*#__PURE__*/ _react['default'].createElement(
              _ListItemText['default'],
              null,
              /*#__PURE__*/ _react['default'].createElement(_Form['default'], {
                onCancel: props.onClose,
                onSubmit: onCommentCreate,
              })
            )
          )
        : null
    );
  }

  Thread.propTypes = {
    onClose: _propTypes['default'].func.isRequired,
    onCommentCreate: _propTypes['default'].func.isRequired,
    onCommentThreadDelete: _propTypes['default'].func.isRequired,
    thread: _propTypes['default'].object.isRequired,
    isActionable: _propTypes['default'].bool,
  };
  Thread.defaultProps = {
    isActionable: null,
    thread: null,
  };
});
