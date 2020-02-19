'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

require('rc-slider/assets/index.css');

var _react = _interopRequireWildcard(require('react'));

var _immer = _interopRequireDefault(require('immer'));

var _Add = _interopRequireDefault(require('@material-ui/icons/Add'));

var _IconButton = _interopRequireDefault(
  require('@material-ui/core/IconButton')
);

var _PlayArrow = _interopRequireDefault(
  require('@material-ui/icons/PlayArrow')
);

var _Tooltip = _interopRequireDefault(require('@material-ui/core/Tooltip'));

var _EntityControls = _interopRequireDefault(require('./EntityControls'));

var _Slider = _interopRequireDefault(require('../slider/Slider'));

var _TableBlock = _interopRequireDefault(require('../elements/TableBlock'));

var _TableSection = _interopRequireDefault(require('../elements/TableSection'));

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
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

// const FPS = 30;
function getName(entity, entityType) {
  return entity['project_'.concat(entityType)].name;
}

var Entities =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(Entities, _Component);

    function Entities() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Entities);

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(
        this,
        (_getPrototypeOf2 = _getPrototypeOf(Entities)).call.apply(
          _getPrototypeOf2,
          [this].concat(args)
        )
      );

      _defineProperty(_assertThisInitialized(_this), 'state', {});

      _defineProperty(_assertThisInitialized(_this), 'handlePlay', function() {
        console.log(_this.props.entityType);
        var start =
          _this.state.segments && _this.state.segments.length > 0
            ? _this.state.segments[0][1]
            : 0;

        _this.props.seekTo({
          seekTo: start,
          transport: _this.props.entityType,
        });

        _this.props.play({
          transport: _this.props.entityType,
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'handlePause', function() {
        _this.props.pause({
          transport: _this.props.entityType,
        });
      });

      _defineProperty(
        _assertThisInitialized(_this),
        'startNewInstance',
        function(id) {
          var currentTime = _this.props.currentTime;
          var entities = (0, _immer['default'])(_this.props.entities, function(
            nextEntities
          ) {
            var ti = nextEntities.findIndex(function(t) {
              return t.id === id;
            });
            var t = nextEntities[ti];
            var i = t.instances.find(function(i) {
              return (
                i.start_seconds <= currentTime && currentTime < i.end_seconds
              );
            });

            if (i) {
              console.log(
                'cannot make overlapping instances',
                currentTime,
                i.start_seconds,
                i.end_seconds
              );
            } else {
              t.instances.push({
                id: Date.now(),
                start_seconds: currentTime,
                end_seconds: currentTime + 30,
              });
            }
          });

          _this.props.update(
            _defineProperty({}, _this.props.entitiesyKey, entities)
          );
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'startNewEntity',
        function() {
          var _this$props = _this.props,
            currentTime = _this$props.currentTime,
            entityType = _this$props.entityType;
          var id = Date.now();

          var entityName = (function() {
            if (entityType === 'tag') {
              return {
                project_tag: {
                  name: '',
                },
              };
            } else if (entityType === 'location') {
              return {
                project_location: {
                  name: '',
                },
              };
            } else if (entityType === 'clip') {
              return {
                project_clip: {
                  name: '',
                },
              };
            }

            return null;
          })();

          var entities = (0, _immer['default'])(_this.props.entities, function(
            nextEntities
          ) {
            nextEntities.splice(
              0,
              0,
              _objectSpread({}, entityName, {
                id: id,
                isCreating: true,
                instances: [
                  {
                    id: Date.now(),
                    start_seconds: currentTime,
                    end_seconds: currentTime + 30,
                  },
                ],
              })
            );
          });

          _this.props.update(
            _defineProperty({}, _this.props.entitiesyKey, entities)
          );
        }
      );

      _defineProperty(
        _assertThisInitialized(_this),
        'stopNewEntity',
        function() {
          var entities = (0, _immer['default'])(_this.props.entities, function(
            nextEntities
          ) {
            nextEntities.splice(0, 1);
          });

          _this.props.update(
            _defineProperty({}, _this.props.entitiesyKey, entities)
          );
        }
      );

      _defineProperty(_assertThisInitialized(_this), 'deleteEntity', function(
        id
      ) {
        var entities = (0, _immer['default'])(_this.props.entities, function(
          nextEntities
        ) {
          var i = nextEntities.findIndex(function(t) {
            return t.id === id;
          });
          nextEntities.splice(i, 1);
        });

        _this.props.update(
          _defineProperty({}, _this.props.entitiesyKey, entities)
        );
      });

      _defineProperty(_assertThisInitialized(_this), 'updateEntity', function(
        id,
        name,
        payload
      ) {
        console.log(id, name, payload);
        var entityType = _this.props.entityType;
        var entities = (0, _immer['default'])(_this.props.entities, function(
          nextEntities
        ) {
          var i = nextEntities.findIndex(function(t) {
            return t.id === id;
          });
          nextEntities[i]['project_'.concat(entityType)].name = name;
          if (payload)
            nextEntities[i]['project_'.concat(entityType)] = _objectSpread(
              {},
              nextEntities[i]['project_'.concat(entityType)],
              {},
              payload
            );
          nextEntities[i]['project_'.concat(entityType)].name = name;
          delete nextEntities[i].isCreating;
        });

        _this.props.update(
          _defineProperty({}, _this.props.entitiesyKey, entities)
        );
      });

      _defineProperty(_assertThisInitialized(_this), 'deleteInstance', function(
        entityId,
        instanceId
      ) {
        var entities = (0, _immer['default'])(_this.props.entities, function(
          nextEntities
        ) {
          var ti = nextEntities.findIndex(function(t) {
            return t.id === entityId;
          });
          var ii = nextEntities[ti].instances.findIndex(function(i) {
            return i.id === instanceId;
          });
          nextEntities[ti].instances.splice(ii, 1);
        });

        _this.props.update(
          _defineProperty({}, _this.props.entitiesyKey, entities)
        );
      });

      _defineProperty(
        _assertThisInitialized(_this),
        'duplicateAsClip',
        function(entityId, instanceId) {
          var _this$props2 = _this.props,
            entities = _this$props2.entities,
            clips = _this$props2.clips,
            entityType = _this$props2.entityType;
          var entity = entities.find(function(entity) {
            return entity.id === entityId;
          });
          var instance = entity.instances.find(function(instance) {
            return instance.id === instanceId;
          });
          console.log(entity, instance);
          var videoClips = (0, _immer['default'])(clips, function(nextClips) {
            var clip = nextClips.find(function(c) {
              return c.project_clip.name === getName(entity, entityType);
            });

            if (!clip) {
              clip = {
                id: Date.now(),
                isCreating: false,
                instances: [
                  {
                    id: Date.now(),
                    start_seconds: instance.start_seconds,
                    end_seconds: instance.end_seconds,
                  },
                ],
                project_clip: {
                  name: getName(entity, entityType),
                },
              };
              console.log('new clip', clip);
              nextClips.splice(0, 0, clip);
            } else {
              console.log('existing clip', clip);
              var j = {
                id: Date.now(),
                start_seconds: instance.start_seconds,
                end_seconds: instance.end_seconds,
              };
              var overlappingInstance = clip.instances.find(function(i) {
                return (
                  (j.start_seconds <= i.start_seconds &&
                    i.start_seconds <= j.end_seconds) ||
                  (j.start_seconds <= i.end_seconds &&
                    i.end_seconds <= j.end_seconds) ||
                  (i.start_seconds <= j.start_seconds &&
                    j.start_seconds <= i.end_seconds) ||
                  (i.start_seconds <= j.end_seconds &&
                    j.end_seconds <= i.end_seconds)
                );
              });

              if (overlappingInstance) {
                overlappingInstance.start_seconds = Math.min(
                  overlappingInstance.start_seconds,
                  j.start_seconds
                );
                overlappingInstance.end_seconds = Math.max(
                  overlappingInstance.end_seconds,
                  j.end_seconds
                );
              } else {
                clip.instances.push(j);
              }
            }
          });

          _this.props.update({
            videoClips: videoClips,
          });
        }
      );

      _defineProperty(_assertThisInitialized(_this), 'updateInstance', function(
        entityId,
        instanceId,
        _ref
      ) {
        var start_seconds = _ref.start_seconds,
          end_seconds = _ref.end_seconds;
        console.log(
          (entityId,
          instanceId,
          {
            start_seconds: start_seconds,
            end_seconds: end_seconds,
          })
        );
        var entities = (0, _immer['default'])(_this.props.entities, function(
          nextEntities
        ) {
          var ti = nextEntities.findIndex(function(t) {
            return t.id === entityId;
          });
          var i = nextEntities[ti].instances.find(function(i) {
            return i.id === instanceId;
          });
          i.start_seconds = start_seconds;
          i.end_seconds = end_seconds;
        });

        _this.props.update(
          _defineProperty({}, _this.props.entitiesyKey, entities)
        );
      });

      return _this;
    }

    _createClass(
      Entities,
      [
        {
          key: 'shouldComponentUpdate',
          value: function shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.skip) return false;

            if (
              nextProps.currentTime !== this.props.currentTime &&
              this.props.transport === this.props.entityType
            ) {
              var segment = this.state.segments.find(function(_ref2) {
                var _ref3 = _slicedToArray(_ref2, 3),
                  i = _ref3[0],
                  s = _ref3[1],
                  e = _ref3[2];

                return s <= nextProps.currentTime && nextProps.currentTime < e;
              });

              if (!segment) {
                var nextSegment = this.state.segments.find(function(_ref4) {
                  var _ref5 = _slicedToArray(_ref4, 2),
                    i = _ref5[0],
                    s = _ref5[1];

                  return nextProps.currentTime < s;
                });

                if (nextSegment) {
                  this.props.seekTo({
                    seekTo: nextSegment[1],
                    transport: this.props.entityType,
                  });
                } else {
                  this.props.pause({
                    transport: null,
                  });
                }
              }
            } // if (
            //   nextProps.currentTime !== this.props.currentTime &&
            //   !this.state.playlist &&
            //   nextState === this.state
            // )
            //   return false;
            // TODO handle extenal video override, like end of video, buffering, etc

            return true;
          },
        },
        {
          key: 'render',
          value: function render() {
            var _this2 = this;

            var _this$props3 = this.props,
              entities = _this$props3.entities,
              duration = _this$props3.duration,
              suggestions = _this$props3.suggestions,
              entityType = _this$props3.entityType,
              transport = _this$props3.transport;

            var _ref6 = transport === entityType,
              playlist = _ref6.playlist; // console.group('ENTITIES');
            // console.log(this.props);
            // console.groupEnd();

            return _react['default'].createElement(
              _TableSection['default'],
              {
                plain: entities ? entities.length > 0 : false,
                title: this.props.title,
                actions: _react['default'].createElement(
                  _react['default'].Fragment,
                  null,
                  _react['default'].createElement(
                    _Tooltip['default'],
                    {
                      title: playlist
                        ? 'Pause'
                        : 'Play '.concat(this.props.title.toLowerCase()),
                    },
                    _react['default'].createElement(
                      'span',
                      null,
                      _react['default'].createElement(
                        _IconButton['default'],
                        {
                          disabled: entities.length < 1,
                          onClick: function onClick() {
                            return playlist
                              ? _this2.handlePause()
                              : _this2.handlePlay();
                          },
                        },
                        _react['default'].createElement(_PlayArrow['default'], {
                          fontSize: 'small',
                        })
                      )
                    )
                  ),
                  _react['default'].createElement(
                    _Tooltip['default'],
                    {
                      title: 'New\u2026',
                    },
                    _react['default'].createElement(
                      _IconButton['default'],
                      {
                        onClick: this.startNewEntity,
                      },
                      _react['default'].createElement(_Add['default'], {
                        fontSize: 'small',
                      })
                    )
                  )
                ),
              },
              entities
                ? entities.map(function(entity, i) {
                    var instances = entity.instances;
                    var arr = [];
                    Array.from(instances)
                      .sort(function(p, q) {
                        return p.start_seconds - q.start_seconds;
                      })
                      .map(function(instance) {
                        arr.push(instance.start_seconds);
                        arr.push(instance.end_seconds);
                        return null;
                      });
                    arr.sort(function(p, q) {
                      return p - q;
                    });
                    return _react['default'].createElement(
                      _TableBlock['default'],
                      {
                        key: entity.id,
                        plain: i < entities.length - 1,
                        leftColContent: _react['default'].createElement(
                          _EntityControls['default'],
                          {
                            deleteEntity: function deleteEntity() {
                              return _this2.deleteEntity(entity.id);
                            },
                            entityId: entity.id,
                            entityName: getName(entity, entityType),
                            entityType: entityType,
                            isCreating: entity.isCreating,
                            startNewInstance: function startNewInstance() {
                              return _this2.startNewInstance(entity.id);
                            },
                            stopNewEntity: _this2.stopNewEntity,
                            suggestions: suggestions,
                            updateEntity: function updateEntity(name, payload) {
                              return _this2.updateEntity(
                                entity.id,
                                name,
                                payload
                              );
                            },
                          }
                        ),
                        rightColContent: _react['default'].createElement(
                          _Slider['default'],
                          {
                            clipInstance:
                              entityType !== 'clip'
                                ? function(instanceId) {
                                    return _this2.duplicateAsClip(
                                      entity.id,
                                      instanceId
                                    );
                                  }
                                : null, // extendInstance={instanceId =>
                            //   this.extendInstance(entity.id, instanceId)
                            // }
                            duration: duration,
                            instances: instances,
                            updateInstance: function updateInstance(
                              instanceId,
                              payload
                            ) {
                              return _this2.updateInstance(
                                entity.id,
                                instanceId,
                                payload
                              );
                            },
                            deleteInstance: function deleteInstance(
                              instanceId
                            ) {
                              return _this2.deleteInstance(
                                entity.id,
                                instanceId
                              );
                            },
                            onDrag: function onDrag(newTime) {
                              return _this2.props.onChange(newTime);
                            },
                            onDragEnd: function onDragEnd(newTime) {
                              return _this2.props.onAfterChange(newTime);
                            },
                            onDragStart: function onDragStart(newTime) {
                              return _this2.props.onBeforeChange(newTime);
                            },
                          }
                        ),
                      }
                    );
                  })
                : null
            );
          },
        },
      ],
      [
        {
          key: 'getDerivedStateFromProps',
          value: function getDerivedStateFromProps(props, state) {
            var duration = props.duration,
              skip = props.skip,
              entityType = props.entityType,
              transport = props.transport;
            var entities = props.entities;
            if (skip) return null;
            var playlist = transport === entityType; // TODO: move this upstream
            // merge overlapping tag instances
            // entities.forEach(e => {
            //   e.isCreating = false;
            //   e.instances = e.instances
            //     .sort((j, i) => j.start_seconds - i.start_seconds)
            //     .reduce((acc = [], i) => {
            //       const j = acc.pop();
            //
            //       if (j) {
            //         if (
            //           j.start_seconds <= i.start_seconds &&
            //           i.start_seconds < j.end_seconds
            //         ) {
            //           j.start_seconds = Math.min(j.start_seconds, i.start_seconds);
            //           j.end_seconds = Math.max(j.end_seconds, i.end_seconds);
            //           acc.push(j);
            //           return acc;
            //         }
            //
            //         acc.push(j);
            //       }
            //
            //       return [...acc, i];
            //     }, []);
            // });

            var segments = recomputeSegments(entities, duration);
            return {
              segments: segments,
              playlist: playlist,
            };
          },
        },
      ]
    );

    return Entities;
  })(_react.Component);

