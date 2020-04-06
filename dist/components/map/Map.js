(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'prop-types', '@react-google-maps/api', 'fast-deep-equal', 'react'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('@react-google-maps/api'),
      require('fast-deep-equal'),
      require('react')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports, global.propTypes, global.api, global.fastDeepEqual, global.react);
    global.Map = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _api,
  _fastDeepEqual,
  _react
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = void 0;
  _propTypes = _interopRequireDefault(_propTypes);
  _fastDeepEqual = _interopRequireDefault(_fastDeepEqual);
  _react = _interopRequireWildcard(_react);

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
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

  function _iterableToArray(iter) {
    if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
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

  var Map = /*#__PURE__*/ (function (_Component) {
    _inherits(Map, _Component);

    var _super = _createSuper(Map);

    function Map(props) {
      var _this;

      _classCallCheck(this, Map);

      _this = _super.call(this, props);

      _defineProperty(_assertThisInitialized(_this), 'onLoad', function (map) {
        _this.map = map;
      });

      _this.state = {
        marker: _this.props.marker || {},
        center: null,
      };
      _this.handleMarkerClick = _this.handleMarkerClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Map, [
      {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
          var _this$props = this.props,
            index = _this$props.index,
            places = _this$props.places;

          if (index > -1 && index < places.length && index !== nextProps.index) {
            var marker = places[index];

            if (marker && this.map) {
              var viewport = marker.viewport,
                zoom = marker.zoom,
                type = marker.type;

              var _ref = type === 'marker' ? marker : marker.polygon[0],
                lat = _ref.lat,
                lng = _ref.lng;

              this.setState({
                marker: marker,
                center: {
                  lat: lat,
                  lng: lng,
                },
                zoom: zoom,
              });
              this.map.panTo({
                lat: lat,
                lng: lng,
              });
              if (zoom) this.map.setZoom(zoom);

              if (viewport) {
                this.map.panToBounds(viewport);
              } // // this.map.setCenter({ lat, lng });
              // this.map.panTo({ lat, lng });
              // if (zoom) this.map.setZoom(zoom);
              // if (viewport) setTimeout(() => this.map.panToBounds(viewport), 500);
            }

            return false;
          }

          return !(0, _fastDeepEqual['default'])(this.props.places, nextProps.places);
        },
      },
      {
        key: 'handleMarkerClick',
        value: function handleMarkerClick(time) {
          // FIXME
          // this.props.seekTo({ seekTo: time, transport: 'map' });
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this$props2 = this.props,
            places = _this$props2.places,
            isCompact = _this$props2.isCompact;
          var marker = this.state.marker;
          var center = places
            .reduce(
              function (acc, d) {
                var coords =
                  d.type === 'marker'
                    ? [
                        {
                          lat: d.lat,
                          lng: d.lng,
                        },
                      ]
                    : d.polygon;
                return [].concat(_toConsumableArray(coords), _toConsumableArray(acc));
              },
              [
                {
                  lat: 0,
                  lng: 0,
                },
              ]
            )
            .reverse()
            .pop();
          if (this.state.center) center = this.state.center;
          if (marker && marker.lat && marker.lng)
            center = {
              lat: marker.lat,
              lng: marker.lng,
            };
          if (this.map && this.map.center) center = this.map.center;
          var zoom = isCompact ? 10 : 2.5;
          if (this.state.zoom) center = this.state.zoom;
          return /*#__PURE__*/ _react['default'].createElement(
            _api.GoogleMap,
            {
              center: center,
              mapContainerStyle: {
                height: '100%',
                width: '100%',
              },
              onLoad: this.onLoad,
              options: {
                draggableCursor: 'grab',
                zoomControl: isCompact ? false : true,
                streetViewControl: isCompact ? false : true,
                mapTypeControl: isCompact ? false : true,
                scaleControl: isCompact ? false : true,
                rotateControl: isCompact ? false : true,
                fullscreenControl: isCompact ? false : true,
              },
              zoom: zoom,
            },
            places
              .filter(function (d) {
                return d.type === 'marker';
              })
              .map(function (_ref2, i) {
                var lat = _ref2.lat,
                  lng = _ref2.lng,
                  time = _ref2.time;
                return /*#__PURE__*/ _react['default'].createElement(_api.Marker, {
                  key: 'm-'.concat(i),
                  draggable: false, // animation={window.google && window.google.maps.Animation.DROP}
                  position: {
                    lat: lat,
                    lng: lng,
                  }, // onClick={() => this.handleMarkerClick(time)}
                });
              }),
            this.props.places
              .filter(function (d) {
                return d.type === 'polygon';
              })
              .map(function (polygon, i) {
                return /*#__PURE__*/ _react['default'].createElement(_api.Polygon, {
                  key: 'p-'.concat(i),
                  path: polygon.polygon,
                  options: polygonOptions, // onClick={() => this.handleMarkerClick(polygon.time)}
                });
              })
          );
        },
      },
    ]);

    return Map;
  })(_react.Component);

  var polygonOptions = {
    clickable: true,
    draggable: false,
    editable: false,
    fillColor: '000',
    fillOpacity: 0.1,
    geodesic: false,
    // strokeColor: color.brand, // FIXME @pio
    strokeOpacity: 1,
    strokeWeight: 2,
    zIndex: 1,
  };
  Map.propTypes = {
    index: _propTypes['default'].number,
    places: _propTypes['default'].array,
    isCompact: _propTypes['default'].bool,
  };
  Map.defaultProps = {
    index: -1,
    places: [],
    isCompact: false,
  };
  var _default = Map;
  _exports['default'] = _default;
});
