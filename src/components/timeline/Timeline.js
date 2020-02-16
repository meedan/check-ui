import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import Playhead from './playhead/Playhead';
import Entities from './entities/Entities';

const SIDE = 224;

const useStyles = makeStyles({
  timelineRoot: {
    position: 'relative',
  },
});

const Timeline = props => {
  const classes = useStyles();
  const { currentTime, duration, onChange, playing } = props;

  // console.log({ props });

  return (
    <div className={classes.timelineRoot}>
      <Playhead
        max={duration}
        onChange={onChange}
        style={{
          position: 'absolute',
          top: 0,
          left: `${SIDE}px`,
          right: 0,
          bottom: 0,
        }}
        value={currentTime}
      />
      <Table>
        <Entities
          // skip={skip}
          // timelineOffset={props.x1}
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
          // timelineOffset={props.x1}
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
          // timelineOffset={props.x1}
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
