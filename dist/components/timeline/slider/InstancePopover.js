(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'material-ui-popup-state/HoverPopover',
      'prop-types',
      'react',
      'material-ui-popup-state/hooks',
      '@material-ui/icons/Delete',
      '@material-ui/core/IconButton',
      '@material-ui/core/Tooltip',
      '../../icons/Cut',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('material-ui-popup-state/HoverPopover'),
      require('prop-types'),
      require('react'),
      require('material-ui-popup-state/hooks'),
      require('@material-ui/icons/Delete'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/Tooltip'),
      require('../../icons/Cut')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.HoverPopover,
      global.propTypes,
      global.react,
      global.hooks,
      global.Delete,
      global.IconButton,
      global.Tooltip,
      global.Cut
    );
    global.InstancePopover = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _HoverPopover,
  _propTypes,
  _react,
  _hooks,
  _Delete,
  _IconButton,
  _Tooltip,
  _Cut
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = InstancePopover;
  _HoverPopover = _interopRequireDefault(_HoverPopover);
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);
  _Delete = _interopRequireDefault(_Delete);
  _IconButton = _interopRequireDefault(_IconButton);
  _Tooltip = _interopRequireDefault(_Tooltip);
  _Cut = _interopRequireDefault(_Cut);

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

  function InstancePopover(_ref) {
    var instance = _ref.instance,
      popupState = _ref.popupState,
      props = _objectWithoutProperties(_ref, ['instance', 'popupState']);

    var fireAction = function fireAction(fn, e) {
      e.stopPropagation();
      popupState.close();
      fn(instance.id);
    };

    return /*#__PURE__*/ _react['default'].createElement(
      _HoverPopover['default'],
      _extends({}, (0, _hooks.bindPopover)(popupState), {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        id: 'instancePopover',
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }),
      props.onInstanceClip
        ? /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: 'Copy to Clips',
            },
            /*#__PURE__*/ _react['default'].createElement(
              _IconButton['default'],
              {
                onClick: function onClick(e) {
                  return fireAction(props.onInstanceClip, e);
                },
              },
              /*#__PURE__*/ _react['default'].createElement(_Cut['default'], {
                fontSize: 'small',
              })
            )
          )
        : null,
      /*#__PURE__*/ _react['default'].createElement(
        _Tooltip['default'],
        {
          title: 'Delete',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _IconButton['default'],
          {
            onClick: function onClick(e) {
              return fireAction(props.onInstanceDelete, e);
            },
          },
          /*#__PURE__*/ _react['default'].createElement(_Delete['default'], {
            fontSize: 'small',
          })
        )
      )
    );
  }

  InstancePopover.propTypes = {
    onInstanceClip: _propTypes['default'].func,
    onInstanceDelete: _propTypes['default'].func.isRequired,
    instance: _propTypes['default'].object.isRequired,
    popupState: _propTypes['default'].object.isRequired,
  };
});
