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
      'material-ui-popup-state/HoverPopover',
      'react',
      'material-ui-popup-state/hooks',
      '@material-ui/core/Avatar',
      '@material-ui/core/CircularProgress',
      '@material-ui/core/IconButton',
      '@material-ui/core/List',
      '@material-ui/core/ListItem',
      '@material-ui/core/ListItemAvatar',
      '@material-ui/core/ListItemSecondaryAction',
      '@material-ui/core/ListItemText',
      '@material-ui/icons/MoreVert',
      '@material-ui/core/Tooltip',
      '@material-ui/core/Typography',
      '@material-ui/core/styles/makeStyles',
      './Form',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('material-ui-popup-state/HoverPopover'),
      require('react'),
      require('material-ui-popup-state/hooks'),
      require('@material-ui/core/Avatar'),
      require('@material-ui/core/CircularProgress'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/List'),
      require('@material-ui/core/ListItem'),
      require('@material-ui/core/ListItemAvatar'),
      require('@material-ui/core/ListItemSecondaryAction'),
      require('@material-ui/core/ListItemText'),
      require('@material-ui/icons/MoreVert'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/Typography'),
      require('@material-ui/core/styles/makeStyles'),
      require('./Form')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.HoverPopover,
      global.react,
      global.hooks,
      global.Avatar,
      global.CircularProgress,
      global.IconButton,
      global.List,
      global.ListItem,
      global.ListItemAvatar,
      global.ListItemSecondaryAction,
      global.ListItemText,
      global.MoreVert,
      global.Tooltip,
      global.Typography,
      global.makeStyles,
      global.Form
    );
    global.Comment = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _HoverPopover,
  _react,
  _hooks,
  _Avatar,
  _CircularProgress,
  _IconButton,
  _List,
  _ListItem,
  _ListItemAvatar,
  _ListItemSecondaryAction,
  _ListItemText,
  _MoreVert,
  _Tooltip,
  _Typography,
  _makeStyles,
  _Form
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Comment;
  _propTypes = _interopRequireDefault(_propTypes);
  _HoverPopover = _interopRequireDefault(_HoverPopover);
  _react = _interopRequireWildcard(_react);
  _Avatar = _interopRequireDefault(_Avatar);
  _CircularProgress = _interopRequireDefault(_CircularProgress);
  _IconButton = _interopRequireDefault(_IconButton);
  _List = _interopRequireDefault(_List);
  _ListItem = _interopRequireDefault(_ListItem);
  _ListItemAvatar = _interopRequireDefault(_ListItemAvatar);
  _ListItemSecondaryAction = _interopRequireDefault(_ListItemSecondaryAction);
  _ListItemText = _interopRequireDefault(_ListItemText);
  _MoreVert = _interopRequireDefault(_MoreVert);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _Typography = _interopRequireDefault(_Typography);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _Form = _interopRequireDefault(_Form);

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

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    return {
      avatar: {
        height: 28,
        width: 28,
      },
      item: {
        width: '240px',
      },
      itemAvatar: {
        minWidth: '40px',
      },
      secondaryAction: {
        top: 8,
        transform: 'none',
      },
      mask: {
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.66)',
        bottom: '0',
        display: 'flex',
        justifyContent: 'center',
        left: '0',
        position: 'absolute',
        right: '0',
        top: '0',
        zIndex: '2',
      },
    };
  });

  function Comment(props) {
    var classes = useStyles();
    var avatar = props.avatar,
      date = props.date,
      fname = props.fname,
      isActionable = props.isActionable,
      isRoot = props.isRoot,
      lname = props.lname,
      text = props.text,
      threadId = props.threadId;

    var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEditing = _useState2[0],
      setEditingState = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isHovering = _useState4[0],
      setHoveringState = _useState4[1];

    var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isProcessing = _useState6[0],
      setProcessingState = _useState6[1]; // make obvious what is what

    var commentId = props.id;
    var popupState = (0, _hooks.usePopupState)({
      popupId: 'MoreMenuItem',
      variant: 'popover',
    });

    var onCommentStop = function onCommentStop() {
      console.log('—— onCommentStop()');
      setEditingState(false);
      popupState.close();
    };

    var onCommentEditToggle = function onCommentEditToggle() {
      console.log('—— onCommentEditToggle()');
      setEditingState(true);
      popupState.close();
    };

    var onCommentEdit = function onCommentEdit(text) {
      console.log('—— onCommentEdit()');
      setProcessingState(true);
      setEditingState(false);
      props.onCommentEdit(threadId, commentId, text);
    };

    var onCommentDelete = function onCommentDelete() {
      setProcessingState(true);
      props.onCommentDelete(threadId, commentId);
    };

    var displayActions = function displayActions() {
      if (!isActionable) return null;
      return /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          style: {
            visibility: isHovering && !isEditing ? 'visible' : 'hidden',
          },
        },
        /*#__PURE__*/ _react['default'].createElement(
          _IconButton['default'],
          (0, _hooks.bindHover)(popupState),
          /*#__PURE__*/ _react['default'].createElement(_MoreVert['default'], null)
        ),
        /*#__PURE__*/ _react['default'].createElement(
          _HoverPopover['default'],
          _extends({}, (0, _hooks.bindPopover)(popupState), {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            disableRestoreFocus: true,
          }),
          /*#__PURE__*/ _react['default'].createElement(
            _List['default'],
            {
              dense: true,
            },
            /*#__PURE__*/ _react['default'].createElement(
              _ListItem['default'],
              {
                button: true,
                onClick: onCommentEditToggle,
              },
              /*#__PURE__*/ _react['default'].createElement(_ListItemText['default'], null, 'Edit')
            ),
            !isRoot
              ? /*#__PURE__*/ _react['default'].createElement(
                  _ListItem['default'],
                  {
                    button: true,
                    onClick: onCommentDelete,
                  },
                  /*#__PURE__*/ _react['default'].createElement(_ListItemText['default'], null, 'Delete')
                )
              : null
          )
        )
      );
    };

    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        onMouseEnter: function onMouseEnter() {
          return setHoveringState(true);
        },
        onMouseLeave: function onMouseLeave() {
          return setHoveringState(false);
        },
      },
      /*#__PURE__*/ _react['default'].createElement(
        _ListItem['default'],
        {
          alignItems: 'flex-start',
          className: classes.item,
        },
        /*#__PURE__*/ _react['default'].createElement(
          _ListItemAvatar['default'],
          {
            className: classes.itemAvatar,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: /*#__PURE__*/ _react['default'].createElement(
                _Typography['default'],
                {
                  align: 'center',
                  color: 'inherit',
                  variant: 'caption',
                },
                date
              ),
            },
            /*#__PURE__*/ _react['default'].createElement(_Avatar['default'], {
              alt: ''.concat(fname, ' ').concat(lname),
              src: avatar,
              className: classes.avatar,
            })
          )
        ),
        /*#__PURE__*/ _react['default'].createElement(
          _ListItemText['default'],
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Typography['default'],
            {
              variant: 'body2',
            },
            ''.concat(fname, ' ').concat(lname)
          ),
          isEditing
            ? /*#__PURE__*/ _react['default'].createElement(_Form['default'], {
                onCancel: onCommentStop,
                onSubmit: text.length > 0 ? onCommentEdit : onCommentStop,
                value: text,
              })
            : /*#__PURE__*/ _react['default'].createElement(
                _Typography['default'],
                {
                  color: 'textSecondary',
                  display: 'block',
                  style: {
                    fontSize: '13px',
                  },
                  variant: 'body2',
                },
                text
              )
        ),
        isProcessing &&
          /*#__PURE__*/ _react['default'].createElement(
            'div',
            {
              className: classes.mask,
            },
            /*#__PURE__*/ _react['default'].createElement(_CircularProgress['default'], {
              size: 22,
            })
          ),
        /*#__PURE__*/ _react['default'].createElement(
          _ListItemSecondaryAction['default'],
          {
            className: classes.secondaryAction,
          },
          displayActions()
        )
      )
    );
  }

  Comment.propTypes = {
    isActionable: _propTypes['default'].bool,
    onCommentCreate: _propTypes['default'].func.isRequired,
    onCommentDelete: _propTypes['default'].func.isRequired,
    onCommentEdit: _propTypes['default'].func.isRequired,
  };
  Comment.defaultProps = {
    isActionable: false,
  };
});
