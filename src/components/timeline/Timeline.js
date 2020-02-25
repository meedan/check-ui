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

export default function Timeline(props) {
  const classes = useStyles();

  const { currentTime, duration, playing, data } = props;
  const {
    commentThreads,
    project,
    videoClips,
    videoPlaces,
    videoTags,
    user,
  } = data;

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
        // transport={transport}
        currentTime={currentTime}
        duration={duration}
        entities={videoClips}
        entitiesyKey="videoClips"
        entityType="clip"
        key="clip"
        onAfterChange={() => setSkip(false)}
        onBeforeChange={() => setSkip(true)}
        onChange={props.onTimeChange}
        playing={playing}
        skip={skip}
        suggestions={project.projectclips}
        title="Clips"
      />
      <Entities
        // transport={transport}
        clips={videoClips}
        currentTime={currentTime}
        duration={duration}
        entities={videoTags}
        entitiesyKey="videoTags"
        entityType="tag"
        key="tag"
        onAfterChange={() => setSkip(false)}
        onBeforeChange={() => setSkip(true)}
        onChange={props.onTimeChangeTime}
        playing={playing}
        skip={skip}
        suggestions={project.projecttags}
        title="Tags"
      />
      <Entities
        // transport={transport}
        clips={videoClips}
        currentTime={currentTime}
        duration={duration}
        entities={videoPlaces}
        entitiesyKey="videoPlaces"
        entityType="location"
        key="location"
        onAfterChange={() => setSkip(false)}
        onBeforeChange={() => setSkip(true)}
        onChange={props.onTimeChange}
        playing={playing}
        skip={skip}
        suggestions={project.projectplaces}
        title="Places"
      />
    </div>
  );
}

Timeline.propTypes = {
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
  onCommentCreate: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
  onCommentThreadCreate: PropTypes.func.isRequired,
  onCommentThreadDelete: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
  playing: PropTypes.bool,
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
