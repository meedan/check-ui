import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';

import formatSeconds from '../utils/formatSeconds';

const useStyles = makeStyles(theme => ({
  playheadRoot: {
    minHeight: '28px',
    overflowX: 'visible',
    position: 'relative',
    userSelect: 'none',
    zIndex: 500,
  },
  playheadHandle: {
    background: 'rgba(0,0,0,0.04)',
    cursor: '-webkit-grab',
    cursor: 'col-resize',
    cursor: 'grab',
    height: '100%',
    pointerEvents: 'all',
    position: 'absolute',
    touchAction: 'pan-x',
    transform: 'translateX(-50%)',
    width: '14px',
    // zIndex: 100,
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

export default function Playhead(props) {
  const classes = useStyles();
  const playheadRoot = useRef();

  const { currentTime, duration } = props;

  const [dragging, setDragging] = React.useState(false);
  const [rootRect, setRootRect] = React.useState(null);

  const onHandlePress = e => {
    if (!e) return null;

    if (e.pageX <= rootRect.left - 100 || e.pageX >= rootRect.left + rootRect.width + 100) return null;
    const v = ((e.pageX - rootRect.left) * duration) / rootRect.width;

    setDragging(true);
    props.onChange(v < 0 ? 0 : v > duration ? duration : v);
  };
  const onHandleMove = e => {
    if (!e || !dragging) return null;

    if (e.pageX <= 0) return null;
    const v = ((e.pageX - rootRect.left) * duration) / rootRect.width;

    props.onChange(v < 0 ? 0 : v > duration ? duration : v);
  };
  const onHandleRelease = () => {
    setDragging(false);
  };
  const getRootRect = () => {
    if (playheadRoot && playheadRoot.current) setRootRect(playheadRoot.current.getBoundingClientRect());
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
    getRootRect();
  }, [playheadRoot]);

  useEffect(() => {
    if (props && props.setSkip) props.setSkip(dragging);
  }, [dragging]);

  // recalc rootRect on window resize
  useEffect(() => {
    window.addEventListener('resize', getRootRect);
    return () => window.removeEventListener('resize', getRootRect);
  });

  const pos = rootRect ? (currentTime * rootRect.width) / duration : 0;

  return (
    <div
      className={`${props.className} ${classes.playheadRoot}`}
      data-testid="entities-playhead"
      onMouseDown={onHandlePress}
      ref={playheadRoot}>
      <Tooltip open={dragging} title={formatSeconds(currentTime)} placement="top">
        <div
          className={classes.playheadHandle}
          onMouseDown={onHandlePress}
          onMouseUp={onHandleRelease}
          style={{
            left: `${pos}px`,
          }}></div>
      </Tooltip>
    </div>
  );
}

Playhead.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
