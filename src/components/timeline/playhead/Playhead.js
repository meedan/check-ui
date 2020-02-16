import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { makeStyles, withTheme } from '@material-ui/core/styles';

import Tooltip from '../tooltip/Tooltip';
import formatSeconds from '../formatSeconds';

const useStyles = makeStyles({
  playheadRoot: {
    minHeight: '28px',
    overflow: 'visible',
    pointerEvents: 'none',
    position: 'relative',
    userSelect: 'none',
    width: '100%',
  },
});

const PlayheadHandle = styled(({ theme, ...props }) => <div {...props} />)`
  cursor: -webkit-grab;
  cursor: col-resize;
  cursor: grab;
  height: 100%;
  pointer-events: all;
  position: absolute;
  touch-action: pan-x;
  transform: translateX(-50%);
  width: 28px;
  &:before {
    background-color: ${theme => theme.theme.palette.primary.main};
    border-radius: 4px;
    content: ' ';
    display: block;
    height: 9px;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translate(-55%, -50%);
    width: 9px;
  }
  &:after {
    border-color: ${theme => theme.theme.palette.primary.main};
    border-style: solid;
    border-width: 0 0 0 1px;
    content: ' ';
    display: block;
    height: 100%;
    left: 50%;
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    width: 1px;
  }
`;

const Playhead = props => {
  const playheadRoot = useRef();
  const classes = useStyles();
  const { value, max, style, theme } = props;

  const [dragState, setDragState] = React.useState(false);
  const [localValue, setLocalValue] = React.useState(value);
  const [rootRect, setRootRect] = React.useState(null);

  const onMouseDown = e => {
    if (!e) return null;
    const coords = { x: e.pageX };

    if (coords.x <= 0) return null;
    const v = ((coords.x - rootRect.left) * max) / rootRect.width;

    if (v < 0 || v >= max) return null;
    setDragState(true);
    setLocalValue(v);
  };
  const onMouseMove = e => {
    if (!e || !dragState) return null;
    const coords = { x: e.pageX };

    if (coords.x <= 0) return null;
    const v = ((coords.x - rootRect.left) * max) / rootRect.width;

    if (v < 0 || v >= max) return null;
    setLocalValue(v);
  };
  const onMouseUp = e => {
    setDragState(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp]);

  useEffect(() => {
    setRootRect(playheadRoot.current.getBoundingClientRect());
  }, [playheadRoot]);

  useEffect(() => {
    props.onChange(localValue);
  }, [localValue]);

  const displayValue = dragState ? localValue : value;

  return (
    <div className={classes.playheadRoot} ref={playheadRoot} style={style}>
      <PlayheadHandle
        onMouseDown={onMouseDown}
        style={{
          left: `${localValue}%`,
        }}
        theme={theme}>
        <Tooltip isVisible={dragState}>{formatSeconds(displayValue)}</Tooltip>
      </PlayheadHandle>
    </div>
  );
};

export default withTheme(Playhead);

Playhead.propTypes = {
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  value: PropTypes.number,
};
Playhead.defaultProps = {
  style: null,
  value: 0,
};
