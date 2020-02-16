import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import Playhead from './playhead/Playhead';
import Entities from './entities/Entities';

const useStyles = makeStyles({
  timelineRoot: {
    position: 'relative',
  },
});

const Timeline = props => {
  const classes = useStyles();
  const { currentTime, duration, onChange } = props;
  return (
    <div className={classes.timelineRoot}>
      <Playhead
        max={duration}
        onChange={onChange}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        value={currentTime}
      />
      <Table padding="checkbox">
        <Entities
          // playing={playing}
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
          suggestions={props.data.project.projectclips}
          title="Clips"
        />
        <Entities
          // playing={playing}
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
          suggestions={props.data.project.projecttags}
          title="Tags"
        />
        <Entities
          // playing={playing}
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
          suggestions={props.data.project.projectplaces}
          title="Places"
        />
      </Table>
    </div>
  );
};

Timeline.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

Timeline.defaultProps = {
  currentTime: 0,
  duration: null,
};

export default Timeline;
