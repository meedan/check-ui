import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '../tooltip/Tooltip';
import formatSeconds from '../formatSeconds';

const useStyles = makeStyles(theme => ({
  playheadRoot: {
    minHeight: '28px',
    overflow: 'visible',
    position: 'relative',
    userSelect: 'none',
  },
  playheadHandle: {
    cursor: '-webkit-grab',
    cursor: 'col-resize',
    cursor: 'grab',
    height: '100%',
    pointerEvents: 'all',
    position: 'absolute',
    touchAction: 'pan-x',
    transform: 'translateX(-50%)',
    width: '28px',
    '&:before': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '4px',
      content: '" "',
      display: 'block',
      height: '9px',
      left: '50%',
      position: 'absolute',
      top: '0',
      transform: 'translate(-55%, -50%)',
      width: '9px',
    },
    '&:after': {
      borderColor: theme.palette.primary.main,
      borderStyle: 'solid',
      borderWidth: '0 0 0 1px',
      content: '" "',
      display: 'block',
      height: '100%',
      left: '50%',
      position: 'absolute',
      top: '0',
      transform: 'translateX(-50%)',
      width: '1px',
    },
  },
}));

const Playhead = props => {
  const playheadRoot = useRef();
  const classes = useStyles();
  const { currentTime, duration } = props;

  const [dragState, setDragState] = React.useState(false);
  const [localCurrentTime, setLocalCurrentTime] = React.useState(currentTime);
  const [rootRect, setRootRect] = React.useState(null);

  const onHandlePress = e => {
    if (!e) return null;

    if (e.pageX <= 0) return null;
    const v = ((e.pageX - rootRect.left) * duration) / rootRect.width;

    if (v < 0 || v >= duration) return null;
    setDragState(true);
    setLocalCurrentTime(v);
    props.onChange(v);
  };
  const onHandleMove = e => {
    if (!e || !dragState) return null;

    if (e.pageX <= 0) return null;
    const v = ((e.pageX - rootRect.left) * duration) / rootRect.width;

    if (v < 0 || v >= duration) return null;
    setLocalCurrentTime(v);
    props.onChange(v);
  };
  const onHandleRelease = e => {
    setDragState(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onHandleMove);
    return () => window.removeEventListener('mousemove', onHandleMove);
  }, [onHandleMove]);

  useEffect(() => {
    window.addEventListener('mouseup', onHandleRelease);
    return () => window.removeEventListener('mouseup', onHandleRelease);
  }, [onHandleRelease]);

  useEffect(() => {
    setRootRect(playheadRoot.current.getBoundingClientRect());
  }, [playheadRoot]);

  const val = dragState ? localCurrentTime : currentTime;
  const pos = rootRect ? (localCurrentTime * rootRect.width) / duration : 0;

  return (
    <div
      className={`${props.className} ${classes.playheadRoot}`}
      onMouseDown={onHandlePress}
      ref={playheadRoot}>
      <div
        className={classes.playheadHandle}
        style={{
          left: `${pos}px`,
        }}>
        <Tooltip isVisible={dragState}>{formatSeconds(val)}</Tooltip>
      </div>
    </div>
  );
};

export default Playhead;

Playhead.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
Playhead.defaultProps = {
  currentTime: 0,
};