var recomputeSegments = function recomputeSegments(entities, duration) {
  if (!entities) return [];
  var instances = entities
    .reduce(function(acc, t) {
      return [].concat(
        _toConsumableArray(acc),
        _toConsumableArray(t.instances)
      );
    }, [])
    .sort(function(j, i) {
      return j.start_seconds - i.start_seconds;
    });

  var events = _toConsumableArray(
    new Set(
      instances.reduce(
        function(acc, i) {
          return [].concat(_toConsumableArray(acc), [
            i.start_seconds,
            i.end_seconds,
          ]);
        },
        [0, duration]
      )
    )
  ).sort(function(j, i) {
    return j - i;
  });

  var segments = events
    .reduce(
      function(acc, e, i) {
        if (i === 0) return acc;
        return [].concat(_toConsumableArray(acc), [
          events[i - 1] + (events[i] - events[i - 1]) / 2,
        ]);
      },
      [0]
    )
    .reduce(function(acc, s, i) {
      return !!instances.find(function(j) {
        return j.start_seconds <= s && s < j.end_seconds;
      })
        ? [].concat(_toConsumableArray(acc), [i])
        : acc;
    }, [])
    .map(function(i) {
      return [i, events[i - 1], events[i]];
    });
  return segments;
};

var _default = Entities;
exports['default'] = _default;
