import React, { useEffect } from 'react';
import styled from 'styled-components';
import { func, number, object } from 'prop-types';
import { withTheme } from '@material-ui/core/styles';

const PlayheadHandle = styled(({ ...props }) => <div {...props} />)`
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

const PlayheadRoot = styled(({ theme, ...props }) => <div {...props} />)`
  min-height: 28px;
  overflow: visible;
  pointer-events: none;
  position: relative;
  user-select: none;
  width: 100%;
  ${PlayheadHandle}:before {
    background-color: ${theme => theme.theme.palette.primary.main};
  }
  ${PlayheadHandle}:after {
    border-color: ${theme => theme.theme.palette.primary.main};
  }
`;

const Playhead = props => {
  const playheadRootRef = React.useRef();
  const { value, max, onChange, style, theme } = props;

  // const currentTime = React.useState(value);
  const [dragState, setDragState] = React.useState(false);

  const onMouseDown = e => {
    setDragState(true);
    console.log('onMouseDown', e);
  };
  const onMouseMove = e => {
    if (dragState) {
      console.log('onMouseMove', e);
    }
  };
  const onMouseUp = e => {
    setDragState(false);
    console.log('onMouseUp', e);
  };

  useEffect(() => {
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [onMouseDown]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp]);

  return (
    <PlayheadRoot
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      ref={playheadRootRef}
      style={style}
      theme={theme}>
      <PlayheadHandle />
    </PlayheadRoot>
  );
};

export default withTheme(Playhead);

Playhead.propTypes = {
  max: number.isRequired,
  onChange: func.isRequired,
  style: object,
  value: number,
};
Playhead.defaultProps = {
  style: null,
  value: 0,
};
