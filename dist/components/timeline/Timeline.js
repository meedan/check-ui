(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'prop-types',
      'react',
      '@material-ui/core/styles/makeStyles',
      './comments/Comments',
      './entities/Entities',
      './playhead/Playhead',
      './utils/config',
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(
      exports,
      require('prop-types'),
      require('react'),
      require('@material-ui/core/styles/makeStyles'),
      require('./comments/Comments'),
      require('./entities/Entities'),
      require('./playhead/Playhead'),
      require('./utils/config')
    );
  } else {
    var mod = {
      exports: {},
    };
    factory(
      mod.exports,
      global.propTypes,
      global.react,
      global.makeStyles,
      global.Comments,
      global.Entities,
      global.Playhead,
      global.config
    );
    global.Timeline = mod.exports;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function (
  _exports,
  _propTypes,
  _react,
  _makeStyles,
  _Comments,
  _Entities,
  _Playhead,
  _config
) {
  'use strict';

  Object.defineProperty(_exports, '__esModule', {
    value: true,
  });
  _exports['default'] = Timeline;
  _propTypes = _interopRequireDefault(_propTypes);
  _react = _interopRequireDefault(_react);
  _makeStyles = _interopRequireDefault(_makeStyles);
  _Comments = _interopRequireDefault(_Comments);
  _Entities = _interopRequireDefault(_Entities);
  _Playhead = _interopRequireDefault(_Playhead);
  _config = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
      timelineRoot: {
        position: 'relative',
        userSelect: 'none',
      },
      playhead: {
        borderLeft: '1px solid '.concat(theme.palette.divider),
        bottom: 0,
        left: ''.concat(_config['default'].TIMELINE_OFFSET, 'px'),
        position: 'absolute',
        right: 0,
        top: 0,
      },
    };
  });

  function Timeline(_ref) {
    var _ref$currentTime = _ref.currentTime,
      currentTime = _ref$currentTime === void 0 ? 0 : _ref$currentTime,
      duration = _ref.duration,
      _ref$playing = _ref.playing,
      playing = _ref$playing === void 0 ? false : _ref$playing,
      data = _ref.data,
      props = _objectWithoutProperties(_ref, ['currentTime', 'duration', 'playing', 'data']);

    var classes = useStyles();
    var commentThreads = data.commentThreads,
      project = data.project,
      videoClips = data.videoClips,
      videoPlaces = data.videoPlaces,
      videoTags = data.videoTags,
      user = data.user; // this stops Entities from re-rendering constantly when moving playhead

    var _React$useState = _react['default'].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      skip = _React$useState2[0],
      setSkip = _React$useState2[1];

    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        className: classes.timelineRoot,
      },
      /*#__PURE__*/ _react['default'].createElement(_Playhead['default'], {
        className: classes.playhead,
        currentTime: currentTime,
        duration: duration,
        onChange: props.onTimeChange,
        setSkip: setSkip,
      }),
      /*#__PURE__*/ _react['default'].createElement(_Comments['default'], {
        currentTime: currentTime,
        duration: duration,
        onBeforeCommentThreadCreate: props.onBeforeCommentThreadCreate,
        onCommentCreate: props.onCommentCreate,
        onCommentDelete: props.onCommentDelete,
        onCommentEdit: props.onCommentEdit,
        onCommentThreadCreate: props.onCommentThreadCreate,
        onCommentThreadDelete: props.onCommentThreadDelete,
        threads: commentThreads,
        user: user,
      }),
      /*#__PURE__*/ _react['default'].createElement(_Entities['default'], {
        currentTime: currentTime,
        duration: duration,
        entities: videoClips,
        onAfterChange: function onAfterChange() {
          return setSkip(false);
        },
        onBeforeChange: function onBeforeChange() {
          return setSkip(true);
        },
        onEntityCreate: props.onEntityCreate,
        onEntityDelete: props.onEntityDelete,
        onEntityUpdate: props.onEntityUpdate,
        onInstanceCreate: props.onInstanceCreate,
        onInstanceDelete: props.onInstanceDelete,
        onInstanceUpdate: props.onInstanceUpdate,
        onPlaylistLaunch: function onPlaylistLaunch() {
          return props.onPlaylistLaunch('clips');
        },
        onTimeChange: props.onTimeChange,
        playing: playing,
        skip: skip,
        suggestions: project.projectclips,
        type: 'clips',
      }),
      /*#__PURE__*/ _react['default'].createElement(_Entities['default'], {
        clips: videoClips,
        currentTime: currentTime,
        duration: duration,
        entities: videoTags,
        onAfterChange: function onAfterChange() {
          return setSkip(false);
        },
        onBeforeChange: function onBeforeChange() {
          return setSkip(true);
        },
        onEntityCreate: props.onEntityCreate,
        onEntityDelete: props.onEntityDelete,
        onEntityUpdate: props.onEntityUpdate,
        onInstanceClip: props.onInstanceClip,
        onInstanceCreate: props.onInstanceCreate,
        onInstanceDelete: props.onInstanceDelete,
        onInstanceUpdate: props.onInstanceUpdate,
        onPlaylistLaunch: function onPlaylistLaunch() {
          return props.onPlaylistLaunch('tags');
        },
        onTimeChange: props.onTimeChange,
        playing: playing,
        skip: skip,
        suggestions: project.projecttags,
        type: 'tags',
      }),
      /*#__PURE__*/ _react['default'].createElement(_Entities['default'], {
        clips: videoClips,
        currentTime: currentTime,
        duration: duration,
        entities: videoPlaces,
        onAfterChange: function onAfterChange() {
          return setSkip(false);
        },
        onBeforeChange: function onBeforeChange() {
          return setSkip(true);
        },
        onEntityCreate: props.onEntityCreate,
        onEntityDelete: props.onEntityDelete,
        onEntityUpdate: props.onEntityUpdate,
        onInstanceClip: props.onInstanceClip,
        onInstanceCreate: props.onInstanceCreate,
        onInstanceDelete: props.onInstanceDelete,
        onInstanceUpdate: props.onInstanceUpdate,
        onPlaylistLaunch: function onPlaylistLaunch() {
          return props.onPlaylistLaunch('places');
        },
        onTimeChange: props.onTimeChange,
        playing: playing,
        skip: skip,
        suggestions: project.projectplaces,
        type: 'places',
      })
    );
  }

  Timeline.propTypes = {
    data: _propTypes['default'].shape({
      commentThreads: _propTypes['default'].array,
      project: _propTypes['default'].shape({
        projectclips: _propTypes['default'].array,
        projectplaces: _propTypes['default'].array,
        projecttags: _propTypes['default'].array,
      }),
      videoClips: _propTypes['default'].array,
      videoPlaces: _propTypes['default'].array,
      videoTags: _propTypes['default'].array,
      user: _propTypes['default'].shape({
        first_name: _propTypes['default'].string.isRequired,
        id: _propTypes['default'].number.isRequired,
        last_name: _propTypes['default'].string.isRequired,
        profile_img_url: _propTypes['default'].string.isRequired,
      }).isRequired,
    }),
    currentTime: _propTypes['default'].number.isRequired,
    duration: _propTypes['default'].number.isRequired,
    onBeforeCommentThreadCreate: _propTypes['default'].func,
    // TODO: what is it? do we need this?
    onCommentCreate: _propTypes['default'].func.isRequired,
    onCommentDelete: _propTypes['default'].func.isRequired,
    onCommentEdit: _propTypes['default'].func.isRequired,
    onCommentThreadCreate: _propTypes['default'].func.isRequired,
    onCommentThreadDelete: _propTypes['default'].func.isRequired,
    onEntityDelete: _propTypes['default'].func.isRequired,
    onEntityUpdate: _propTypes['default'].func.isRequired,
    onInstanceCreate: _propTypes['default'].func.isRequired,
    onInstanceDelete: _propTypes['default'].func.isRequired,
    onInstanceUpdate: _propTypes['default'].func.isRequired,
    onPlaylistLaunch: _propTypes['default'].func.isRequired,
    onTimeChange: _propTypes['default'].func.isRequired,
    playing: _propTypes['default'].bool,
  };
  Timeline.defaultProps = {
    data: {
      commentThreads: [],
      project: {
        projectclips: [],
        projectplaces: [],
        projecttags: [],
      },
      videoClips: [],
      videoPlaces: [],
      videoTags: [],
    },
    onAfterChange: null,
    onBeforeChange: null,
  };
});
