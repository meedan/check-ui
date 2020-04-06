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
      'material-ui-popup-state/HoverMenu',
      'prop-types',
      'react',
      'lodash/find',
      'material-ui-popup-state/hooks',
      '@material-ui/core/CircularProgress',
      '@material-ui/core/Grid',
      '@material-ui/core/IconButton',
      '@material-ui/core/MenuItem',
      '@material-ui/icons/MoreVert',
      '@material-ui/core/Tooltip',
      '@material-ui/core/Typography',
      '@material-ui/core/styles/makeStyles',
      '@material-ui/core/Popover',
      './DeleteModal',
      './MapControls',
      './NameField',
      '../utils/config',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('material-ui-popup-state/HoverMenu'),
      require('prop-types'),
      require('react'),
      require('lodash/find'),
      require('material-ui-popup-state/hooks'),
      require('@material-ui/core/CircularProgress'),
      require('@material-ui/core/Grid'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/MenuItem'),
      require('@material-ui/icons/MoreVert'),
      require('@material-ui/core/Tooltip'),
      require('@material-ui/core/Typography'),
      require('@material-ui/core/styles/makeStyles'),
      require('@material-ui/core/Popover'),
      require('./DeleteModal'),
      require('./MapControls'),
      require('./NameField'),
      require('../utils/config')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.HoverMenu,
      global.propTypes,
      global.react,
      global.find,
      global.hooks,
      global.CircularProgress,
      global.Grid,
      global.IconButton,
      global.MenuItem,
      global.MoreVert,
      global.Tooltip,
      global.Typography,
      global.makeStyles,
      global.Popover,
      global.DeleteModal,
      global.MapControls,
      global.NameField,
      global.config
    );
    global.Controls = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _HoverMenu,
  _propTypes,
  _react,
  _find,
  _hooks,
  _CircularProgress,
  _Grid,
  _IconButton,
  _MenuItem,
  _MoreVert,
  _Tooltip,
  _Typography,
  _makeStyles,
  _Popover,
  _DeleteModal,
  _MapControls,
  _NameField,
  _config
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Controls;
  _HoverMenu = _interopRequireDefault(_HoverMenu);
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireWildcard(_react);
  _find = _interopRequireDefault(_find);
  _CircularProgress = _interopRequireDefault(_CircularProgress);
  _Grid = _interopRequireDefault(_Grid);
  _IconButton = _interopRequireDefault(_IconButton);
  _MenuItem = _interopRequireDefault(_MenuItem);
  _MoreVert = _interopRequireDefault(_MoreVert);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _Typography = _interopRequireDefault(_Typography);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _Popover = _interopRequireDefault(_Popover);
  _DeleteModal = _interopRequireDefault(_DeleteModal);
  _MapControls = _interopRequireDefault(_MapControls);
  _NameField = _interopRequireDefault(_NameField);
  _config = _interopRequireDefault(_config);

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
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
      controlsRoot: {
        cursor: 'pointer',
        width: ''.concat(_config['default'].TIMELINE_OFFSET, 'px'),
      },
      readGrid: {
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
        width: ''.concat(_config['default'].TIMELINE_OFFSET - theme.spacing(3), 'px'),
      },
      entityName: {
        maxWidth: ''.concat(_config['default'].TIMELINE_OFFSET - theme.spacing(8), 'px'),
      },
      circularProgress: {
        left: ''.concat(theme.spacing(1) * -1, 'px'),
        top: ''.concat(theme.spacing(0.5), 'px'),
        position: 'relative',
      },
    };
  });

  function Controls(_ref) {
    var _ref$currentTime = _ref.currentTime,
      currentTime = _ref$currentTime === void 0 ? 0 : _ref$currentTime,
      duration = _ref.duration,
      entityShape = _ref.entityShape,
      entityName = _ref.entityName,
      entityType = _ref.entityType,
      _ref$instances = _ref.instances,
      instances = _ref$instances === void 0 ? [] : _ref$instances,
      _ref$isLocal = _ref.isLocal,
      isLocal = _ref$isLocal === void 0 ? false : _ref$isLocal,
      sliderRect = _ref.sliderRect,
      _ref$suggestions = _ref.suggestions,
      suggestions = _ref$suggestions === void 0 ? [] : _ref$suggestions,
      props = _objectWithoutProperties(_ref, [
        'currentTime',
        'duration',
        'entityShape',
        'entityName',
        'entityType',
        'instances',
        'isLocal',
        'sliderRect',
        'suggestions',
      ]);

    var classes = useStyles();
    var controlsRoot = (0, _react.useRef)();

    var _useState = (0, _react.useState)(isLocal ? 'edit' : 'read'),
      _useState2 = _slicedToArray(_useState, 2),
      mode = _useState2[0],
      setMode = _useState2[1];

    var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      newEntityName = _useState4[0],
      setNewEntityName = _useState4[1];

    var morePopupState = (0, _hooks.usePopupState)({
      variant: 'popover',
      popupId: 'moreMenu',
    });
    var mapPopupState = (0, _hooks.usePopupState)({
      variant: 'popover',
      popupId: 'MapControls',
    });
    var displayEntityName = mode === 'processing' && newEntityName ? newEntityName : entityName; // mode methods

    var onMouseEnter = function onMouseEnter() {
      if (mode === 'read') setMode('hovering');
    };

    var onMouseLeave = function onMouseLeave() {
      if (mode === 'hovering') setMode('read');
    };

    var onModeReset = function onModeReset() {
      morePopupState.close();
      setMode('read');
      setNewEntityName(null);
      if (isLocal) props.onEntityStop();
    }; // entity methods

    var onEntityCreate = function onEntityCreate(str) {
      setNewEntityName(str);
      setMode('processing');
      props.onEntityCreate(str, function () {
        onModeReset(); // the following is unlikely to trigger in the docs as map popover requires a mounted component to anchor to—we’re removing the new entity node with the callback. the if here is to avoid a react warning — Apr 3, 2020 @piotr

        if (entityType === 'place' && mapPopupState) mapPopupState.open();
      });
    };

    var onEntityUpdateStart = function onEntityUpdateStart() {
      setMode('edit');
      morePopupState.close();
    };

    var onEntityDeleteStart = function onEntityDeleteStart() {
      setMode('delete');
    };

    var onEntityDelete = function onEntityDelete() {
      setNewEntityName(entityName);
      setMode('processing');
      props.onEntityDelete(onModeReset);
    };

    var onEntityRename = function onEntityRename(str) {
      setNewEntityName(str);
      setMode('processing');
      props.onEntityUpdate(
        _defineProperty({}, 'project_'.concat(entityType), {
          name: str,
        }),
        onModeReset
      );
    };

    var onUpdateShape = function onUpdateShape(payload) {
      setMode('processing');
      mapPopupState.close();
      props.onEntityUpdate(payload, onModeReset);
    }; // instance methods

    var onInstanceCreate = function onInstanceCreate() {
      // prevent instance creation when editing or processing
      if (['edit', 'processing'].includes(mode)) return null; // prevent instance creation if no sliderRect found

      if (!sliderRect) return null; // prevent instance creation if currentTime is within range of an already existing instance

      var fn = function fn(o) {
        return currentTime >= o.start_seconds && currentTime <= o.end_seconds;
      };

      if (
        (0, _find['default'])(instances, function (o) {
          return fn(o);
        })
      )
        return null; // get new instance time duration assuming it’s 16px-wide

      var newDuration = (16 * duration) / sliderRect.width; // get new end_seconds value based on currentTime

      var newEnd = currentTime + newDuration; // get max possible start_seconds value given the above

      var maxStart = duration - newDuration; // construct a new instance

      var newInstance = {
        start_seconds: currentTime <= maxStart ? currentTime : maxStart,
        end_seconds: newEnd <= duration ? newEnd : duration,
      }; // TODO: add support for processing state w/ parent callback

      props.onInstanceCreate(newInstance);
    }; // map/place methods
    // TODO: bring in map bits

    var onStartEntityReposition = function onStartEntityReposition() {
      console.log('onStartEntityReposition');
      morePopupState.close();
      mapPopupState.open(); // setMode('reposition');
    };

    var readControls = /*#__PURE__*/ _react['default'].createElement(
      _Grid['default'],
      {
        alignItems: 'center',
        className: classes.readGrid,
        container: true,
        justify: 'space-between',
        wrap: 'nowrap',
      },
      /*#__PURE__*/ _react['default'].createElement(
        _Grid['default'],
        {
          item: true,
        },
        /*#__PURE__*/ _react['default'].createElement(
          _Tooltip['default'],
          {
            enterDelay: 1000,
            title: 'Annotate: '.concat(displayEntityName),
          },
          /*#__PURE__*/ _react['default'].createElement(
            _Typography['default'],
            {
              noWrap: true,
              variant: 'body2',
              className: classes.entityName,
            },
            displayEntityName
          )
        )
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _Grid['default'],
        {
          item: true,
        },
        /*#__PURE__*/ _react['default'].createElement(
          'div',
          {
            style: {
              visibility: ['hovering', 'processing'].includes(mode) ? 'visible' : 'hidden',
            },
            onClick: function onClick(e) {
              return e.stopPropagation();
            },
          },
          mode === 'processing'
            ? /*#__PURE__*/ _react['default'].createElement(_CircularProgress['default'], {
                size: 18,
                className: classes.circularProgress,
              })
            : /*#__PURE__*/ _react['default'].createElement(
                _react['default'].Fragment,
                null,
                /*#__PURE__*/ _react['default'].createElement(
                  _IconButton['default'],
                  _extends({}, (0, _hooks.bindHover)(morePopupState), {
                    'aria-label': 'More options\u2026',
                  }),
                  /*#__PURE__*/ _react['default'].createElement(_MoreVert['default'], null)
                ),
                /*#__PURE__*/ _react['default'].createElement(
                  _HoverMenu['default'],
                  _extends({}, (0, _hooks.bindMenu)(morePopupState), {
                    autoFocus: false,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                    },
                    disableRestoreFocus: true,
                    getContentAnchorEl: null,
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'center',
                    },
                    varant: 'menu',
                  }),
                  /*#__PURE__*/ _react['default'].createElement(
                    _MenuItem['default'],
                    {
                      dense: true,
                      divider: entityType === 'place',
                      onClick: onInstanceCreate,
                    },
                    'Add highlight'
                  ),
                  entityType === 'place'
                    ? /*#__PURE__*/ _react['default'].createElement(
                        _MenuItem['default'],
                        {
                          dense: true,
                          onClick: onStartEntityReposition,
                        },
                        'Edit place'
                      )
                    : null,
                  /*#__PURE__*/ _react['default'].createElement(
                    _MenuItem['default'],
                    {
                      dense: true,
                      divider: entityType === 'place',
                      onClick: onEntityUpdateStart,
                    },
                    'Edit name'
                  ),
                  /*#__PURE__*/ _react['default'].createElement(
                    _MenuItem['default'],
                    {
                      dense: true,
                      onClick: onEntityDeleteStart,
                    },
                    'Delete'
                  )
                )
              )
        )
      )
    );

    var editControls = /*#__PURE__*/ _react['default'].createElement(_NameField['default'], {
      entityName: displayEntityName,
      entityType: entityType,
      onCancel: onModeReset,
      onSubmit: isLocal ? onEntityCreate : onEntityRename,
      suggestions: suggestions,
    }); // console.group('Controls');
    // console.log({ props });
    // console.groupEnd();

    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: classes.controlsRoot,
        onClick: onInstanceCreate,
        onMouseEnter: mode === 'read' ? onMouseEnter : null,
        onMouseLeave: onMouseLeave,
        ref: controlsRoot,
      },
      mode === 'edit' ? editControls : readControls,
      /*#__PURE__*/ _react['default'].createElement(
        _Popover['default'],
        _extends({}, (0, _hooks.bindPopover)(mapPopupState), {
          anchorEl: controlsRoot.current,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          onClick: function onClick(e) {
            return e.stopPropagation();
          },
        }),
        /*#__PURE__*/ _react['default'].createElement(_MapControls['default'], {
          entityShape: entityShape,
          entityName: entityName,
          mode: entityShape ? entityShape.type : null,
          onBeforeRename: function onBeforeRename(payload) {
            setMode('edit');
            mapPopupState.close();
            console.log('Controls.js onBeforeRename', payload);
          },
          onDiscard: function onDiscard() {
            setMode('read');
            mapPopupState.close();
          },
          onUpdate: function onUpdate(payload) {
            return onUpdateShape(payload);
          },
        })
      ),
      mode === 'delete' && !isLocal
        ? /*#__PURE__*/ _react['default'].createElement(_DeleteModal['default'], {
            entityName: displayEntityName,
            entityType: entityType,
            onCancel: onModeReset,
            onConfirm: onEntityDelete,
          })
        : null
    );
  }

  Controls.propTypes = {
    currentTime: _propTypes['default'].number.isRequired,
    duration: _propTypes['default'].number.isRequired,
    entityName: _propTypes['default'].string,
    entityShape: _propTypes['default'].object,
    entityType: _propTypes['default'].string.isRequired,
    instances: _propTypes['default'].array,
    isLocal: _propTypes['default'].bool,
    onEntityDelete: _propTypes['default'].func.isRequired,
    onEntityStop: _propTypes['default'].func.isRequired,
    onEntityUpdate: _propTypes['default'].func.isRequired,
    onInstanceCreate: _propTypes['default'].func.isRequired,
    suggestions: _propTypes['default'].array,
    sliderRect: _propTypes['default'].shape({
      width: _propTypes['default'].number,
    }),
  };
});
