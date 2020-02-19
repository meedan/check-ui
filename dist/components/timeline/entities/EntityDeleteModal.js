'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = EntityDeleteModal;

var _react = _interopRequireDefault(require('react'));

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function EntityDeleteModal(props) {
  var onCancel = props.onCancel,
    onConfirm = props.onConfirm,
    name = props.name,
    title = props.title;
  return _react['default'].createElement(
    _core.Dialog,
    {
      'aria-describedby': 'Confirm removal of all instances of '.concat(name),
      'aria-labelledby': title,
      maxWidth: 'xs',
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      onClose: onCancel,
      open: true,
    },
    _react['default'].createElement(_core.DialogTitle, null, title),
    _react['default'].createElement(
      _core.DialogContent,
      null,
      _react['default'].createElement(
        _core.DialogContentText,
        null,
        _react['default'].createElement(
          _core.Typography,
          {
            variant: 'body1',
          },
          'Do you wish to remove all instances of ',
          _react['default'].createElement('strong', null, name),
          '? This can\u2019t be undone.'
        )
      )
    ),
    _react['default'].createElement(
      _core.DialogActions,
      null,
      _react['default'].createElement(
        _core.Button,
        {
          size: 'large',
          onClick: onCancel,
        },
        'Cancel'
      ),
      _react['default'].createElement(
        _core.Button,
        {
          size: 'large',
          color: 'primary',
          onClick: onConfirm,
        },
        'Delete'
      )
    )
  );
}
