import PropTypes from 'prop-types';
import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Comments from './comments/Comments';
import Entities from './entities/Entities';
import Playhead from './playhead/Playhead';
import config from './utils/config';

const useStyles = makeStyles(theme => ({
  timelineRoot: {
    position: 'relative',
    userSelect: 'none',
  },
  playhead: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    bottom: 0,
    left: `${config.TIMELINE_OFFSET}px`,
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

export default function Timeline({ currentTime = 0, duration, playing = false, data, ...props }) {
  const classes = useStyles();

  const { commentThreads, project, videoClips, videoPlaces, videoTags, user } = data;

  // this stops Entities from re-rendering constantly when moving playhead
  const [skip, setSkip] = React.useState(false);

  return (
    <div className={classes.timelineRoot}>
      <Playhead
        className={classes.playhead}
        currentTime={currentTime}
        duration={duration}
        onChange={props.onTimeChange}
        setSkip={setSkip}
      />
      <Comments
        currentTime={currentTime}
        duration={duration}
        onBeforeCommentThreadCreate={props.onBeforeCommentThreadCreate}
        onCommentCreate={props.onCommentCreate}
        onCommentDelete={props.onCommentDelete}
        onCommentEdit={props.onCommentEdit}
        onCommentThreadCreate={props.onCommentThreadCreate}
        onCommentThreadDelete={props.onCommentThreadDelete}
        threads={commentThreads}
        user={user}
      />
      <Entities
        clips={videoClips}
        currentTime={currentTime}
        duration={duration}
        entities={videoTags}
        onAfterChange={() => setSkip(false)}
        onBeforeChange={() => setSkip(true)}
        onEntityCreate={props.onEntityCreate}
        onEntityDelete={props.onEntityDelete}
        onEntityUpdate={props.onEntityUpdate}
        onInstanceClip={props.onInstanceClip}
        onInstanceCreate={props.onInstanceCreate}
        onInstanceDelete={props.onInstanceDelete}
        onInstanceUpdate={props.onInstanceUpdate}
        onPlaylistLaunch={() => props.onPlaylistLaunch('tags')}
        onScrub={props.onScrub}
        onTimeChange={props.onTimeChange}
        playing={playing}
        skip={skip}
        suggestions={project.projecttags}
        type="tags"
      />
    </div>
  );
}

Timeline.propTypes = {
  activeInstanceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.shape({
    commentThreads: PropTypes.array,
    project: PropTypes.shape({
      projectclips: PropTypes.array,
      projectplaces: PropTypes.array,
      projecttags: PropTypes.array,
    }),
    videoClips: PropTypes.array,
    videoPlaces: PropTypes.array,
    videoTags: PropTypes.array,
    user: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      last_name: PropTypes.string.isRequired,
      profile_img_url: PropTypes.string.isRequired,
    }).isRequired,
  }),
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onBeforeCommentThreadCreate: PropTypes.func, // TODO: what is it? do we need this?
  onCommentCreate: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
  onCommentThreadCreate: PropTypes.func.isRequired,
  onCommentThreadDelete: PropTypes.func.isRequired,
  onEntityDelete: PropTypes.func.isRequired,
  onEntityUpdate: PropTypes.func.isRequired,
  onInstanceCreate: PropTypes.func.isRequired,
  onInstanceDelete: PropTypes.func.isRequired,
  onInstanceUpdate: PropTypes.func.isRequired,
  onPlaylistLaunch: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  playing: PropTypes.bool,
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
