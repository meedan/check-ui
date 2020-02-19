'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = InstancePopover;

var _HoverPopover = _interopRequireDefault(
  require('material-ui-popup-state/HoverPopover')
);

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireDefault(require('react'));

var _hooks = require('material-ui-popup-state/hooks');

var _Delete = _interopRequireDefault(require('@material-ui/icons/Delete'));

var _IconButton = _interopRequireDefault(
  require('@material-ui/core/IconButton')
);

var _Tooltip = _interopRequireDefault(require('@material-ui/core/Tooltip'));

var _Cut = _interopRequireDefault(require('../../icons/Cut'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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

function InstancePopover(props) {
  var clipInstance = props.clipInstance,
    deleteInstance = props.deleteInstance,
    instance = props.instance,
    popupState = props.popupState;

  var fireAction = function fireAction(fn, e) {
    e.stopPropagation();
    popupState.close();
    fn(instance.id);
  };

  return _react['default'].createElement(
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
    clipInstance
      ? _react['default'].createElement(
          _Tooltip['default'],
          {
            title: 'Copy to Clips',
          },
          _react['default'].createElement(
            _IconButton['default'],
            {
              onClick: function onClick(e) {
                return fireAction(clipInstance, e);
              },
            },
            _react['default'].createElement(_Cut['default'], {
              fontSize: 'small',
            })
          )
        )
      : null,
    _react['default'].createElement(
      _Tooltip['default'],
      {
        title: 'Delete',
      },
      _react['default'].createElement(
        _IconButton['default'],
        {
          onClick: function onClick(e) {
            return fireAction(deleteInstance, e);
          },
        },
        _react['default'].createElement(_Delete['default'], {
          fontSize: 'small',
        })
      )
    )
  );
}

InstancePopover.propTypes = {
  clipInstance: _propTypes['default'].func,
  deleteInstance: _propTypes['default'].func.isRequired,
  instance: _propTypes['default'].object.isRequired,
  popupState: _propTypes['default'].object.isRequired,
};
InstancePopover.defaultProps = {
  clipInstance: null,
};
