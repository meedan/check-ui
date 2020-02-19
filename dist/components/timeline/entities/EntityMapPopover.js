'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireWildcard(require('react'));

var _fastDeepEqual = _interopRequireDefault(require('fast-deep-equal'));

var _styledComponents = _interopRequireDefault(require('styled-components'));

var _api = require('@react-google-maps/api');

var _AddLocation = _interopRequireDefault(
  require('@material-ui/icons/AddLocation')
);

var _Check = _interopRequireDefault(require('@material-ui/icons/Check'));

var _Close = _interopRequireDefault(require('@material-ui/icons/Close'));

var _FormatShapes = _interopRequireDefault(
  require('@material-ui/icons/FormatShapes')
);

var _KeyboardBackspace = _interopRequireDefault(
  require('@material-ui/icons/KeyboardBackspace')
);

var _grey = _interopRequireDefault(require('@material-ui/core/colors/grey'));

var _styles = require('@material-ui/core/styles');

var _core = require('@material-ui/core');

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
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
    '\n  border-left: 1px solid ',
    ';\n  display: inline-block;\n  height: 18px;\n  margin-left: 4px;\n  margin-right: 4px;\n  width: 1px;\n',
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

var Separator = _styledComponents['default'].span(
  _templateObject(),
  _grey['default'][200]
);

