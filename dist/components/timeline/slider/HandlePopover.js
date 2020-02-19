'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = HandlePopover;

var _HoverPopover = _interopRequireDefault(
  require('material-ui-popup-state/HoverPopover')
);

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireDefault(require('react'));

var _hooks = require('material-ui-popup-state/hooks');

var _ArrowBack = _interopRequireDefault(
  require('@material-ui/icons/ArrowBack')
);

var _ArrowForward = _interopRequireDefault(
  require('@material-ui/icons/ArrowForward')
);

var _IconButton = _interopRequireDefault(
  require('@material-ui/core/IconButton')
);

var _Tooltip = _interopRequireDefault(require('@material-ui/core/Tooltip'));

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

function HandlePopover(props) {
  var id = props.id,
    moveBackward = props.moveBackward,
    moveForward = props.moveForward,
    popupState = props.popupState;
  return _react['default'].createElement(
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
    _react['default'].createElement(
      _Tooltip['default'],
      {
        placement: 'bottom',
        title: 'Move backward',
      },
      _react['default'].createElement(
        _IconButton['default'],
        {
          onClick: function onClick(e) {
            e.stopPropagation();
            moveBackward();
          },
        },
        _react['default'].createElement(_ArrowBack['default'], {
          fontSize: 'small',
        })
      )
    ),
    _react['default'].createElement(
      _Tooltip['default'],
      {
        placement: 'bottom',
        title: 'Move forward',
      },
      _react['default'].createElement(
        _IconButton['default'],
        {
          onClick: function onClick(e) {
            e.stopPropagation();
            moveForward();
          },
        },
        _react['default'].createElement(_ArrowForward['default'], {
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
