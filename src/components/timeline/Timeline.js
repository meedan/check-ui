import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import Playhead from './playhead/Playhead';
import Entities from './entities/Entities';
import Comments from './entities/Comments';

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

const Timeline = props => {
  const { currentTime, duration, onChange, playing } = props;
  const classes = useStyles();

  return (
    <div className={classes.timelineRoot}>
      <Playhead
        className={classes.playhead}
        currentTime={currentTime}
        duration={duration}
        onChange={onChange}
      />
      <Table>
        <Comments {...props} currentTime={currentTime} />
        <Entities
          // skip={skip}
          // transport={transport}
          currentTime={currentTime}
          duration={duration}
          entities={props.data.videoClips}
          entitiesyKey="videoClips"
          entityType="clip"
          key="clip"
          onAfterChange={args => console.log('onAfterChange', args)}
          onBeforeChange={args => console.log('onBeforeChange', args)}
          onChange={args => console.log('onChange', args)}
          playing={playing}
          suggestions={props.data.project.projectclips}
          title="Clips"
        />
        <Entities
          // skip={skip}
          // transport={transport}
          clips={props.data.videoClips}
          currentTime={currentTime}
          duration={duration}
          entities={props.data.videoTags}
          entitiesyKey="videoTags"
          entityType="tag"
          key="tag"
          onAfterChange={args => console.log('onAfterChange', args)}
          onBeforeChange={args => console.log('onBeforeChange', args)}
          onChange={args => console.log('onChange', args)}
          playing={playing}
          suggestions={props.data.project.projecttags}
          title="Tags"
        />
        <Entities
          // skip={skip}
          // transport={transport}
          clips={props.data.videoClips}
          currentTime={currentTime}
          duration={duration}
          entities={props.data.videoPlaces}
          entitiesyKey="videoPlaces"
          entityType="location"
          key="location"
          onAfterChange={args => console.log('onAfterChange', args)}
          onBeforeChange={args => console.log('onBeforeChange', args)}
          onChange={args => console.log('onChange', args)}
          playing={playing}
          suggestions={props.data.project.projectplaces}
          title="Places"
        />
      </Table>
    </div>
  );
};

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
  currentTime: PropTypes.number,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
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
  currentTime: 0,
  playing: false,
};

export default Timeline;
