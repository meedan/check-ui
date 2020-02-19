'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = Timeline;

var _propTypes = _interopRequireDefault(require('prop-types'));

var _react = _interopRequireDefault(require('react'));

var _Table = _interopRequireDefault(require('@material-ui/core/Table'));

var _makeStyles = _interopRequireDefault(
  require('@material-ui/core/styles/makeStyles')
);

var _Comments = _interopRequireDefault(require('./comments/Comments'));

var _Entities = _interopRequireDefault(require('./entities/Entities'));

var _Playhead = _interopRequireDefault(require('./playhead/Playhead'));

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

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
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

var TIMELINE_OFFSET = 224;
var useStyles = (0, _makeStyles['default'])(function(theme) {
  return {
    timelineRoot: {
      position: 'relative',
      userSelect: 'none',
    },
    playhead: {
      borderLeft: '1px solid '.concat(theme.palette.divider),
      bottom: 0,
      left: ''.concat(TIMELINE_OFFSET, 'px'),
      position: 'absolute',
      right: 0,
      top: 0,
    },
  };
});

function Timeline(props) {
  var classes = useStyles();
  var currentTime = props.currentTime,
    duration = props.duration,
    playing = props.playing; // this stops Entities from re-rendering constantly when moving playhead

  var _React$useState = _react['default'].useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    skip = _React$useState2[0],
    setSkip = _React$useState2[1];

  return _react['default'].createElement(
    'div',
    {
      className: classes.timelineRoot,
    },
    _react['default'].createElement(_Playhead['default'], {
      className: classes.playhead,
      currentTime: currentTime,
      duration: duration,
      onChange: props.onChange,
      setSkip: setSkip,
    }),
    _react['default'].createElement(
      _Table['default'],
      null,
      _react['default'].createElement(
        _Comments['default'],
        _extends({}, props, {
          currentTime: currentTime,
        })
      ),
      _react['default'].createElement(
        _Entities['default'], // transport={transport}
        {
          currentTime: currentTime,
          duration: duration,
          entities: props.data.videoClips,
          entitiesyKey: 'videoClips',
          entityType: 'clip',
          key: 'clip',
          onAfterChange: function onAfterChange() {
            return setSkip(false);
          },
          onBeforeChange: function onBeforeChange() {
            return setSkip(true);
          },
          onChange: props.onChange,
          playing: playing,
          skip: skip,
          suggestions: props.data.project.projectclips,
          title: 'Clips',
        }
      ),
      _react['default'].createElement(
        _Entities['default'], // transport={transport}
        {
          clips: props.data.videoClips,
          currentTime: currentTime,
          duration: duration,
          entities: props.data.videoTags,
          entitiesyKey: 'videoTags',
          entityType: 'tag',
          key: 'tag',
          onAfterChange: function onAfterChange() {
            return setSkip(false);
          },
          onBeforeChange: function onBeforeChange() {
            return setSkip(true);
          },
          onChange: props.onChange,
          playing: playing,
          skip: skip,
          suggestions: props.data.project.projecttags,
          title: 'Tags',
        }
      ),
      _react['default'].createElement(
        _Entities['default'], // transport={transport}
        {
          clips: props.data.videoClips,
          currentTime: currentTime,
          duration: duration,
          entities: props.data.videoPlaces,
          entitiesyKey: 'videoPlaces',
          entityType: 'location',
          key: 'location',
          onAfterChange: function onAfterChange() {
            return setSkip(false);
          },
          onBeforeChange: function onBeforeChange() {
            return setSkip(true);
          },
          onChange: props.onChange,
          playing: playing,
          skip: skip,
          suggestions: props.data.project.projectplaces,
          title: 'Places',
        }
      )
    )
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
  }),
  currentTime: _propTypes['default'].number,
  duration: _propTypes['default'].number.isRequired,
  onChange: _propTypes['default'].func.isRequired,
  playing: _propTypes['default'].bool,
};
Timeline.defaultProps = {
  currentTime: 0,
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
  playing: false,
};
