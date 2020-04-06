(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'react',
      'prop-types',
      '@material-ui/core/Button',
      '@material-ui/core/Dialog',
      '@material-ui/core/DialogActions',
      '@material-ui/core/DialogContent',
      '@material-ui/core/DialogContentText',
      '@material-ui/core/DialogTitle',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('react'),
      require('prop-types'),
      require('@material-ui/core/Button'),
      require('@material-ui/core/Dialog'),
      require('@material-ui/core/DialogActions'),
      require('@material-ui/core/DialogContent'),
      require('@material-ui/core/DialogContentText'),
      require('@material-ui/core/DialogTitle')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.react,
      global.propTypes,
      global.Button,
      global.Dialog,
      global.DialogActions,
      global.DialogContent,
      global.DialogContentText,
      global.DialogTitle
    );
    global.DeleteModal = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _react,
  _propTypes,
  _Button,
  _Dialog,
  _DialogActions,
  _DialogContent,
  _DialogContentText,
  _DialogTitle
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = DeleteModal;
  _react = _interopRequireDefault(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _Button = _interopRequireDefault(_Button);
  _Dialog = _interopRequireDefault(_Dialog);
  _DialogActions = _interopRequireDefault(_DialogActions);
  _DialogContent = _interopRequireDefault(_DialogContent);
  _DialogContentText = _interopRequireDefault(_DialogContentText);
  _DialogTitle = _interopRequireDefault(_DialogTitle);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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

  function DeleteModal(_ref) {
    var entityName = _ref.entityName,
      entityType = _ref.entityType,
      props = _objectWithoutProperties(_ref, ['entityName', 'entityType']);

    return /*#__PURE__*/ _react['default'].createElement(
      _Dialog['default'],
      {
        'aria-describedby': 'Confirm removal of all instances of '.concat(entityName),
        'aria-labelledby': 'Delete '.concat(entityType),
        maxWidth: 'xs',
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        onClose: props.onCancel,
        open: true,
      },
      /*#__PURE__*/ _react['default'].createElement(_DialogTitle['default'], null, 'Delete ', entityType),
      /*#__PURE__*/ _react['default'].createElement(
        _DialogContent['default'],
        null,
        /*#__PURE__*/ _react['default'].createElement(
          _DialogContentText['default'],
          {
            variant: 'body1',
          },
          'Do you wish to remove all instances of ',
          /*#__PURE__*/ _react['default'].createElement('strong', null, entityName),
          '? This can\u2019t be undone.'
        )
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _DialogActions['default'],
        null,
        /*#__PURE__*/ _react['default'].createElement(
          _Button['default'],
          {
            size: 'large',
            onClick: props.onCancel,
          },
          'Cancel'
        ),
        /*#__PURE__*/ _react['default'].createElement(
          _Button['default'],
          {
            size: 'large',
            color: 'primary',
            onClick: props.onConfirm,
          },
          'Delete'
        )
      )
    );
  }

  DeleteModal.propTypes = {
    entityName: _propTypes['default'].string.isRequired,
    entityType: _propTypes['default'].string.isRequired,
    onCancel: _propTypes['default'].func.isRequired,
    onConfirm: _propTypes['default'].func.isRequired,
  };
});
