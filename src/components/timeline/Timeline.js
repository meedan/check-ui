import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Playhead from './playhead/Playhead';
// import Entities from './entities/Entities';

const useStyles = makeStyles({
  timelineRoot: {
    position: 'relative',
  },
});

const Timeline = props => {
  const classes = useStyles();
  const { value, max, onChange } = props;
  return (
    <div className={classes.timelineRoot}>
      <Playhead
        max={max}
        onChange={onChange}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        value={value}
      />
      <div>Comments</div>
      <div>Clips</div>
      <div>Tags</div>
      <div>Places</div>
    </div>
  );
};

Timeline.propTypes = {
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

Timeline.defaultProps = {
  max: null,
  value: 0,
};

export default Timeline;
