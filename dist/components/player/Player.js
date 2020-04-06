(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-player'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('react'), require('prop-types'), require('react-player'));
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.react, global.propTypes, global.reactPlayer);
    global.Player = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _react,
  _propTypes,
  _reactPlayer
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = void 0;
  _react = _interopRequireWildcard(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _reactPlayer = _interopRequireDefault(_reactPlayer);

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

  function _createSuper(Derived) {
    return function () {
      var Super = _getPrototypeOf(Derived),
        result;
      if (_isNativeReflectConstruct()) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
      return call;
    }
    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === 'function') return true;
    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  var Player = /*#__PURE__*/ (function (_Component) {
    _inherits(Player, _Component);

    var _super = _createSuper(Player);

    function Player(props) {
      var _this;

      _classCallCheck(this, Player);

      _this = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this), 'handleOnReady', function () {
        _this.internalPlayer = _this.player.current.getInternalPlayer();

        _this.setState({
          ready: true,
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'handleOnProgress', function (_ref) {
        var playedSeconds = _ref.playedSeconds;
        var _this$props = _this.props,
          onTimeUpdate = _this$props.onTimeUpdate,
          onProgress = _this$props.onProgress,
          roundTime = _this$props.roundTime,
          seekTo = _this$props.seekTo,
          scrubTo = _this$props.scrubTo;
        var buffering = _this.state.buffering;
        onProgress(roundTime ? Math.round(playedSeconds * 1e3) / 1e3 : playedSeconds);
        var time = (seekTo || scrubTo) && buffering ? seekTo : playedSeconds;
        onTimeUpdate(roundTime ? Math.round(time * 1e3) / 1e3 : time);
      });

      _this.player = _react['default'].createRef();
      _this.state = {
        ready: false,
        buffering: false,
        position: null,
      };
      return _this;
    } // shouldComponentUpdate(nextProps) {}

    _createClass(Player, [
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
          var _this$props2 = this.props,
            seekTo = _this$props2.seekTo,
            seekAhead = _this$props2.seekAhead,
            scrubTo = _this$props2.scrubTo,
            playing = _this$props2.playing,
            onTimeUpdate = _this$props2.onTimeUpdate;
          var _this$state = this.state,
            ready = _this$state.ready,
            buffering = _this$state.buffering,
            position = _this$state.position;

          if (seekTo !== prevProps.seekTo && ready) {
            if (seekTo !== null) {
              this.internalPlayer.seekTo(seekTo, seekAhead || playing);
              (buffering || !playing) && onTimeUpdate(seekTo);
            }
          }

          if (scrubTo !== prevProps.scrubTo && ready) {
            if (scrubTo !== null) {
              if (prevProps.scrubTo === null)
                this.setState({
                  position: this.player.current.getCurrentTime(),
                });
              this.internalPlayer.seekTo(scrubTo, seekAhead); // (buffering || !playing) &&

              onTimeUpdate(scrubTo);
            } else if (prevProps.scrubTo !== null) {
              this.internalPlayer.seekTo(position, seekAhead || playing);
              (buffering || !playing) && onTimeUpdate(position);
            }
          }
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _this$props3 = this.props,
            config = _this$props3.config,
            muted = _this$props3.muted,
            playing = _this$props3.playing,
            onDuration = _this$props3.onDuration,
            _onPlay = _this$props3.onPlay,
            _onPause = _this$props3.onPause,
            scrubTo = _this$props3.scrubTo;
          return /*#__PURE__*/ _react['default'].createElement(_reactPlayer['default'], {
            ref: this.player,
            width: '100%',
            height: '100%',
            controls: true,
            config: config,
            progressInterval: 200,
            url: this.props.url,
            muted: muted,
            playing: playing && !scrubTo,
            onPlay: function onPlay() {
              return !scrubTo && _onPlay();
            },
            onPause: function onPause() {
              return !scrubTo && _onPause();
            },
            onEnded: _onPause,
            onDuration: onDuration,
            onProgress: this.handleOnProgress,
            onReady: this.handleOnReady,
            onBuffer: function onBuffer() {
              return _this2.setState({
                buffering: true,
              });
            },
            onBufferEnd: function onBufferEnd() {
              return _this2.setState({
                buffering: false,
              });
            },
          });
        },
      },
    ]);

    return Player;
  })(_react.Component);

  Player.propTypes = {
    config: _propTypes['default'].object,
    url: _propTypes['default'].String,
    muted: _propTypes['default'].bool,
    playing: _propTypes['default'].bool,
    roundTime: _propTypes['default'].bool,
    seekAhead: _propTypes['default'].bool,
    onDuration: _propTypes['default'].func,
    onPlay: _propTypes['default'].func,
    onPause: _propTypes['default'].func,
  };
  Player.defaultProps = {
    config: {
      youtube: {
        playerVars: {
          autoplay: 0,
        },
        preload: true,
      },
    },
    muted: true,
    roundTime: false,
    seekAhead: false,
  };
  var _default = Player;
  _exports['default'] = _default;
});
