'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _HoverPopover = _interopRequireDefault(
  require('material-ui-popup-state/HoverPopover')
);

var _materialUiPopupState = _interopRequireWildcard(
  require('material-ui-popup-state')
);

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireWildcard(require('react'));

var _styledComponents = _interopRequireDefault(require('styled-components'));

var _MoreVert = _interopRequireDefault(require('@material-ui/icons/MoreVert'));

var _core = require('@material-ui/core/');

var _styles = require('@material-ui/core/styles');

var _EntityDeleteModal = _interopRequireDefault(require('./EntityDeleteModal'));

var _EntityMapPopover = _interopRequireDefault(require('./EntityMapPopover'));

var _EntityNameField = _interopRequireDefault(require('./EntityNameField'));

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

function _templateObject2() {
  var data = _taggedTemplateLiteral([
    '\n  cursor: pointer;\n  width: 224px;\n  ',
    ';\n',
  ]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(['\n  visibility: hidden;\n']);

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

var styles = {
  Grid: {
    marginLeft: '12px',
    marginRight: '12px',
    width: '200px',
  },
  Typography: {
    maxWidth: '160px',
  },
  CircularProgress: {
    position: 'relative',
    left: '-8px',
  },
};

var ElementAdornment = _styledComponents['default'].div(_templateObject());

var Element = _styledComponents['default'].div(_templateObject2(), function(
  _ref
) {
  var hasAdornment = _ref.hasAdornment;
  return hasAdornment
    ? '\n    '.concat(
        ElementAdornment,
        ' {\n      visibility: visible;\n    }\n  '
      )
    : '';
});

var EntityControls =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(EntityControls, _Component);

    function EntityControls(props) {
      var _this;

      _classCallCheck(this, EntityControls);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(EntityControls).call(this, props)
      );

      _defineProperty(_assertThisInitialized(_this), 'startHover', function() {
        var flow = _this.state.flow;
        if (flow) return null;

        _this.setState({
          flow: 'hover',
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'startRename', function() {
        _this.setState({
          flow: 'edit',
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'startDelete', function() {
        _this.setState({
          flow: 'delete',
        });
      });

      _defineProperty(
        _assertThisInitialized(_this),
        'startReposition',
        function() {
          _this.setState({
            flow: 'reposition',
          });
        }
      );

      _defineProperty(_assertThisInitialized(_this), 'stop', function() {
        _this.setState({
          flow: null,
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'onReposition', function(
        marker
      ) {
        _this.setState({
          marker: marker,
        });

        console.log(
          'updateEntity reposition',
          _this.props.entityName,
          _this.state.marker
        );

        _this.props.updateEntity(_this.props.entityName, marker);
      });

      _defineProperty(_assertThisInitialized(_this), 'onRename', function(
        name
      ) {
        _this.setState(
          {
            flow: 'processing',
          },
          function() {
            var _this$props = _this.props,
              entityType = _this$props.entityType,
              isCreating = _this$props.isCreating;
            console.log('updateEntity rename', name, _this.state.marker);

            _this.props.updateEntity(name);

            console.log('onRename()', {
              isCreating: isCreating,
            });

            if (isCreating && entityType === 'location') {
              _this.startReposition();
            } else {
              setTimeout(function() {
                return _this.setState({
                  flow: null,
                });
              }, 1000);
            }
          }
        );
      });

      _defineProperty(_assertThisInitialized(_this), 'onUpdate', function(
        name
      ) {
        _this.setState({
          flow: 'processing',
        });

        console.log('updateEntity', name, _this.state.marker);

        _this.props.updateEntity(name, _this.state.marker);

        setTimeout(function() {
          return _this.setState({
            flow: null,
          });
        }, 1000);
      });

      _defineProperty(_assertThisInitialized(_this), 'onDelete', function(
        name
      ) {
        _this.setState({
          flow: 'processing',
        });

        setTimeout(function() {
          _this.props.deleteEntity();

          _this.setState({
            flow: null,
          });
        }, 1000);
      });

      _this.state = {
        flow: null,
      };
      if (_this.props.entityType === 'location')
        _this.anchorRef = _react['default'].createRef();
      return _this;
    }

    _createClass(EntityControls, [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.setState({
            flow: this.props.isCreating ? 'edit' : null,
          });
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _this$props2 = this.props,
            classes = _this$props2.classes,
            entityId = _this$props2.entityId,
            entityName = _this$props2.entityName,
            entityType = _this$props2.entityType,
            isCreating = _this$props2.isCreating,
            startNewInstance = _this$props2.startNewInstance,
            stopNewEntity = _this$props2.stopNewEntity,
            suggestions = _this$props2.suggestions;
          var allowNewInstance =
            this.state.flow !== 'edit' && this.state.flow !== 'processing'; // console.group('EntityControls');
          // console.log('state', this.state);
          // console.log('props', this.props);
          // console.groupEnd();

          var read = _react['default'].createElement(
            _core.Grid,
            {
              alignItems: 'center',
              className: classes.Grid,
              container: true,
              justify: 'space-between',
              wrap: 'nowrap',
            },
            _react['default'].createElement(
              _core.Grid,
              {
                item: true,
              },
              entityName
                ? _react['default'].createElement(
                    _core.Tooltip,
                    {
                      title: entityName,
                      enterDelay: 750,
                    },
                    _react['default'].createElement(
                      _core.Typography,
                      {
                        className: classes.Typography,
                        color:
                          this.state.flow === 'reposition'
                            ? 'primary'
                            : 'textSecondary',
                        noWrap: true,
                        variant: 'body2',
                      },
                      entityName
                    )
                  )
                : _react['default'].createElement(
                    _core.Typography,
                    {
                      className: classes.Typography,
                      color:
                        this.state.flow === 'reposition'
                          ? 'primary'
                          : 'textSecondary',
                      noWrap: true,
                      variant: 'body2',
                    },
                    entityName
                  )
            ),
            _react['default'].createElement(
              _core.Grid,
              {
                item: true,
              },
              _react['default'].createElement(
                ElementAdornment,
                {
                  onClick: function onClick(e) {
                    return e.stopPropagation();
                  },
                },
                this.state.flow === 'processing'
                  ? _react['default'].createElement(_core.CircularProgress, {
                      size: 18,
                      className: classes.CircularProgress,
                    })
                  : _react['default'].createElement(
                      _materialUiPopupState['default'],
                      {
                        variant: 'popover',
                        popupId: 'moreEntityControls',
                      },
                      function(popupState) {
                        return _react['default'].createElement(
                          'div',
                          null,
                          _react['default'].createElement(
                            _core.IconButton,
                            _extends(
                              {},
                              (0, _materialUiPopupState.bindHover)(popupState),
                              {
                                'aria-label': 'Options\u2026',
                              }
                            ),
                            _react['default'].createElement(
                              _MoreVert['default'],
                              null
                            )
                          ),
                          _react['default'].createElement(
                            _HoverPopover['default'],
                            _extends(
                              {},
                              (0, _materialUiPopupState.bindPopover)(
                                popupState
                              ),
                              {
                                anchorOrigin: {
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                },
                                transformOrigin: {
                                  vertical: 'top',
                                  horizontal: 'center',
                                },
                                disableRestoreFocus: true,
                              }
                            ),
                            _react['default'].createElement(
                              _core.List,
                              {
                                dense: true,
                                onClick: popupState.close,
                              },
                              _react['default'].createElement(
                                _core.ListItem,
                                {
                                  button: true,
                                  onClick: function onClick() {
                                    return _this2.startRename();
                                  },
                                },
                                _react['default'].createElement(
                                  _core.ListItemText,
                                  null,
                                  'Rename'
                                )
                              ),
                              entityType === 'location'
                                ? _react['default'].createElement(
                                    _core.ListItem,
                                    {
                                      button: true,
                                      onClick: function onClick() {
                                        return _this2.startReposition();
                                      },
                                    },
                                    _react['default'].createElement(
                                      _core.ListItemText,
                                      null,
                                      'Reposition'
                                    )
                                  )
                                : null,
                              _react['default'].createElement(
                                _core.ListItem,
                                {
                                  button: true,
                                  onClick: function onClick() {
                                    return _this2.startDelete();
                                  },
                                },
                                _react['default'].createElement(
                                  _core.ListItemText,
                                  null,
                                  'Delete'
                                )
                              )
                            )
                          )
                        );
                      }
                    )
              )
            )
          );

          var edit = _react['default'].createElement(
            _EntityNameField['default'],
            {
              name: entityName,
              onCancel: isCreating ? stopNewEntity : this.stop,
              onSubmit: this.onRename,
              suggestions: suggestions,
            }
          );

          return _react['default'].createElement(
            Element,
            {
              hasAdornment:
                this.state.flow &&
                this.state.flow !== 'reposition' &&
                this.state.flow !== 'delete',
              onClick: allowNewInstance ? startNewInstance : null,
              onMouseEnter: this.startHover,
              onMouseLeave: this.state.flow === 'hover' ? this.stop : null,
              ref: this.anchorRef,
            },
            this.state.flow !== 'edit' ? read : edit,
            this.state.flow === 'reposition'
              ? _react['default'].createElement(_EntityMapPopover['default'], {
                  anchorRef: this.anchorRef.current,
                  marker: this.state.marker,
                  isCreating: isCreating,
                  onClose: this.stop,
                  onSave: function onSave(marker) {
                    return _this2.onReposition(marker);
                  },
                  placeId: entityId,
                  placeName: entityName,
                  startPlaceRename: this.startRename,
                  stopNewPlace: stopNewEntity,
                })
              : null,
            this.state.flow === 'delete'
              ? _react['default'].createElement(_EntityDeleteModal['default'], {
                  name: entityName,
                  onCancel: this.stop,
                  onConfirm: this.onDelete,
                  title: 'Delete '.concat(entityType),
                })
              : null
          );
        },
      },
    ]);

    return EntityControls;
  })(_react.Component);

EntityControls.propTypes = {
  classes: _propTypes['default'].object,
  entityId: _propTypes['default'].number,
  entityName: _propTypes['default'].string,
  entityType: _propTypes['default'].string,
  isCreating: _propTypes['default'].string,
  startNewInstance: _propTypes['default'].func,
  stopNewEntity: _propTypes['default'].func,
  suggestions: _propTypes['default'].array,
};
EntityControls.defaultProps = {};

var _default = (0, _styles.withStyles)(styles)(EntityControls);

exports['default'] = _default;
