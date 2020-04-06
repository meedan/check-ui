(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'material-ui-popup-state/HoverPopover',
      'prop-types',
      'react',
      'material-ui-popup-state/hooks',
      '@material-ui/icons/ArrowBack',
      '@material-ui/icons/ArrowForward',
      '@material-ui/core/IconButton',
      '@material-ui/core/Tooltip',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('material-ui-popup-state/HoverPopover'),
      require('prop-types'),
      require('react'),
      require('material-ui-popup-state/hooks'),
      require('@material-ui/icons/ArrowBack'),
      require('@material-ui/icons/ArrowForward'),
      require('@material-ui/core/IconButton'),
      require('@material-ui/core/Tooltip')
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
      global.ArrowBack,
      global.ArrowForward,
      global.IconButton,
      global.Tooltip
    );
    global.HandlePopover = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _HoverPopover,
  _propTypes,
  _react,
  _hooks,
  _ArrowBack,
  _ArrowForward,
  _IconButton,
  _Tooltip
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = HandlePopover;
  _HoverPopover = _interopRequireDefault(_HoverPopover);
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);
  _ArrowBack = _interopRequireDefault(_ArrowBack);
  _ArrowForward = _interopRequireDefault(_ArrowForward);
  _IconButton = _interopRequireDefault(_IconButton);
  _Tooltip = _interopRequireDefault(_Tooltip);

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

  function HandlePopover(_ref) {
    var id = _ref.id,
      moveBackward = _ref.moveBackward,
      moveForward = _ref.moveForward,
      popupState = _ref.popupState,
      props = _objectWithoutProperties(_ref, ['id', 'moveBackward', 'moveForward', 'popupState']);

    return /*#__PURE__*/ _react['default'].createElement(
      _HoverPopover['default'],
      _extends({}, (0, _hooks.bindPopover)(popupState), {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        id: id,
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      }),
      /*#__PURE__*/ _react['default'].createElement(
        _Tooltip['default'],
        {
          placement: 'bottom',
          title: 'Move backward',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _IconButton['default'],
          {
            onClick: function onClick(e) {
              e.stopPropagation();
              moveBackward();
            },
          },
          /*#__PURE__*/ _react['default'].createElement(_ArrowBack['default'], {
            fontSize: 'small',
          })
        )
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _Tooltip['default'],
        {
          placement: 'bottom',
          title: 'Move forward',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _IconButton['default'],
          {
            onClick: function onClick(e) {
              e.stopPropagation();
              moveForward();
            },
          },
          /*#__PURE__*/ _react['default'].createElement(_ArrowForward['default'], {
            fontSize: 'small',
          })
        )
      )
    );
  }

  HandlePopover.propTypes = {
    id: _propTypes['default'].string.isRequired,
    moveBackward: _propTypes['default'].func.isRequired,
    moveForward: _propTypes['default'].func.isRequired,
    popupState: _propTypes['default'].object.isRequired,
  };
});
