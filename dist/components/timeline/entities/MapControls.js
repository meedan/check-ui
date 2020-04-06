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
      'prop-types',
      'react',
      'lodash/mean',
      '@react-google-maps/api',
      '@material-ui/icons/AddLocation',
      '@material-ui/icons/Check',
      '@material-ui/icons/Close',
      '@material-ui/core/Divider',
      '@material-ui/icons/FormatShapes',
      '@material-ui/core/IconButton',
      '@material-ui/core/InputAdornment',
      '@material-ui/icons/KeyboardBackspace',
      '@material-ui/core/TextField',
      '@material-ui/core/Tooltip',
      '@material-ui/core/styles/makeStyles',
      './MapControls.css',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('lodash/mean'),
      require('@react-google-maps/api'),
      require('@material-ui/icons/AddLocation'),
      require('@material-ui/icons/Check'),
      require('@material-ui/icons/Close'),
      require('@material-ui/core/Divider'),
      require('@material-ui/icons/FormatShapes'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/InputAdornment'),
      require('@material-ui/icons/KeyboardBackspace'),
      require('@material-ui/core/TextField'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/styles/makeStyles'),
      require('./MapControls.css')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.react,
      global.mean,
      global.api,
      global.AddLocation,
      global.Check,
      global.Close,
      global.Divider,
      global.FormatShapes,
      global.IconButton,
      global.InputAdornment,
      global.KeyboardBackspace,
      global.TextField,
      global.Tooltip,
      global.makeStyles,
      global.MapControls
    );
    global.MapControls = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _mean,
  _api,
  _AddLocation,
  _Check,
  _Close,
  _Divider,
  _FormatShapes,
  _IconButton,
  _InputAdornment,
  _KeyboardBackspace,
  _TextField,
  _Tooltip,
  _makeStyles,
  _MapControls
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = MapControls;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _mean = _interopRequireDefault(_mean);
  _AddLocation = _interopRequireDefault(_AddLocation);
  _Check = _interopRequireDefault(_Check);
  _Close = _interopRequireDefault(_Close);
  _Divider = _interopRequireDefault(_Divider);
  _FormatShapes = _interopRequireDefault(_FormatShapes);
  _IconButton = _interopRequireDefault(_IconButton);
  _InputAdornment = _interopRequireDefault(_InputAdornment);
  _KeyboardBackspace = _interopRequireDefault(_KeyboardBackspace);
  _TextField = _interopRequireDefault(_TextField);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _makeStyles = _interopRequireDefault(_makeStyles);

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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
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
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _nonIterableSpread() {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _slicedToArray(arr, i) {
    return (
      _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
    );
  }

  function _nonIterableRest() {
    throw new TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }

  var useStyles = (0, _makeStyles['default'])(function (theme) {
    return {
      input: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      iconButton: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        minWidth: 'auto',
      },
      divider: {
        height: theme.spacing(3),
      },
    };
  });

  var getCenter = function getCenter(shape) {
    if (shape && shape.type === 'marker') {
      return {
        lat: shape.lat,
        lng: shape.lng,
      };
    } else if (shape && shape.type === 'polygon') {
      var meanLat = (0, _mean['default'])(
        shape.polygon.map(function (o) {
          return o.lat;
        })
      );
      var meanLng = (0, _mean['default'])(
        shape.polygon.map(function (o) {
          return o.lng;
        })
      );
      return {
        lat: meanLat,
        lng: meanLng,
      };
    }

    return {
      lat: 0,
      lng: 0,
    };
  };

  function MapControls(_ref) {
    var anchorRef = _ref.anchorRef,
      entityName = _ref.entityName,
      entityShape = _ref.entityShape,
      props = _objectWithoutProperties(_ref, ['anchorRef', 'entityName', 'entityShape']);

    var inputRef = (0, _react.useRef)();
    var classes = useStyles();
    var mapInstance;
    var autocompleteInstance;

    var _useState = (0, _react.useState)({
        lat: 0,
        lng: 0,
      }),
      _useState2 = _slicedToArray(_useState, 2),
      center = _useState2[0],
      setCenter = _useState2[1];

    var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      loadedShape = _useState4[0],
      setLoadedShape = _useState4[1];

    var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      mode = _useState6[0],
      setMode = _useState6[1];

    var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      shape = _useState8[0],
      setShape = _useState8[1];

    var _useState9 = (0, _react.useState)(3),
      _useState10 = _slicedToArray(_useState9, 2),
      viewport = _useState10[0],
      setViewport = _useState10[1];

    var _useState11 = (0, _react.useState)(3),
      _useState12 = _slicedToArray(_useState11, 2),
      zoom = _useState12[0],
      setZoom = _useState12[1]; // a couple of things necessary for the map init

    var onPlaceSelect = function onPlaceSelect(e) {
      // when place gets selected via autocomplete (input field aka inputRef)
      var place = autocompleteInstance.getPlace();

      if (place && place.geometry) {
        console.log({
          place: place,
        });
        mapInstance.fitBounds(place.geometry.viewport.toJSON()); // const { lat, lng } = place.geometry.location;
        // this.setState({
        //   dropPin: false,
        //   marker: {
        //     lat: lat(),
        //     lng: lng(),
        //     viewport: place.geometry.viewport.toJSON(),
        //     type: 'marker',
        //   },
        //   saved: false,
        // });
      }
    };

    var onBoundsChanged = function onBoundsChanged() {
      // when map view changes (zoom/viewport)
      var viewport = mapInstance.getBounds().toJSON();
      setViewport(viewport);
      var zoom = mapInstance.getZoom();
      setZoom(zoom);
    }; // init map

    var onMapLoad = function onMapLoad(map) {
      autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current, {});
      autocompleteInstance.addListener('place_changed', onPlaceSelect);
      mapInstance = map;
      mapInstance.addListener('idle', onBoundsChanged); // window.google.maps.event.trigger(inputRef.current, 'focus'); // TODO: test this
    }; // switch between map drawing modes

    var onToggleMarkerMode = function onToggleMarkerMode() {
      setShape(null);
      setMode('marker');
    };

    var onTogglePolygonMode = function onTogglePolygonMode() {
      setShape(null);
      setMode('polygon');
    }; // Map interaction (polygon AND marker)

    var onMapClick = function onMapClick(e) {
      var _e$latLng = e.latLng,
        lat = _e$latLng.lat,
        lng = _e$latLng.lng;

      if (mode === 'marker') {
        setShape({
          // ...shape,
          lat: lat(),
          lng: lng(),
          type: 'marker',
        });
      } else if (mode === 'polygon') {
        setShape({
          // ...shape,
          polygon: [].concat(_toConsumableArray(shape && shape.polygon ? shape.polygon : []), [
            {
              lat: lat(),
              lng: lng(),
            },
          ]),
          type: 'polygon',
        });
      }
    }; // On shape change

    var onMarkerPositionChange = function onMarkerPositionChange() {
      if (!loadedShape) return null;
      if (!loadedShape.getPosition || loadedShape.getPosition === undefined) return null;

      var _loadedShape$getPosit = loadedShape.getPosition(),
        lat = _loadedShape$getPosit.lat,
        lng = _loadedShape$getPosit.lng;

      if (shape.lat !== lat() && shape.lng !== lng())
        setShape({
          lat: lat(),
          lng: lng(),
          type: 'marker',
          viewport: viewport,
          zoom: zoom,
        });
    };

    var onPolygonPositionChange = function onPolygonPositionChange() {
      if (!loadedShape) return null;
      var polygon = loadedShape
        .getPath()
        .getArray()
        .map(function (latLng) {
          return {
            lat: latLng.lat(),
            lng: latLng.lng(),
          };
        });
      setShape({
        polygon: polygon,
        type: 'polygon',
      });
    }; // Discard / Confirm

    var onDiscard = function onDiscard() {
      // onClick={this.props.isCreating ? this.props.stopNewPlace : this.props.onDiscard}
      props.onDiscard();
    };

    var onConfirm = function onConfirm() {
      props.onUpdate(
        _objectSpread({}, shape, {
          viewport: viewport,
          zoom: zoom,
        })
      );
      setMode(null);
    }; // Effects & co.

    (0, _react.useEffect)(
      function () {
        if (!entityShape) return null;
        setCenter(getCenter(entityShape));
        setShape(entityShape);
        setZoom(entityShape.zoom);
      },
      [entityShape]
    );
    (0, _react.useEffect)(
      function () {
        setMode(props.mode);
      },
      [props.mode]
    );
    (0, _react.useEffect)(
      function () {
        if (!shape) {
          inputRef.current.dispatchEvent(
            new KeyboardEvent('keydown', {
              keyCode: 40,
              which: 40,
              code: 'ArrowDown',
              key: 'ArrowDown',
            })
          );
        } else {
          var _ref2 = shape.type === 'marker' ? shape : shape.polygon[0],
            lat = _ref2.lat,
            lng = _ref2.lng,
            _viewport = _ref2.viewport;

          setCenter({
            lat: lat,
            lng: lng,
          }); // setZoom(zoom);
          // this.map.panToBounds(viewport);
        }
      },
      [mapInstance]
    ); // console.group('MapControls.js');
    // console.log('center', center);
    // console.log('loadedMap:', loadedMap);
    // console.log('loadedShape:', loadedShape);
    // console.log('entityShape:', entityShape);
    // console.log('mode:', mode);
    // console.log('shape:', shape);
    // console.log('viewport:', viewport);
    // console.log('zoom:', zoom);
    // console.groupEnd();

    return /*#__PURE__*/ _react['default'].createElement(
      _react['default'].Fragment,
      null,
      /*#__PURE__*/ _react['default'].createElement(_TextField['default'], {
        autoFocus: true,
        fullWidth: true,
        inputRef: inputRef,
        defaultValue: entityName,
        InputProps: {
          classes: {
            root: classes.input,
          },
          startAdornment: /*#__PURE__*/ _react['default'].createElement(
            _InputAdornment['default'],
            {
              position: 'start',
            },
            /*#__PURE__*/ _react['default'].createElement(
              _Tooltip['default'],
              {
                title: 'Rename location\u2026',
              },
              /*#__PURE__*/ _react['default'].createElement(
                _IconButton['default'],
                {
                  onClick: props.onBeforeRename,
                  className: classes.iconButton,
                },
                /*#__PURE__*/ _react['default'].createElement(_KeyboardBackspace['default'], {
                  fontSize: 'small',
                })
              )
            )
          ),
          endAdornment: /*#__PURE__*/ _react['default'].createElement(
            _InputAdornment['default'],
            {
              position: 'end',
            },
            /*#__PURE__*/ _react['default'].createElement(_Divider['default'], {
              orientation: 'vertical',
              className: classes.divider,
            }),
            /*#__PURE__*/ _react['default'].createElement(
              _Tooltip['default'],
              {
                title: 'Mark precise location',
              },
              /*#__PURE__*/ _react['default'].createElement(
                'span',
                null,
                /*#__PURE__*/ _react['default'].createElement(
                  _IconButton['default'],
                  {
                    className: classes.iconButton,
                    color: mode === 'marker' ? 'primary' : 'inherit', // disabled={!mode || mode === 'polygon' ? false : true}
                    onClick: onToggleMarkerMode,
                  },
                  /*#__PURE__*/ _react['default'].createElement(_AddLocation['default'], {
                    fontSize: 'small',
                  })
                )
              )
            ),
            /*#__PURE__*/ _react['default'].createElement(
              _Tooltip['default'],
              {
                title: 'Mark area',
              },
              /*#__PURE__*/ _react['default'].createElement(
                'span',
                null,
                /*#__PURE__*/ _react['default'].createElement(
                  _IconButton['default'],
                  {
                    className: classes.iconButton,
                    color: mode === 'polygon' ? 'primary' : 'inherit', // disabled={!mode || mode === 'marker' ? false : true}
                    onClick: onTogglePolygonMode,
                  },
                  /*#__PURE__*/ _react['default'].createElement(_FormatShapes['default'], {
                    fontSize: 'small',
                  })
                )
              )
            ),
            /*#__PURE__*/ _react['default'].createElement(_Divider['default'], {
              orientation: 'vertical',
              className: classes.divider,
            }),
            mode
              ? /*#__PURE__*/ _react['default'].createElement(
                  _Tooltip['default'],
                  {
                    title: 'Save',
                  },
                  /*#__PURE__*/ _react['default'].createElement(
                    _IconButton['default'],
                    {
                      className: classes.iconButton,
                      color: 'primary',
                      onClick: onConfirm,
                      variant: 'contained',
                    },
                    /*#__PURE__*/ _react['default'].createElement(_Check['default'], null)
                  )
                )
              : /*#__PURE__*/ _react['default'].createElement(
                  _Tooltip['default'],
                  {
                    title: 'Discard',
                  },
                  /*#__PURE__*/ _react['default'].createElement(
                    _IconButton['default'],
                    {
                      onClick: onDiscard,
                      className: classes.iconButton,
                    },
                    /*#__PURE__*/ _react['default'].createElement(_Close['default'], {
                      fontSize: 'small',
                    })
                  )
                )
          ),
        },
        placeholder: 'Locate place\u2026',
        size: 'medium',
      }),
      /*#__PURE__*/ _react['default'].createElement(
        _api.GoogleMap,
        {
          id: 'entity-map',
          mapContainerStyle: {
            height: '240px',
            width: '400px',
          },
          zoom: zoom,
          center: center,
          onClick: onMapClick,
          onLoad: function onLoad(map) {
            return onMapLoad(map);
          },
          options: {
            draggableCursor: mode ? 'crosshair' : 'grab',
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            streetViewControlOptions: {
              position: window.google && window.google.maps.ControlPosition.LEFT_BOTTOM,
            },
          },
        },
        shape && shape.type === 'polygon' && shape.polygon.length > 0
          ? /*#__PURE__*/ _react['default'].createElement(_api.Polygon, {
              editable: mode === 'polygon',
              onLoad: function onLoad(polygon) {
                return setLoadedShape(polygon);
              },
              options: {
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
              },
              path: shape.polygon,
              onMouseUp: onPolygonPositionChange,
            })
          : null,
        shape && shape.type === 'marker'
          ? /*#__PURE__*/ _react['default'].createElement(_api.Marker, {
              animation: window.google && window.google.maps.Animation.DROP,
              draggable: mode === 'marker',
              onLoad: function onLoad(marker) {
                return setLoadedShape(marker);
              },
              onPositionChanged: onMarkerPositionChange,
              position: {
                lat: shape.lat,
                lng: shape.lng,
              },
            })
          : null
      )
    );
  }

  MapControls.propTypes = {
    entityName: _propTypes['default'].string,
    onBeforeRename: _propTypes['default'].func.isRequired,
    onDiscard: _propTypes['default'].func.isRequired,
    onUpdate: _propTypes['default'].func.isRequired,
  };
});
