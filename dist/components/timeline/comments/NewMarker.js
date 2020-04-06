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
      'material-ui-popup-state/hooks',
      'prop-types',
      'react',
      '@material-ui/core/Avatar',
      '@material-ui/core/Grid',
      '@material-ui/core/Popover',
      '@material-ui/core/styles/makeStyles',
      './Form',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('material-ui-popup-state/hooks'),
      require('prop-types'),
      require('react'),
      require('@material-ui/core/Avatar'),
      require('@material-ui/core/Grid'),
      require('@material-ui/core/Popover'),
      require('@material-ui/core/styles/makeStyles'),
      require('./Form')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.hooks,
      global.propTypes,
      global.react,
      global.Avatar,
      global.Grid,
      global.Popover,
      global.makeStyles,
      global.Form
    );
    global.NewMarker = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _hooks,
  _propTypes,
  _react,
  _Avatar,
  _Grid,
  _Popover,
  _makeStyles,
  _Form
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = NewThreadPopover;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _Avatar = _interopRequireDefault(_Avatar);
  _Grid = _interopRequireDefault(_Grid);
  _Popover = _interopRequireDefault(_Popover);
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

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    return {
      avatar: {
        height: 32,
        width: 32,
        border: '1px solid white',
      },
      grid: {
        margin: '16px',
        width: '200px',
      },
    };
  });

  function NewThreadPopover(props) {
    var avatarRoot = (0, _react.useRef)();
    var classes = useStyles();
    var open = Boolean(avatarRoot);
    var user = props.thread.user;
    var thisPopupState = (0, _hooks.usePopupState)({
      variant: 'popover',
      popupId: 'newThreadPopupState',
    });

    var onCommentThreadCreate = function onCommentThreadCreate(text, formCallback) {
      var callback = function callback() {
        formCallback();
        thisPopupState.close();
      };

      props.onCommentThreadCreate(text, callback);
    };

    var onCommentThreadStop = function onCommentThreadStop() {
      thisPopupState.close();
      props.onCommentThreadStop();
    };

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
    (0, _react.useEffect)(function () {
      thisPopupState.open();
    }, []);
    if (!open) return null;
    return /*#__PURE__*/ _react['default'].createElement(
      _react['default'].Fragment,
      null,
      /*#__PURE__*/ _react['default'].createElement(
        _Avatar['default'],
        _extends({}, (0, _hooks.bindTrigger)(thisPopupState), {
          alt: ''.concat(user.first_name, ' ').concat(user.last_name),
          className: classes.avatar,
          ref: (0, _hooks.anchorRef)(thisPopupState),
          src: user.profile_img_url,
        })
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _Popover['default'],
        _extends({}, (0, _hooks.bindPopover)(thisPopupState), popoverProps, {
          disableRestoreFocus: true,
          onBackdropClick: props.onCommentThreadStop,
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
          onEscapeKeyDown: props.onCommentThreadStop,
        }),
        /*#__PURE__*/ _react['default'].createElement(
          _Grid['default'],
          {
            className: classes.grid,
          },
          /*#__PURE__*/ _react['default'].createElement(_Form['default'], {
            onCancel: onCommentThreadStop,
            onSubmit: onCommentThreadCreate,
          })
        )
      )
    );
  }

  NewThreadPopover.propTypes = {
    onCommentThreadStop: _propTypes['default'].func.isRequired,
  };
});
