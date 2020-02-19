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
exports['default'] = Comment;

var _HoverPopover = _interopRequireDefault(
  require('material-ui-popup-state/HoverPopover')
);

var _react = _interopRequireWildcard(require('react'));

var _styledComponents = _interopRequireDefault(require('styled-components'));

var _hooks = require('material-ui-popup-state/hooks');

var _MoreVert = _interopRequireDefault(require('@material-ui/icons/MoreVert'));

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

var _CommentForm = _interopRequireDefault(require('./CommentForm'));

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

function _templateObject2() {
  var data = _taggedTemplateLiteral(['\n  ', ';\n']);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(['\n  visibility: hidden;\n']);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

var useStyles = (0, _styles.makeStyles)(function(theme) {
  return {
    avatar: {
      height: 28,
      width: 28,
    },
    ListItem: {
      width: '240px',
    },
    listItemSecondaryAction: {
      top: 8,
      transform: 'none',
    },
    ListItemAvatar: {
      minWidth: '40px',
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

var ElSideControls = _styledComponents['default'].div(_templateObject());

var El = _styledComponents['default'].div(_templateObject2(), function(_ref) {
  var hasAddornment = _ref.hasAddornment;
  return hasAddornment
    ? '\n  '.concat(ElSideControls, ' {\n    visibility: visible;\n  }\n')
    : '';
});

function Comment(props) {
  var classes = useStyles();
  var isRoot = props.isRoot,
    isActionable = props.isActionable,
    id = props.id,
    threadId = props.threadId,
    fname = props.fname,
    lname = props.lname,
    avatar = props.avatar,
    date = props.date,
    text = props.text;

  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isEditing = _useState2[0],
    setEditingStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isProcessing = _useState4[0],
    setProcessingStatus = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isHovering = _useState6[0],
    setHoveringStatus = _useState6[1];

  var popupState = (0, _hooks.usePopupState)({
    popupId: 'MoreMenuItem',
    variant: 'popover',
  });

  var toggleCommentEdit = function toggleCommentEdit() {
    setEditingStatus(true);
    popupState.close();
  };

  var handleCommentEdit = function handleCommentEdit(text) {
    // TODO: wire this up to save changes to the comment
    // the first comment will have `isRoot` prop set
    // the first comment can be accessed with `id`
    // subsequent comments have also threadId (which is first comment’s id)
    setProcessingStatus(true);
    setEditingStatus(false);
    setTimeout(function() {
      return setProcessingStatus(false);
    }, 1000); // TODO: make this real

    console.group('handleCommentEdit()');
    console.log(
      isRoot
        ? {
            id: id,
          }
        : ''.concat(id, ' > ').concat(threadId)
    );
    console.log({
      text: text,
    });
    console.groupEnd();
  };

  var handleCommentDelete = function handleCommentDelete() {
    // TODO: wire this up to delete comment
    setProcessingStatus(true);
    setEditingStatus(false);
    setTimeout(function() {
      return setProcessingStatus(false);
    }, 1000); // TODO: make this real

    popupState.close();
    console.group('handleCommentDelete()');
    console.log({
      threadId: threadId,
    });
    console.log({
      id: id,
    });
    console.groupEnd();
  };

  var displayActions = function displayActions() {
    if (isActionable) {
      return _react['default'].createElement(
        _react['default'].Fragment,
        null,
        _react['default'].createElement(
          ElSideControls,
          null,
          _react['default'].createElement(
            _core.IconButton,
            (0, _hooks.bindHover)(popupState),
            _react['default'].createElement(_MoreVert['default'], null)
          ),
          _react['default'].createElement(
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
            _react['default'].createElement(
              _core.List,
              {
                dense: true,
              },
              _react['default'].createElement(
                _core.ListItem,
                {
                  button: true,
                  onClick: toggleCommentEdit,
                },
                _react['default'].createElement(
                  _core.ListItemText,
                  null,
                  'Edit'
                )
              ),
              !isRoot
                ? _react['default'].createElement(
                    _core.ListItem,
                    {
                      button: true,
                      onClick: handleCommentDelete,
                    },
                    _react['default'].createElement(
                      _core.ListItemText,
                      null,
                      'Delete'
                    )
                  )
                : null
            )
          )
        )
      );
    }

    return null;
  };

  return _react['default'].createElement(
    El,
    {
      hasAddornment: isHovering && !isEditing,
      onMouseEnter: function onMouseEnter() {
        return setHoveringStatus(true);
      },
      onMouseLeave: function onMouseLeave() {
        return setHoveringStatus(false);
      },
    },
    _react['default'].createElement(
      _core.ListItem,
      {
        alignItems: 'flex-start',
        className: classes.ListItem,
        key: id,
      },
      _react['default'].createElement(
        _core.ListItemAvatar,
        {
          className: classes.ListItemAvatar,
        },
        _react['default'].createElement(
          _core.Tooltip,
          {
            title: _react['default'].createElement(
              _core.Typography,
              {
                align: 'center',
                color: 'inherit',
                variant: 'caption',
              },
              date
            ),
          },
          _react['default'].createElement(_core.Avatar, {
            alt: ''.concat(fname, ' ').concat(lname),
            src: avatar,
            className: classes.avatar,
          })
        )
      ),
      _react['default'].createElement(
        _core.ListItemText,
        null,
        _react['default'].createElement(
          _core.Typography,
          {
            variant: 'body2',
          },
          ''.concat(fname, ' ').concat(lname)
        ),
        isEditing
          ? _react['default'].createElement(_CommentForm['default'], {
              isEditing: true,
              onCancel: function onCancel() {
                return setEditingStatus(false);
              },
              onSubmit: function onSubmit(text) {
                return handleCommentEdit(text, id);
              },
              value: text,
            })
          : _react['default'].createElement(
              _core.Typography,
              {
                color: 'textSecondary',
                display: 'block',
                variant: 'body2',
                style: {
                  fontSize: '13px',
                },
              },
              text
            )
      ),
      _react['default'].createElement(
        _core.ListItemSecondaryAction,
        {
          className: classes.listItemSecondaryAction,
        },
        displayActions()
      ),
      isProcessing &&
        _react['default'].createElement(
          'div',
          {
            className: classes.mask,
          },
          _react['default'].createElement(_core.CircularProgress, {
            size: 22,
          })
        )
    )
  );
}
