'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _downshift = _interopRequireDefault(require('downshift'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireWildcard(require('react'));

var _deburr = _interopRequireDefault(require('lodash/deburr'));

var _core = require('@material-ui/core');

var _Close = _interopRequireDefault(require('@material-ui/icons/Close'));

var _grey = _interopRequireDefault(require('@material-ui/core/colors/grey'));

var _styles = require('@material-ui/core/styles');

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

function renderInput(inputProps) {
  var InputProps = inputProps.InputProps,
    classes = inputProps.classes,
    ref = inputProps.ref,
    other = _objectWithoutProperties(inputProps, [
      'InputProps',
      'classes',
      'ref',
    ]);

  return _react['default'].createElement(
    _core.TextField,
    _extends(
      {
        InputProps: _objectSpread(
          {
            inputRef: ref,
            classes: {
              root: classes.inputRoot,
              input: classes.inputInput,
            },
          },
          InputProps
        ),
      },
      other
    )
  );
}

function renderSuggestion(_ref, onSelect) {
  var suggestion = _ref.suggestion,
    index = _ref.index,
    itemProps = _ref.itemProps,
    highlightedIndex = _ref.highlightedIndex,
    selectedItem = _ref.selectedItem;
  var isHighlighted = highlightedIndex === index;
  var isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;
  return _react['default'].createElement(
    _core.MenuItem,
    _extends({}, itemProps, {
      key: suggestion.name,
      selected: isHighlighted,
      component: 'div',
      onClick: function onClick() {
        return onSelect(suggestion.name);
      },
      style: {
        fontWeight: isSelected ? 500 : 400,
      },
    }),
    suggestion.name
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: _propTypes['default'].number,
  index: _propTypes['default'].number,
  itemProps: _propTypes['default'].object,
  selectedItem: _propTypes['default'].string,
  suggestion: _propTypes['default'].shape({
    label: _propTypes['default'].string,
  }).isRequired,
};

function getSuggestions(value) {
  var suggestions =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var inputValue = (0, _deburr['default'])(value.trim()).toLowerCase();
  var inputLength = inputValue.length;
  var count = 0;
  return inputLength === 0
    ? []
    : suggestions.filter(function(suggestion) {
        var keep =
          count < 5 &&
          suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

var styles = function styles(theme) {
  return {
    container: {
      flexGrow: 1,
      position: 'relative',
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
    },
    inputRoot: {
      borderBottom: '1px solid '.concat(_grey['default'][200]),
      flexWrap: 'nowrap',
      fontSize: '13px',
      marginBottom: 0,
      marginTop: 0,
      paddingLeft: '12px',
      paddingRight: '12px',
    },
    inputInput: {
      width: 'auto',
      flexGrow: 1,
    },
    MenuHeading: {
      paddingBottom: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
    },
  };
};

var EntityNameField =
  /*#__PURE__*/
  (function(_Component) {
    _inherits(EntityNameField, _Component);

    function EntityNameField(props) {
      var _this;

      _classCallCheck(this, EntityNameField);

      _this = _possibleConstructorReturn(
        this,
        _getPrototypeOf(EntityNameField).call(this, props)
      );

      _defineProperty(_assertThisInitialized(_this), 'onChange', function(str) {
        _this.setState({
          name: str,
        });
      });

      _defineProperty(_assertThisInitialized(_this), 'onSubmit', function() {
        _this.props.onSubmit(_this.state.name);
      });

      _defineProperty(_assertThisInitialized(_this), 'onClickAway', function() {
        if (
          !_this.state.name ||
          _this.state.name.length === 0 ||
          _this.state.name === _this.props.name
        ) {
          _this.props.onCancel();
        } else {
          _this.onSubmit();
        }
      });

      _this.state = {
        name: _this.props.name,
      };
      return _this;
    }

    _createClass(EntityNameField, [
      {
        key: 'render',
        value: function render() {
          var _this2 = this;

          var _this$props = this.props,
            classes = _this$props.classes,
            name = _this$props.name,
            onCancel = _this$props.onCancel,
            suggestions = _this$props.suggestions;
          return _react['default'].createElement(
            _core.ClickAwayListener,
            {
              onClickAway: this.onClickAway,
            },
            _react['default'].createElement(
              _downshift['default'],
              {
                id: 'downshift-tags',
                onInputValueChange: function onInputValueChange(e) {
                  return _this2.onChange(e);
                },
              },
              function(_ref2) {
                var getInputProps = _ref2.getInputProps,
                  getItemProps = _ref2.getItemProps,
                  getMenuProps = _ref2.getMenuProps,
                  highlightedIndex = _ref2.highlightedIndex,
                  inputValue = _ref2.inputValue,
                  isOpen = _ref2.isOpen,
                  selectedItem = _ref2.selectedItem;
                return _react['default'].createElement(
                  'div',
                  {
                    className: classes.container,
                  },
                  renderInput({
                    classes: classes,
                    fullWidth: true,
                    autoFocus: true,
                    required: true,
                    onKeyPress: function onKeyPress(e) {
                      if (e.key === 'Enter') {
                        e.preventDefault();

                        _this2.onSubmit();
                      } else if (e.key === 'Escape') {
                        e.preventDefault();
                        onCancel();
                      }
                    },
                    InputProps: getInputProps({
                      placeholder:
                        name && name.length > 0 ? name : 'Enter new name…',
                      endAdornment: _react['default'].createElement(
                        _core.InputAdornment,
                        {
                          position: 'end',
                        },
                        _react['default'].createElement(
                          _core.Tooltip,
                          {
                            title: 'Cancel',
                          },
                          _react['default'].createElement(
                            _core.IconButton,
                            {
                              onClick: onCancel,
                            },
                            _react['default'].createElement(_Close['default'], {
                              fontSize: 'small',
                            })
                          )
                        )
                      ),
                    }),
                  }),
                  _react['default'].createElement(
                    'div',
                    getMenuProps(),
                    isOpen
                      ? _react['default'].createElement(
                          _core.Paper,
                          {
                            className: classes.paper,
                            square: true,
                          },
                          getSuggestions(inputValue, suggestions).length > 0
                            ? _react['default'].createElement(
                                _core.Typography,
                                {
                                  variant: 'caption',
                                  color: 'textSecondary',
                                  className: classes.MenuHeading,
                                },
                                'In this project:'
                              )
                            : null,
                          getSuggestions(inputValue, suggestions).map(function(
                            suggestion,
                            index
                          ) {
                            return renderSuggestion(
                              {
                                suggestion: suggestion,
                                index: index,
                                itemProps: getItemProps({
                                  item: suggestion.name,
                                }),
                                highlightedIndex: highlightedIndex,
                                selectedItem: selectedItem,
                              },
                              function(name) {
                                return _this2.props.onSubmit(name);
                              }
                            );
                          })
                        )
                      : null
                  )
                );
              }
            )
          );
        },
      },
    ]);

    return EntityNameField;
  })(_react.Component);

var _default = (0, _styles.withStyles)(styles)(EntityNameField);

exports['default'] = _default;
