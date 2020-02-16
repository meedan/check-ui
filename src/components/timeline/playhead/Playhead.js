import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  playheadRoot: {
    minHeight: '28px',
    overflow: 'visible',
    pointerEvents: 'none',
    position: 'relative',
    userSelect: 'none',
    width: '100%',
    zIndex: 1,
  },
  playheadSlider: {
    pointerEvents: 'initial',
    '& .MuiSlider-track': {
      background: 'none',
    },
    '& .MuiSlider-rail': {
      background: 'none',
    },
  },
  playheadSliderThumb: {
    '&::before': {
      borderLeft: '1px solid orange',
      content: ' ',
      display: 'block',
      height: '100%',
      left: '50%',
      position: 'absolute',
      top: '0',
      transform: 'translateX(-50%)',
      width: '1px',
    },
  },
});

const Playhead = props => {
  const classes = useStyles();
  const playheadRoot = React.useRef();
  const { max, onChange, style, value } = props;
  return (
    <div className={classes.playheadRoot} style={style}>
      <Slider
        className={classes.playheadSlider}
        classes={{
          root: classes.playheadSlider,
          thumb: classes.playheadSliderThumb,
        }}
        defaultValue={0}
        max={max}
        min={0}
        onChange={(e, v) => onChange(v)}
        value={value}
        valueLabelDisplay="auto"
      />
    </div>
  );
};

Playhead.propTypes = {
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  style: PropTypes.object,
  value: PropTypes.number,
};

Playhead.defaultProps = {
  onChange: null,
  style: null,
  value: 0,
};

export default Playhead;
