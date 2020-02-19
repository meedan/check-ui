'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _Avatar = _interopRequireDefault(require('@material-ui/core/Avatar'));

var _Grid = _interopRequireDefault(require('@material-ui/core/Grid'));

var _Popover = _interopRequireDefault(require('@material-ui/core/Popover'));

var _materialUiPopupState = _interopRequireWildcard(
  require('material-ui-popup-state')
);

var _react = _interopRequireWildcard(require('react'));

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

var styles = {
  avatar: {
    height: 32,
    width: 32,
    border: '1px solid white',
  },
  Grid: {
    margin: '16px',
    width: '200px',
  },
};

var NewCommentThreadPopover =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(NewCommentThreadPopover, _Component);

    function NewCommentThreadPopover(props) {
      var _this;

      _classCallCheck(this, NewCommentThreadPopover);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(NewCommentThreadPopover).call(this, props)
      );
      _this.avatarRef = null;
      _this.state = {
        hasPopover: false,
      };
      return _this;
    }

    _createClass(NewCommentThreadPopover, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.setState({
            hasPopover: true,
          });
        },
      },
      {
        key: 'handleStartNewThread',
        value: function handleStartNewThread(text) {
          console.group('handleStartNewThread()');
          console.log({
            text: text,
          });
          console.groupEnd();
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _this$props = this.props,
            classes = _this$props.classes,
            commentData = _this$props.commentData;
          var user = commentData.user;
          var open = Boolean(this.avatarRef);
          return _react['default'].createElement(
            'div',
            {
              ref: function ref(el) {
                return (_this2.avatarRef = el);
              },
            },
            open
              ? _react['default'].createElement(
                  _materialUiPopupState['default'],
                  {
                    variant: 'popover',
                    popupId: 'newCommentThread',
                  },
                  function(popupState) {
                    return _react['default'].createElement(
                      _react['default'].Fragment,
                      null,
                      _react['default'].createElement(
                        _Avatar['default'],
                        _extends(
                          {},
                          (0, _materialUiPopupState.bindTrigger)(popupState),
                          {
                            alt: ''
                              .concat(user.first_name, ' ')
                              .concat(user.last_name),
                            className: classes.avatar,
                            src: user.profile_img_url,
                          }
                        )
                      ),
                      _react['default'].createElement(
                        _Popover['default'],
                        _extends(
                          {},
                          (0, _materialUiPopupState.bindPopover)(popupState),
                          {
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center',
                            },
                            anchorEl: _this2.avatarRef,
                            disableRestoreFocus: true,
                            open: _this2.state.hasPopover,
                            onEscapeKeyDown: _this2.props.stopNewCommentThread,
                            onBackdropClick: _this2.props.stopNewCommentThread,
                            onClick: function onClick(e) {
                              return e.stopPropagation();
                            },
                            transformOrigin: {
                              vertical: 'bottom',
                              horizontal: 'center',
                            },
                          }
                        ),
                        _react['default'].createElement(
                          _Grid['default'],
                          {
                            className: classes.Grid,
                          },
                          _react['default'].createElement(
                            _CommentForm['default'],
                            {
                              isCreating: true,
                              onCancel: function onCancel() {
                                _this2.setState(
                                  {
                                    hasPopover: false,
                                  },
                                  function() {
                                    return _this2.props.stopNewCommentThread();
                                  }
                                );
                              },
                              onSubmit: function onSubmit(text) {
                                _this2.setState(
                                  {
                                    hasPopover: false,
                                  },
                                  function() {
                                    return _this2.props.saveNewCommentThread(
                                      text
                                    );
                                  }
                                );
                              },
                            }
                          )
                        )
                      )
                    );
                  }
                )
              : null
          );
        },
      },
    ]);

    return NewCommentThreadPopover;
  })(_react.Component);

var _default = (0, _styles.withStyles)(styles)(NewCommentThreadPopover);

exports['default'] = _default;
