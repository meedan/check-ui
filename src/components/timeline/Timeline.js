import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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
      <div>Comments</div>
      <Entities
        currentTime={currentTime}
        duration={duration}
        onAfterChange={args => console.log('onAfterChange', args)}
        onBeforeChange={args => console.log('onBeforeChange', args)}
        onChange={args => console.log('onChange', args)}
        // title="Tags"
        // entityType="tag"
        // key="tag"
        // entities={this.props.data.videoTags}
        // clips={this.props.data.videoClips}
        // entitiesyKey={'videoTags'}
        // playing={playing}
        // transport={transport}
        // suggestions={this.props.data.project.projecttags}
        // skip={skip}
        // timelineOffset={this.props.x1}
      />
      <div>Tags</div>
      <div>Places</div>
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
