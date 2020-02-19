import PropTypes from 'prop-types';
import React from 'react';

import Table from '@material-ui/core/Table';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Comments from './comments/Comments';
import Entities from './entities/Entities';
import Playhead from './playhead/Playhead';

const TIMELINE_OFFSET = 224;

const useStyles = makeStyles(theme => ({
  timelineRoot: {
    position: 'relative',
    userSelect: 'none',
  },
  playhead: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    bottom: 0,
    left: `${TIMELINE_OFFSET}px`,
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

export default function Timeline(props) {
  const classes = useStyles();

  const { currentTime, duration, playing } = props;

  // this stops Entities from re-rendering constantly when moving playhead
  const [skip, setSkip] = React.useState(false);

  return (
    <div className={classes.timelineRoot}>
      <Playhead
        className={classes.playhead}
        currentTime={currentTime}
        duration={duration}
        onChange={props.onChange}
        setSkip={setSkip}
      />
      <Table>
        <Comments {...props} currentTime={currentTime} />
        <Entities
          // transport={transport}
          currentTime={currentTime}
          duration={duration}
          entities={props.data.videoClips}
          entitiesyKey="videoClips"
          entityType="clip"
          key="clip"
          onAfterChange={() => setSkip(false)}
          onBeforeChange={() => setSkip(true)}
          onChange={props.onChange}
          playing={playing}
          skip={skip}
          suggestions={props.data.project.projectclips}
          title="Clips"
        />
        <Entities
          // transport={transport}
          clips={props.data.videoClips}
          currentTime={currentTime}
          duration={duration}
          entities={props.data.videoTags}
          entitiesyKey="videoTags"
          entityType="tag"
          key="tag"
          onAfterChange={() => setSkip(false)}
          onBeforeChange={() => setSkip(true)}
          onChange={props.onChange}
          playing={playing}
          skip={skip}
          suggestions={props.data.project.projecttags}
          title="Tags"
        />
        <Entities
          // transport={transport}
          clips={props.data.videoClips}
          currentTime={currentTime}
          duration={duration}
          entities={props.data.videoPlaces}
          entitiesyKey="videoPlaces"
          entityType="location"
          key="location"
          onAfterChange={() => setSkip(false)}
          onBeforeChange={() => setSkip(true)}
          onChange={props.onChange}
          playing={playing}
          skip={skip}
          suggestions={props.data.project.projectplaces}
          title="Places"
        />
      </Table>
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
  }),
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
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
