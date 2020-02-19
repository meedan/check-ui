'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = CommentPopover;

var _HoverPopover = _interopRequireDefault(
  require('material-ui-popup-state/HoverPopover')
);

var _react = _interopRequireDefault(require('react'));

var _hooks = require('material-ui-popup-state/hooks');

var _core = require('@material-ui/core');

var _styles = require('@material-ui/core/styles');

var _CommentThread = _interopRequireDefault(require('./CommentThread'));

var _NewThreadPopover = _interopRequireDefault(require('./NewThreadPopover'));

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

var useStyles = (0, _styles.makeStyles)(function(theme) {
  return {
    avatar: {
      height: 32,
      width: 32,
      border: '1px solid white',
    },
  };
});

function CommentPopover(props) {
  var classes = useStyles();
  var commentData = props.commentData;
  var isBeingAdded = commentData.isBeingAdded,
    user = commentData.user;
  var readPopupState = (0, _hooks.usePopupState)({
    variant: 'popover',
    popupId: 'readCommentPopoverPopup',
  });
  var editPopupState = (0, _hooks.usePopupState)({
    variant: 'popover',
    popupId: 'editCommentPopoverPopup',
  });

  var existingThread = _react['default'].createElement(
    _react['default'].Fragment,
    null,
    _react['default'].createElement(
      _core.Avatar,
      _extends(
        {},
        (0, _hooks.bindHover)(readPopupState),
        (0, _hooks.bindTrigger)(editPopupState),
        {
          alt: ''.concat(user.first_name, ' ').concat(user.last_name),
          className: classes.avatar,
          src: user.profile_img_url,
        }
      )
    ),
    _react['default'].createElement(
      _HoverPopover['default'],
      _extends({}, (0, _hooks.bindPopover)(readPopupState), {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        disableRestoreFocus: true,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
      }),
      _react['default'].createElement(
        _core.Card,
        null,
        _react['default'].createElement(_CommentThread['default'], {
          commentData: commentData,
          closePopup: readPopupState.close,
        })
      )
    ),
    _react['default'].createElement(
      _core.Popover,
      _extends({}, (0, _hooks.bindPopover)(editPopupState), {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        disableRestoreFocus: true,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
      }),
      _react['default'].createElement(
        _core.Card,
        null,
        _react['default'].createElement(_CommentThread['default'], {
          closePopup: editPopupState.close,
          commentData: commentData,
          isActionable: true,
        })
      )
    )
  );

  return _react['default'].createElement(
    'div',
    null,
    isBeingAdded
      ? _react['default'].createElement(_NewThreadPopover['default'], {
          commentData: commentData,
          saveNewCommentThread: props.saveNewCommentThread,
          stopNewCommentThread: props.stopNewCommentThread,
          user: user,
        })
      : existingThread
  );
}