var styles = {
  Button: {
    height: 28,
    minWidth: 'auto',
    width: 32,
  },
  Input: {
    padding: 8,
    fontSize: '13px',
  },
  SaveIcon: {
    fontSize: '22px',
    position: 'relative',
    top: '-3px',
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

var PlaceMap =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(PlaceMap, _Component);

    function PlaceMap(props) {
      var _this;

      _classCallCheck(this, PlaceMap);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(PlaceMap).call(this, props)
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'handlePlaceSelect',
        function(e) {
          var place = _this.autocomplete.getPlace();

          if (place && place.geometry) {
            _this.map.fitBounds(place.geometry.viewport.toJSON());

            var _place$geometry$locat = place.geometry.location,
              lat = _place$geometry$locat.lat,
              lng = _place$geometry$locat.lng;

            _this.setState({
              dropPin: false,
              marker: {
                lat: lat(),
                lng: lng(),
                viewport: place.geometry.viewport.toJSON(),
                type: 'marker',
              },
              saved: false,
            });
          }
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'handleBoundsChanged',
        function(e) {
          var viewport = _this.map.getBounds().toJSON();

          var zoom = _this.map.getZoom();

          _this.setState({
            viewport: viewport,
            zoom: zoom,
          });

          return true;
        }
      );

      _defineProperty(_assertThisInitialized(_this), 'onLoad', function(map) {
        _this.map = map;
        _this.autocomplete = new window.google.maps.places.Autocomplete(
          _this.searchRef.current,
          {}
        );

        _this.autocomplete.addListener(
          'place_changed',
          _this.handlePlaceSelect
        );

        _this.map.addListener('idle', _this.handleBoundsChanged); // window.google.maps.event.trigger(this.searchRef.current, 'focus');

        var marker = _this.props.marker;

        if (!_this.props.marker) {
          setTimeout(function() {
            return _this.searchRef.current.dispatchEvent(
              new KeyboardEvent('keydown', {
                keyCode: 40,
                which: 40,
                code: 'ArrowDown',
                key: 'ArrowDown',
              })
            );
          }, 500);
        } else {
          var type = marker.type;

          var _ref = type === 'marker' ? marker : marker.polygon[0],
            lat = _ref.lat,
            lng = _ref.lng,
            viewport = _ref.viewport,
            zoom = _ref.zoom;

          setTimeout(function() {
            _this.map.setCenter({
              lat: lat,
              lng: lng,
            });

            if (zoom) _this.map.setZoom(zoom);

            _this.map.panToBounds(viewport);
          }, 100);
        }
      });

      _defineProperty(
        _assertThisInitialized(_this),
        'toggleDropPin',
        function() {
          _this.setState({
            dropPin: true,
            drawPolygon: false,
            marker: {},
          });
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'toggleDrawPolygon',
        function() {
          _this.setState({
            dropPin: false,
            drawPolygon: true,
            marker: {},
          });
        }
      );

      _defineProperty(_assertThisInitialized(_this), 'saveCurrent', function() {
        var marker = null;

        if (_this.state.marker.type === 'marker' && _this.marker) {
          var _this$marker$getPosit = _this.marker.getPosition(),
            lat = _this$marker$getPosit.lat,
            lng = _this$marker$getPosit.lng;

          marker = {
            lat: lat(),
            lng: lng(),
            type: 'marker',
            viewport: _this.state.viewport,
            zoom: _this.state.zoom,
          };

          _this.setState({
            drawPolygon: false,
            dropPin: false,
            saved: true,
            marker: marker,
          });
        } else if (_this.state.marker.type === 'polygon' && _this.polygon) {
          var polygon = [];

          _this.polygon.getPath().forEach(function(_ref2) {
            var lat = _ref2.lat,
              lng = _ref2.lng;
            return polygon.push({
              lat: lat(),
              lng: lng(),
            });
          });

          marker = {
            polygon: polygon,
            type: 'polygon',
            viewport: _this.state.viewport,
          };

          _this.setState({
            drawPolygon: false,
            dropPin: false,
            saved: true,
            marker: marker,
          });
        } else {
          _this.setState({
            drawPolygon: false,
            dropPin: false,
            saved: true,
          });
        }

        _this.props.onSave(marker);

        _this.props.onClose();
      });

      _defineProperty(_assertThisInitialized(_this), 'handleMapClick', function(
        e
      ) {
        if (_this.state.dropPin) {
          var _e$latLng = e.latLng,
            lat = _e$latLng.lat,
            lng = _e$latLng.lng;

          _this.setState({
            saved: false,
            marker: {
              lat: lat(),
              lng: lng(),
              type: 'marker',
            },
          });
        }

        if (_this.state.drawPolygon) {
          var _e$latLng2 = e.latLng,
            _lat = _e$latLng2.lat,
            _lng = _e$latLng2.lng;

          _this.setState({
            saved: false,
            marker: {
              polygon: [].concat(
                _toConsumableArray(_this.state.marker.polygon || []),
                [
                  {
                    lat: _lat(),
                    lng: _lng(),
                  },
                ]
              ),
              type: 'polygon',
            },
          });
        }
      });

      _defineProperty(
        _assertThisInitialized(_this),
        'handleMarkerUpdate',
        function() {
          setTimeout(function() {
            var _this$marker$getPosit2 = _this.marker.getPosition(),
              lat = _this$marker$getPosit2.lat,
              lng = _this$marker$getPosit2.lng;

            var lt = lat();
            var lg = lng();

            if (
              lt !== _this.state.marker.lat &&
              lg !== _this.state.marker.lng
            ) {
              _this.setState({
                marker: {
                  lat: lat(),
                  lng: lng(),
                  type: 'marker',
                },
              });
            }
          }, 0);
        }
      );

      _this.state = {
        drawPolygon:
          !!_this.props.marker && _this.props.marker.type === 'polygon',
        dropPin: !!_this.props.marker && _this.props.marker.type === 'marker',
        saved: !_this.props.marker,
        marker: _this.props.marker ? _this.props.marker : {},
        placeName: _this.props.placeName,
      };
      _this.searchRef = _react['default'].createRef();
      return _this;
    }

    _createClass(PlaceMap, [
      {
        key: 'setStep',
        value: function setStep(step) {
          this.setState({
            step: step,
          });
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var classes = this.props.classes;
          var _this$state = this.state,
            dropPin = _this$state.dropPin,
            drawPolygon = _this$state.drawPolygon,
            marker = _this$state.marker;
          var polygonOptions = {
            clickable: true,
            draggable: false,
            editable: true,
            fillColor: '000',
            fillOpacity: 0.1,
            geodesic: false,
            strokeColor: 'orange',
            strokeOpacity: 1,
            strokeWeight: 2,
            zIndex: 1,
          };
          var center = {
            lat: 0,
            lng: 0,
          };
          if (this.state.center) center = this.state.center;
          if (marker && marker.lat && marker.lng)
            center = {
              lat: marker.lat,
              lng: marker.lng,
            };
          if (marker && marker.polygon && marker.polygon.length > 0)
            center = {
              lat: marker.polygon[0].lat,
              lng: marker.polygon[0].lng,
            };
          if (this.map && this.map.center) center = this.map.center;
          var zoom = this.marker && this.marker.zoom ? this.marker.zoom : 2.5;
          return _react['default'].createElement(
            _core.Popper,
            {
              placement: 'bottom-start',
              anchorEl: this.props.anchorRef,
              open: true,
              modifiers: {
                offset: {
                  offset: '0, -100%',
                },
              },
              onClick: function onClick(e) {
                return e.stopPropagation();
              },
              onEscapeKeyDown: this.props.isCreating,
            },
            _react['default'].createElement(
              _core.Paper,
              {
                square: true,
              },
              _react['default'].createElement(_core.TextField, {
                autoFocus: true,
                defaultValue: this.state.placeName,
                fullWidth: true,
                inputRef: this.searchRef,
                onKeyPress: function onKeyPress(e) {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('trigger search?');
                  }
                },
                placeholder: 'Find location\u2026',
                InputProps: {
                  classes: {
                    root: classes.Input,
                  },
                  startAdornment: _react['default'].createElement(
                    _core.InputAdornment,
                    {
                      position: 'start',
                    },
                    _react['default'].createElement(
                      _core.Tooltip,
                      {
                        title: 'Change name\u2026',
                      },
                      _react['default'].createElement(
                        _core.IconButton,
                        {
                          onClick: this.props.startPlaceRename,
                        },
                        _react['default'].createElement(
                          _KeyboardBackspace['default'],
                          {
                            fontSize: 'small',
                            color: 'disabled',
                          }
                        )
                      )
                    )
                  ),
                  endAdornment: _react['default'].createElement(
                    _core.InputAdornment,
                    {
                      position: 'end',
                    },
                    _react['default'].createElement(Separator, null),
                    _react['default'].createElement(
                      _core.Tooltip,
                      {
                        title: 'Drop a pin',
                      },
                      _react['default'].createElement(
                        _core.IconButton,
                        {
                          color:
                            dropPin && marker.type !== 'marker'
                              ? 'primary'
                              : 'secondary',
                          onClick: this.toggleDropPin,
                        },
                        _react['default'].createElement(
                          _AddLocation['default'],
                          {
                            fontSize: 'small',
                          }
                        )
                      )
                    ),
                    _react['default'].createElement(
                      _core.Tooltip,
                      {
                        title: 'Mark an area',
                      },
                      _react['default'].createElement(
                        _core.IconButton,
                        {
                          color:
                            drawPolygon && marker.type !== 'polygon'
                              ? 'primary'
                              : 'secondary',
                          onClick: this.toggleDrawPolygon,
                        },
                        _react['default'].createElement(
                          _FormatShapes['default'],
                          {
                            fontSize: 'small',
                          }
                        )
                      )
                    ),
                    _react['default'].createElement(Separator, null),
                    !(0, _fastDeepEqual['default'])(
                      _objectSpread({}, this.state.marker, {
                        viewport: this.state.viewport,
                      }),
                      this.props.marker
                    )
                      ? _react['default'].createElement(
                          _core.Tooltip,
                          {
                            title: 'Save location',
                          },
                          _react['default'].createElement(
                            _core.Button,
                            {
                              disabled: this.state.saved,
                              className: classes.Button,
                              color: 'primary',
                              onClick: this.saveCurrent,
                              variant: 'contained',
                            },
                            _react['default'].createElement(_Check['default'], {
                              fontSize: 'small',
                              className: classes.SaveIcon,
                            })
                          )
                        )
                      : _react['default'].createElement(
                          _core.Tooltip,
                          {
                            title: 'Close',
                          },
                          _react['default'].createElement(
                            _core.IconButton,
                            {
                              onClick: this.props.isCreating
                                ? this.props.stopNewPlace
                                : this.props.onClose,
                            },
                            _react['default'].createElement(_Close['default'], {
                              fontSize: 'small',
                            })
                          )
                        )
                  ),
                },
              }),
              _react['default'].createElement(
                _api.GoogleMap,
                {
                  id: 'map-'.concat(this.props.placeId),
                  mapContainerStyle: {
                    height: '240px',
                    width: '400px',
                  },
                  zoom: zoom,
                  center: center,
                  onClick: this.handleMapClick,
                  onLoad: this.onLoad,
                  options: {
                    draggableCursor:
                      this.state.dropPin || this.state.drawPolygon
                        ? 'crosshair'
                        : 'grab',
                    mapTypeControl: false,
                    streetViewControl: true,
                    streetViewControlOptions: {
                      position:
                        window.google &&
                        window.google.maps.ControlPosition.LEFT_BOTTOM,
                    },
                  },
                },
                this.state.marker.type === 'polygon' &&
                  this.state.marker.polygon.length > 0
                  ? _react['default'].createElement(_api.Polygon, {
                      key: 'poly',
                      editable: this.state.drawPolygon,
                      path: this.state.marker.polygon,
                      onLoad: function onLoad(polygon) {
                        return (_this2.polygon = polygon);
                      },
                      options: polygonOptions,
                    })
                  : null,
                this.state.marker.type === 'marker'
                  ? _react['default'].createElement(_api.Marker, {
                      key: 'marker',
                      draggable: this.state.dropPin,
                      animation:
                        window.google && window.google.maps.Animation.DROP,
                      position: {
                        lat: this.state.marker.lat,
                        lng: this.state.marker.lng,
                      },
                      onLoad: function onLoad(marker) {
                        return (_this2.marker = marker);
                      },
                      onPositionChanged: this.handleMarkerUpdate,
                    })
                  : null
              )
            )
          );
        },
      },
    ]);

    return PlaceMap;
  })(_react.Component);

var _default = (0, _styles.withStyles)(styles)(PlaceMap);

exports['default'] = _default;
