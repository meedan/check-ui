(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'prop-types',
      'material-ui-popup-state/HoverPopover',
      'react',
      'material-ui-popup-state/hooks',
      '@material-ui/core/Avatar',
      '@material-ui/core/Card',
      '@material-ui/core/Popover',
      '@material-ui/core/styles/makeStyles',
      './Thread',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('material-ui-popup-state/HoverPopover'),
      require('react'),
      require('material-ui-popup-state/hooks'),
      require('@material-ui/core/Avatar'),
      require('@material-ui/core/Card'),
      require('@material-ui/core/Popover'),
      require('@material-ui/core/styles/makeStyles'),
      require('./Thread')
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
      global.Card,
      global.Popover,
      global.makeStyles,
      global.Thread
    );
    global.Marker = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _HoverPopover,
  _react,
  _hooks,
  _Avatar,
  _Card,
  _Popover,
  _makeStyles,
  _Thread
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Marker;
  _propTypes = _interopRequireDefault(_propTypes);
  _HoverPopover = _interopRequireDefault(_HoverPopover);
  _react = _interopRequireDefault(_react);
  _Avatar = _interopRequireDefault(_Avatar);
  _Card = _interopRequireDefault(_Card);
  _Popover = _interopRequireDefault(_Popover);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _Thread = _interopRequireDefault(_Thread);

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

  var useStyles = function useStyles() {
    return (0, _makeStyles['default'])(function (theme) {
      return {
        avatar: {
          height: 32,
          width: 32,
          border: '1px solid white',
        },
        hoverCard: {
          cursor: 'pointer',
        },
      };
    });
  };

  function Marker(props) {
    var classes = useStyles()();
    var thread = props.thread;
    var user = thread.user;
    var readPopupState = (0, _hooks.usePopupState)({
      variant: 'popover',
      popupId: 'readMarkerPopup',
    });
    var editPopupState = (0, _hooks.usePopupState)({
      variant: 'popover',
      popupId: 'editMarkerPopup',
    });
    var popoverProps = {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    };

    var onToggleActionable = function onToggleActionable(e) {
      e.stopPropagation();
      readPopupState.close();
      editPopupState.open();
    };

    return /*#__PURE__*/ _react['default'].createElement(
      _react['default'].Fragment,
      null,
      /*#__PURE__*/ _react['default'].createElement(
        _Avatar['default'],
        _extends({}, (0, _hooks.bindHover)(readPopupState), (0, _hooks.bindTrigger)(editPopupState), {
          alt: ''.concat(user.first_name, ' ').concat(user.last_name),
          className: classes.avatar,
          ref: (0, _hooks.anchorRef)(editPopupState),
          src: user.profile_img_url,
        })
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _HoverPopover['default'],
        _extends({}, (0, _hooks.bindPopover)(readPopupState), popoverProps, {
          disableRestoreFocus: true,
          onClick: onToggleActionable,
        }),
        /*#__PURE__*/ _react['default'].createElement(
          _Card['default'],
          {
            className: classes.hoverCard,
          },
          /*#__PURE__*/ _react['default'].createElement(
            _Thread['default'],
            _extends({}, props, {
              onClose: readPopupState.close,
              thread: thread,
              onCommentThreadDelete: function onCommentThreadDelete(threadId) {
                props.onCommentThreadDelete(threadId, readPopupState.close);
              },
            })
          )
        )
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _Popover['default'],
        _extends({}, (0, _hooks.bindPopover)(editPopupState), popoverProps, {
          disableRestoreFocus: true,
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
        }),
        /*#__PURE__*/ _react['default'].createElement(
          _Card['default'],
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Thread['default'],
            _extends({}, props, {
              isActionable: true,
              onClose: editPopupState.close,
              onCommentThreadDelete: function onCommentThreadDelete(threadId) {
                props.onCommentThreadDelete(threadId, editPopupState.close);
              },
              thread: thread,
            })
          )
        )
      )
    );
  }

  Marker.propTypes = {
    onCommentCreate: _propTypes['default'].func.isRequired,
    onCommentDelete: _propTypes['default'].func.isRequired,
    onCommentEdit: _propTypes['default'].func.isRequired,
    onCommentThreadDelete: _propTypes['default'].func.isRequired,
  };
});
