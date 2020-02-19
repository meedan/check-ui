'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

require('rc-slider/assets/index.css');

var _react = _interopRequireWildcard(require('react'));

var _rcSlider = _interopRequireDefault(require('rc-slider'));

var _lodash = _interopRequireDefault(require('lodash'));

var _styledComponents = _interopRequireDefault(require('styled-components'));

var _Add = _interopRequireDefault(require('@material-ui/icons/Add'));

var _core = require('@material-ui/core');

var _TableSection = _interopRequireDefault(require('../elements/TableSection'));

var _CommentMarker = _interopRequireDefault(require('./CommentMarker'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
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

function _templateObject() {
  var data = _taggedTemplateLiteral([
    '\n  .rc-slider-disabled,\n  .rc-slider-disabled .rc-slider-rail {\n    background: transparent;\n  }\n  .rc-slider-disabled {\n    .rc-slider-mark-text {\n      cursor: pointer !important;\n    }\n  }\n  .rc-slider-mark-text {\n    height: 32px;\n    width: 32px;\n    transform: translateY(-27px) !important;\n  }\n  .rc-slider-dot {\n    visibility: hidden;\n  }\n',
  ]);

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

// import { pause } from '../../reducers/player';
var SliderWrapper = _styledComponents['default'].div(_templateObject());

var TimelineComments =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(TimelineComments, _Component);

    function TimelineComments(props) {
      var _this;

      _classCallCheck(this, TimelineComments);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(TimelineComments).call(this, props)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'startNewCommentThread',
        function() {
          _this.props.pause();

          var newThread = {
            isBeingAdded: true,
            start_seconds: _this.props.currentTime,
            user: {
              first_name: 'Piotr',
              id: 2468,
              last_name: 'Fedorczyk',
              profile_img_url:
                'https://lh3.googleusercontent.com/-WnVd2Jl55-s/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reNETuW6ipxVS4_eHwhl1sQ0pEn6Q/s100/photo.jpg',
            },
          };
          var newThreads = [].concat(_toConsumableArray(_this.state.threads), [
            newThread,
          ]);

          _this.setState({
            threads: newThreads,
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'stopNewCommentThread',
        function() {
          _this.setState({
            threads: _this.props.data.commentThreads,
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'saveNewCommentThread',
        function(text) {
          console.group('saveNewCommentThread()');
          console.log({
            text: text,
          });
          console.log(_this.props.currentTime);
          console.groupEnd();
        }
      );

      _this.state = {
        threads: _this.props.data.commentThreads,
      };
      return _this;
    }

    _createClass(TimelineComments, [
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var duration = this.props.duration;

          var getMarks = function getMarks() {
            return _lodash['default'].reduce(
              _this2.state.threads,
              function(object, param) {
                var pos = param.start_seconds;
                object[pos] = _react['default'].createElement(
                  _CommentMarker['default'],
                  _extends({}, _this2.props, {
                    commentData: param,
                    key: param.id,
                    stopNewCommentThread: _this2.stopNewCommentThread,
                    saveNewCommentThread: _this2.saveNewCommentThread,
                  })
                );
                return object;
              },
              {}
            );
          };

          return _react['default'].createElement(_TableSection['default'], {
            title: 'Comments',
            actions: _react['default'].createElement(
              _core.Tooltip,
              {
                title: 'New comment',
              },
              _react['default'].createElement(
                _core.IconButton,
                {
                  onClick: this.startNewCommentThread,
                },
                _react['default'].createElement(_Add['default'], {
                  fontSize: 'small',
                })
              )
            ),
            firstRowContent: _react['default'].createElement(
              SliderWrapper,
              null,
              _react['default'].createElement(_rcSlider['default'], {
                defaultValue: null,
                disabled: true,
                included: false,
                marks: getMarks(),
                max: duration,
                min: 0,
                value: null,
              })
            ),
          });
        },
      },
    ]);

    return TimelineComments;
  })(_react.Component);

var _default = _react['default'].memo(function(props) {
  return _react['default'].createElement(TimelineComments, props);
}); // export default connect(null, { pause })(
//   React.memo(props => <TimelineComments {...props} />)
// );

exports['default'] = _default;
