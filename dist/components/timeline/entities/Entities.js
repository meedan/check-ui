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
      'react',
      'prop-types',
      '@material-ui/icons/Add',
      '@material-ui/core/IconButton',
      '@material-ui/icons/PlayArrow',
      '@material-ui/core/Tooltip',
      './Controls',
      '../slider/Slider',
      '../elements/TableBlock',
      '../elements/TableSection',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('react'),
      require('prop-types'),
      require('@material-ui/icons/Add'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/icons/PlayArrow'),
      require('@material-ui/core/Tooltip'),
      require('./Controls'),
      require('../slider/Slider'),
      require('../elements/TableBlock'),
      require('../elements/TableSection')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.react,
      global.propTypes,
      global.Add,
      global.IconButton,
      global.PlayArrow,
      global.Tooltip,
      global.Controls,
      global.Slider,
      global.TableBlock,
      global.TableSection
    );
    global.Entities = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _react,
  _propTypes,
  _Add,
  _IconButton,
  _PlayArrow,
  _Tooltip,
  _Controls,
  _Slider,
  _TableBlock,
  _TableSection
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Entities;
  _react = _interopRequireWildcard(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _Add = _interopRequireDefault(_Add);
  _IconButton = _interopRequireDefault(_IconButton);
  _PlayArrow = _interopRequireDefault(_PlayArrow);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _Controls = _interopRequireDefault(_Controls);
  _Slider = _interopRequireDefault(_Slider);
  _TableBlock = _interopRequireDefault(_TableBlock);
  _TableSection = _interopRequireDefault(_TableSection);

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

  function Entities(_ref) {
    var _ref$currentTime = _ref.currentTime,
      currentTime = _ref$currentTime === void 0 ? 0 : _ref$currentTime,
      duration = _ref.duration,
      _ref$entities = _ref.entities,
      entities = _ref$entities === void 0 ? [] : _ref$entities,
      _ref$suggestions = _ref.suggestions,
      suggestions = _ref$suggestions === void 0 ? [] : _ref$suggestions,
      type = _ref.type,
      props = _objectWithoutProperties(_ref, ['currentTime', 'duration', 'entities', 'suggestions', 'type']);

    var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      newEntity = _useState2[0],
      setNewEntity = _useState2[1];

    var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      newInstance = _useState4[0],
      setNewInstance = _useState4[1];

    var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      sliderRect = _useState6[0],
      setSliderRect = _useState6[1];

    var displayEntities = newEntity ? [newEntity].concat(_toConsumableArray(entities)) : entities;
    var titles = {
      clips: 'Clips',
      places: 'Places',
      tags: 'Tags',
    };
    var types = {
      clips: 'clip',
      places: 'place',
      tags: 'tag',
    };

    var onEntityStart = function onEntityStart() {
      var _newEntity;

      // construct a new dummy entity
      var newEntity =
        ((_newEntity = {
          id: Date.now(),
        }),
        _defineProperty(_newEntity, 'project_'.concat(types[type]), {
          name: '',
        }),
        _defineProperty(_newEntity, 'isLocal', true),
        _newEntity);
      setNewEntity(newEntity);
    };

    var onEntityCreate = function onEntityCreate(payload, callback) {
      var newEntity = _defineProperty(
        {
          id: Date.now(),
        },
        'project_'.concat(types[type]),
        {
          name: payload,
        }
      );

      props.onEntityCreate(types[type], newEntity, function () {
        setNewEntity(null);
        callback();
      });
    };

    var onEntityStop = function onEntityStop() {
      setNewEntity(null);
    }; // entity methods

    var _onEntityUpdate = function onEntityUpdate(entityId, payload, callback) {
      props.onEntityUpdate(types[type], entityId, payload, callback);
    };

    var _onEntityDelete = function onEntityDelete(entityId, callback) {
      props.onEntityDelete(types[type], entityId, callback);
    }; // instance methods

    var _onInstanceCreate = function onInstanceCreate(entityId, payload) {
      setNewInstance(
        _objectSpread({}, payload, {
          id: Date.now() + Math.random(),
          isLocal: true,
        })
      );
      props.onInstanceCreate(types[type], entityId, payload, function () {
        return setNewInstance(null);
      });
    };

    var _onInstanceClip = function onInstanceClip(entityId, instanceId) {
      if (!props.onInstanceClip) return null;
      props.onInstanceClip(types[type], entityId, instanceId);
    };

    var _onInstanceDelete = function onInstanceDelete(entityId, instanceId) {
      props.onInstanceDelete(types[type], entityId, instanceId);
    };

    var _onInstanceUpdate = function onInstanceUpdate(entityId, instanceId, payload) {
      props.onInstanceUpdate(types[type], entityId, instanceId, payload);
    }; // console.group('Entities');
    // console.log({ props });
    // console.log({ newEntity });
    // console.log({ displayEntities });
    // console.groupEnd();

    return /*#__PURE__*/ _react['default'].createElement(
      _TableSection['default'],
      {
        plain: displayEntities.length > 0,
        title: titles[type],
        actions: /*#__PURE__*/ _react['default'].createElement(
          _react['default'].Fragment,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: 'Play all',
            },
            /*#__PURE__*/ _react['default'].createElement(
              _IconButton['default'],
              {
                onClick: props.onPlaylistLaunch,
              },
              /*#__PURE__*/ _react['default'].createElement(_PlayArrow['default'], {
                fontSize: 'small',
              })
            )
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: 'New\u2026',
            },
            /*#__PURE__*/ _react['default'].createElement(
              _IconButton['default'],
              {
                onClick: onEntityStart,
              },
              /*#__PURE__*/ _react['default'].createElement(_Add['default'], {
                fontSize: 'small',
              })
            )
          )
        ),
      },
      displayEntities.map(function (_ref2, i) {
        var _ref2$instances = _ref2.instances,
          instances = _ref2$instances === void 0 ? [] : _ref2$instances,
          _ref2$isLocal = _ref2.isLocal,
          isLocal = _ref2$isLocal === void 0 ? false : _ref2$isLocal,
          entity = _objectWithoutProperties(_ref2, ['instances', 'isLocal']);

        var entityId = entity.id;
        var entityName = entity['project_'.concat(types[type])].name;
        var entityType = types[type];
        var isLastChild = i === displayEntities.length - 1;
        var entityShape = {
          lat: entity.lat,
          lng: entity.lng,
          polygon: entity.polygon,
          type: entity.type,
          viewport: entity.viewport,
          zoom: entity.zoom,
        };
        return /*#__PURE__*/ _react['default'].createElement(_TableBlock['default'], {
          key: entityId,
          leftColContent: /*#__PURE__*/ _react['default'].createElement(_Controls['default'], {
            currentTime: currentTime,
            duration: duration,
            entityName: entityName,
            entityShape: entityType === 'place' ? entityShape : null,
            entityType: entityType,
            instances: instances,
            isLocal: isLocal,
            onEntityCreate: onEntityCreate,
            onEntityDelete: function onEntityDelete(callback) {
              return _onEntityDelete(entityId, callback);
            },
            onEntityStop: onEntityStop,
            onEntityUpdate: function onEntityUpdate(payload, callback) {
              return _onEntityUpdate(entityId, payload, callback);
            },
            onInstanceCreate: function onInstanceCreate(payload) {
              return _onInstanceCreate(entityId, payload);
            },
            sliderRect: sliderRect,
            suggestions: suggestions,
          }),
          plain: !isLastChild,
          rightColContent: /*#__PURE__*/ _react['default'].createElement(_Slider['default'], {
            duration: duration,
            instances: newInstance ? [].concat(_toConsumableArray(instances), [newInstance]) : instances,
            onDrag: props.onTimeChange,
            onDragEnd: props.onAfterChange,
            onDragStart: props.onBeforeChange,
            onInstanceClip: function onInstanceClip(instanceId) {
              return _onInstanceClip(entityId, instanceId);
            },
            onInstanceDelete: function onInstanceDelete(instanceId) {
              return _onInstanceDelete(entityId, instanceId);
            },
            onInstanceUpdate: function onInstanceUpdate(instanceId, payload) {
              return _onInstanceUpdate(entityId, instanceId, payload);
            },
            returnSliderRect: function returnSliderRect(rect) {
              return setSliderRect(rect);
            },
          }),
        });
      })
    );
  }

  Entities.propTypes = {
    currentTime: _propTypes['default'].number,
    duration: _propTypes['default'].number.isRequired,
    entities: _propTypes['default'].arrayOf(
      _propTypes['default'].shape({
        instances: _propTypes['default'].array,
        id: _propTypes['default'].number,
      })
    ),
    onAfterChange: _propTypes['default'].func.isRequired,
    onBeforeChange: _propTypes['default'].func.isRequired,
    onEntityCreate: _propTypes['default'].func.isRequired,
    onEntityDelete: _propTypes['default'].func.isRequired,
    onEntityUpdate: _propTypes['default'].func.isRequired,
    onInstanceClip: _propTypes['default'].func,
    onInstanceCreate: _propTypes['default'].func.isRequired,
    onInstanceDelete: _propTypes['default'].func.isRequired,
    onInstanceUpdate: _propTypes['default'].func.isRequired,
    onPlaylistLaunch: _propTypes['default'].func.isRequired,
    onTimeChange: _propTypes['default'].func.isRequired,
    suggestions: _propTypes['default'].array,
    type: _propTypes['default'].string.isRequired,
  };
});
