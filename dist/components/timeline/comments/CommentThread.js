'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _CircularProgress = _interopRequireDefault(
  require('@material-ui/core/CircularProgress')
);

var _Delete = _interopRequireDefault(require('@material-ui/icons/Delete'));

var _IconButton = _interopRequireDefault(
  require('@material-ui/core/IconButton')
);

var _List = _interopRequireDefault(require('@material-ui/core/List'));

var _ListItem = _interopRequireDefault(require('@material-ui/core/ListItem'));

var _ListItemSecondaryAction = _interopRequireDefault(
  require('@material-ui/core/ListItemSecondaryAction')
);

var _ListItemText = _interopRequireDefault(
  require('@material-ui/core/ListItemText')
);

var _react = _interopRequireWildcard(require('react'));

var _Tooltip = _interopRequireDefault(require('@material-ui/core/Tooltip'));

var _Typography = _interopRequireDefault(
  require('@material-ui/core/Typography')
);

var _grey = _interopRequireDefault(require('@material-ui/core/colors/grey'));

var _propTypes = require('prop-types');

var _styles = require('@material-ui/core/styles');

var _Comment = _interopRequireDefault(require('./Comment'));

var _CommentForm = _interopRequireDefault(require('./CommentForm'));

var _formatTime = _interopRequireDefault(require('../utils/formatTime'));

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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var styles = {
  List: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  ListSubheader: {
    background: _grey['default'][200],
  },
  buttonProgress: {
    marginRight: 8,
  },
};

var CommentThread =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(CommentThread, _Component);

    function CommentThread(props) {
      var _this;

      _classCallCheck(this, CommentThread);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(CommentThread).call(this, props)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'handleThreadReply',
        function(comment) {
          // TODO: wire adding new comments here, also log user data
          console.group('handleThreadReply()');
          console.log({
            comment: comment,
          });
          console.groupEnd();
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'handleThreadDelete',
        function(threadId) {
          // TODO: wire deleting comment thread here
          console.group('handleThreadDelete()');
          console.log({
            threadId: threadId,
          });
          console.groupEnd();

          _this.setState({
            processing: true,
          });

          setTimeout(function() {
            return _this.props.closePopup();
          }, 1000);
        }
      );

      _this.state = {
        processing: null,
        isActionable: _this.props.isActionable,
      };
      return _this;
    }

    _createClass(CommentThread, [
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _this$props = this.props,
            classes = _this$props.classes,
            commentData = _this$props.commentData;
          var isActionable = this.state.isActionable;
          var c_pretty_created_date = commentData.c_pretty_created_date,
            replies = commentData.replies,
            start_seconds = commentData.start_seconds,
            text = commentData.text,
            user = commentData.user,
            id = commentData.id;
          var threadId = id;
          return _react['default'].createElement(
            _List['default'],
            {
              onClick: !isActionable
                ? function() {
                    return _this2.setState({
                      isActionable: true,
                    });
                  }
                : null,
              dense: true,
              component: 'div',
              subheader: _react['default'].createElement(
                _react['default'].Fragment,
                null,
                _react['default'].createElement(
                  _ListItem['default'],
                  {
                    component: 'div',
                    className: classes.ListSubheader,
                  },
                  _react['default'].createElement(
                    _ListItemText['default'],
                    null,
                    _react['default'].createElement(
                      _Typography['default'],
                      {
                        color: 'textSecondary',
                        variant: 'overline',
                      },
                      (0, _formatTime['default'])(start_seconds)
                    )
                  ),
                  _react['default'].createElement(
                    _ListItemSecondaryAction['default'],
                    null,
                    isActionable
                      ? this.state.isProcessing
                        ? _react['default'].createElement(
                            _CircularProgress['default'],
                            {
                              size: 16,
                              className: classes.buttonProgress,
                            }
                          )
                        : _react['default'].createElement(
                            _IconButton['default'],
                            {
                              'aria-label': 'Delete thread',
                              onClick: function onClick() {
                                return _this2.handleThreadDelete(threadId);
                              },
                            },
                            _react['default'].createElement(
                              _Tooltip['default'],
                              {
                                title: 'Delete thread',
                              },
                              _react['default'].createElement(
                                _Delete['default'],
                                {
                                  fontSize: 'small',
                                }
                              )
                            )
                          )
                      : null
                  )
                )
              ),
              style: {
                cursor: isActionable ? 'pointer' : 'inherit',
              },
              className: classes.List,
            },
            _react['default'].createElement(_Comment['default'], {
              avatar: user.profile_img_url,
              date: c_pretty_created_date,
              fname: user.first_name,
              id: threadId,
              isActionable: isActionable,
              isRoot: true,
              lname: user.last_name,
              text: text,
            }),
            replies.map(function(reply, i) {
              return _react['default'].createElement(_Comment['default'], {
                avatar: reply.user.profile_img_url,
                date: reply.c_pretty_created_date,
                fname: reply.user.first_name,
                id: reply.id,
                isActionable: isActionable,
                key: reply.id,
                lname: reply.user.last_name,
                text: reply.text,
                threadId: reply.thread_id,
              });
            }),
            isActionable
              ? _react['default'].createElement(
                  _ListItem['default'],
                  null,
                  _react['default'].createElement(
                    _ListItemText['default'],
                    null,
                    _react['default'].createElement(_CommentForm['default'], {
                      onCancel: this.props.closePopup,
                      onSubmit: this.handleThreadReply,
                    })
                  )
                )
              : null
          );
        },
      },
    ]);

    return CommentThread;
  })(_react.Component);

var _default = (0, _styles.withStyles)(styles)(CommentThread);

exports['default'] = _default;
CommentThread.propTypes = {
  closePopup: _propTypes.func.isRequired,
  isActionable: _propTypes.bool,
  commentData: _propTypes.object,
};
CommentThread.defaultProps = {
  isActionable: null,
  commentData: null,
};
