import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import { usePopupState, bindHover } from 'material-ui-popup-state/hooks';

import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';

import HandlePopover from './HandlePopover';
import InstancePopover from './InstancePopover';
import formatSeconds from '../utils/formatSeconds';

const useStyles = () =>
  makeStyles(theme => ({
    instance: {
      backfaceVisibility: 'visible',
      bottom: '0',
      position: 'absolute',
      top: '0',
      zIndex: 500,
      '&:hover': {
        zIndex: '500',
      },
    },
    handle: {
      bottom: '0',
      cursor: 'ew-resize',
      position: 'absolute',
      top: '0',
      transition: 'transform 250ms, opacity 250ms, width 250ms',
      zIndex: '500',
      '&:hover': {
        opacity: '1 !important',
      },
    },
    handleThumb: {
      height: '28px',
      transform: 'translateX(-9px)',
      width: '18px',
    },
  }));

export default function Instance({ duration, instances, isSelected = false, isLocal, isLocked, ...props }) {
  const classes = useStyles()();
  const theme = useTheme();

  const { left, width } = props.sliderRect;

  const [end, setEnd] = useState(props.end);
  const [start, setStart] = useState(props.start);

  const [draggingHandle, setDraggingHandle] = useState(null);
  const [hoveringHandle, setHoveringHandle] = useState(null);
  const [hoveringInstance, setHoveringInstance] = useState(false);

  const instancePopupState = usePopupState({
    variant: 'popover',
    popupId: 'instancePopover',
  });

  const handlePopupState = {
    start: usePopupState({
      variant: 'popover',
      popupId: 'startHandlePopover',
    }),
    end: usePopupState({
      variant: 'popover',
      popupId: 'endHandlePopover',
    }),
  };

  // Define boundaries for how far the instance can be moved right/left
  const prevInstance = _.maxBy(
    _.filter(instances, i => i.end_seconds <= start),
    i => i.end_seconds
  );

  const nextInstance = _.minBy(
    _.filter(instances, i => i.start_seconds >= end),
    i => i.start_seconds
  );

  const MIN_LENGTH = (8 * duration) / width;
  const RANGE_MAX = nextInstance ? nextInstance.start_seconds : duration;
  const RANGE_MIN = prevInstance ? prevInstance.end_seconds : 0;
  const UNIT = duration / width;

  const onInstanceEnter = () => {
    setHoveringInstance(true);
  };

  const onInstanceLeave = () => {
    setHoveringHandle(null);
    setHoveringInstance(false);
  };

  const onHandleEnter = edge => {
    setHoveringHandle(edge);
  };

  const onHandlePress = (e, edge) => {
    if (!e || !edge) return null;
    // e.persist();
    setDraggingHandle(edge);
    props.lockSiblings();
    props.onHandlePress(edge === 'start' ? start : end);
  };

  const onHandleMove = e => {
    if (!draggingHandle) return null;
    if (e.pageX <= left - 100 || e.pageX >= left + width + 100) return null;

    let v = ((e.pageX - left) * duration) / width;

    if (draggingHandle === 'start') {
      // 1 check if start doesnt go over (end - MIN_LENGTH)
      // 2 check if start doesnt go over RANGE_MIN
      setStart(prevState => (v < end - MIN_LENGTH && v >= RANGE_MIN ? v : prevState));
    } else if (draggingHandle === 'end') {
      // 1 check if end doesnt go over (start + MIN_LENGTH)
      // 2 check if end doesnt go over RANGE_MAX
      setEnd(prevState => (v > start + MIN_LENGTH && v <= RANGE_MAX ? v : prevState));
    }
    props.onScrub(draggingHandle === 'start' ? start : end);
    // props.onInstanceUpdate({ start_seconds: start, end_seconds: end });
  };

  const onHandleRelease = e => {
    if (!draggingHandle) return null;
    props.onHandleRelease(draggingHandle === 'start' ? start : end);
    setDraggingHandle(null);
    props.lockSiblings(null);
    props.onInstanceUpdate({ start_seconds: start, end_seconds: end });
  };

  const onHandleLeave = () => {
    if (draggingHandle) return null;
    setHoveringHandle(null);
    // setHoveringInstance(prevState => (prevState ? prevState : null));
  };

  const onHandleAdjust = (edge, dir) => {
    // it all works perfectly fine, but clean this up one day:
    const val = prevState => {
      if (dir === 'fwd') {
        return prevState + UNIT < RANGE_MAX ? prevState + UNIT : RANGE_MAX;
      } else if (dir === 'bwd') {
        return prevState - UNIT > RANGE_MIN ? prevState - UNIT : RANGE_MIN;
      }
    };
    if (dir === 'fwd') {
      edge === 'end' ? setEnd(prevState => val(prevState)) : setStart(prevState => val(prevState));
    } else if (dir === 'bwd') {
      edge === 'end' ? setEnd(prevState => val(prevState)) : setStart(prevState => val(prevState));
    }

    props.onInstanceUpdate({ start_seconds: start, end_seconds: end });
  };

  const x1 = (start * width) / duration;
  const x2 = (end * width) / duration;

  const instanceLength = end - start;
  const instanceWidth = (instanceLength * width) / duration;

  const handles = [
    {
      edge: 'end',
      value: end,
    },
    {
      edge: 'start',
      value: start,
    },
  ];

  useEffect(() => {
    window.addEventListener('mousemove', onHandleMove);
    return () => window.removeEventListener('mousemove', onHandleMove);
  }, [onHandleMove]);

  useEffect(() => {
    window.addEventListener('mouseup', onHandleRelease);
    return () => window.removeEventListener('mouseup', onHandleRelease);
  }, [onHandleRelease]);

  useEffect(() => {
    setStart(props.start);
  }, [props.start]);

  useEffect(() => {
    setEnd(props.end);
  }, [props.end]);

  return (
    <>
      <div
        className={classes.instance}
        data-instance-id={`${props.entityType}-${props.id}`.trim()}
        style={{
          left: `${x1}px`,
          width: `${instanceWidth}px`,
          zIndex: hoveringInstance ? `500` : `default`,
          opacity: isLocal ? '0.5' : '1',
          background: isSelected ? 'rgba(255, 109, 0, 0.7)' : 'rgba(71, 123, 181, 0.4)',
        }}
        onMouseEnter={!isLocked && !isLocal ? onInstanceEnter : null}
        onMouseLeave={!isLocked && !isLocal ? onInstanceLeave : null}>
        {!isLocked && !isLocal ? (
          <div {...bindHover(instancePopupState)} style={{ width: `100%`, height: `28px` }} />
        ) : null}
      </div>
      {!draggingHandle ? (
        <InstancePopover
          instance={props.instance}
          onInstanceClip={props.onInstanceClip}
          onInstanceCopyPermalink={instancePopupState.close}
          onInstanceDelete={props.onInstanceDelete}
          permalink={props.permalink}
          popupState={instancePopupState}
        />
      ) : null}

      {!isLocal
        ? handles.map(handle => {
            const { edge, value } = handle;

            const isDragged = draggingHandle === edge;
            const isHovered = hoveringHandle === edge;
            const isActive = isDragged || isHovered;

            return (
              <Fragment key={`${edge}Popover`}>
                <div
                  className={classes.handle}
                  onMouseDown={e => onHandlePress(e, edge)}
                  onMouseEnter={() => onHandleEnter(edge)}
                  onMouseLeave={onHandleLeave}
                  style={{
                    background: isSelected ? 'rgba(255, 109, 0, 1)' : 'rgba(71, 123, 181, 1)',
                    left: edge === 'start' ? `${x1}px` : `${x2}px`,
                    opacity: isActive || handlePopupState[edge].isOpen ? '1' : '0',
                    transform: edge === 'end' ? 'translateX(-100%)' : 'none',
                    width: draggingHandle ? '1px' : '3px',
                  }}>
                  <Tooltip open={isDragged} placement="top" title={formatSeconds(value)}>
                    <div className={classes.handleThumb} {...bindHover(handlePopupState[edge])} />
                  </Tooltip>
                </div>
                {!draggingHandle ? (
                  <HandlePopover
                    id={`${edge}HandlePopover`}
                    moveBackward={() => onHandleAdjust(edge, 'bwd')}
                    moveForward={() => onHandleAdjust(edge, 'fwd')}
                    popupState={handlePopupState[edge]}
                  />
                ) : null}
              </Fragment>
            );
          })
        : null}
    </>
  );
}

Instance.propTypes = {
  duration: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  instance: PropTypes.object.isRequired,
  instances: PropTypes.array.isRequired,
  isLocal: PropTypes.bool,
  isLocked: PropTypes.bool,
  lockSiblings: PropTypes.func.isRequired,
  onHandleMove: PropTypes.func.isRequired,
  onHandlePress: PropTypes.func.isRequired,
  onHandleRelease: PropTypes.func.isRequired,
  onInstanceClip: PropTypes.func,
  onInstanceDelete: PropTypes.func.isRequired,
  onInstanceUpdate: PropTypes.func.isRequired,
  sliderRect: PropTypes.object.isRequired,
  start: PropTypes.number.isRequired,
};
