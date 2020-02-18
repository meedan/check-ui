import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import { usePopupState, bindHover } from 'material-ui-popup-state/hooks';

import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';

import HandlePopover from './HandlePopover';
import InstancePopover from './InstancePopover';
import formatSeconds from '../utils/formatSeconds';

const useStyles = () =>
  makeStyles(theme => ({
    instance: {
      backfaceVisibility: 'visible',
      background: 'rgba(71, 123, 181, 0.4)',
      bottom: '0',
      position: 'absolute',
      top: '0',
      '&:hover': {
        zIndex: '3000',
      },
    },
    handle: {
      background: 'rgba(71, 123, 181, 1)',
      bottom: '0',
      cursor: 'ew-resize',
      position: 'absolute',
      top: '0',
      transition: 'transform 250ms, opacity 250ms, width 250ms',
      zIndex: '2000',
      '&:hover': {
        opacity: '1 !important',
      },
    },
    handleThumb: {
      height: '28px',
      transform: 'translateX(-12px)',
      width: '24px',
    },
  }));

export default function Instance(props) {
  const { isLocked, duration, instances } = props;
  const { left, width } = props.wrapper;

  const [end, setEnd] = useState(props.end);
  const [start, setStart] = useState(props.start);

  const [dragging, setDragging] = useState(null);
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

  // const setNewTime = e => {
  //   if (!e || !dragging) return null;
  //   // console.log('setNewTime', e);

  //   const MIN_LENGTH = (6 * duration) / width;
  //   const prevInstance = _.maxBy(
  //     _.filter(instances, i => i.end_seconds <= start),
  //     i => i.end_seconds
  //   );
  //   const nextInstance = _.minBy(
  //     _.filter(instances, i => i.start_seconds >= end),
  //     i => i.start_seconds
  //   );
  //   const RANGE_MIN = prevInstance ? prevInstance.end_seconds : 0;
  //   const RANGE_MAX = nextInstance ? nextInstance.start_seconds : duration;
  //   if (e.pageX <= 0) return null;
  //   let newTime = ((e.pageX - left) * duration) / width;
  //   if (dragging === 'start' && newTime > end - MIN_LENGTH) {
  //     newTime = end - MIN_LENGTH < 0 ? 0 : end - MIN_LENGTH;
  //     setStart(prevState =>
  //       newTime >= RANGE_MIN && newTime <= RANGE_MAX ? newTime : prevState
  //     );
  //   }
  //   if (dragging === 'end' && newTime < start + MIN_LENGTH) {
  //     newTime = start + MIN_LENGTH > duration ? duration : start + MIN_LENGTH;
  //     setEnd(prevState =>
  //       newTime >= RANGE_MIN && newTime <= RANGE_MAX ? newTime : prevState
  //     );
  //   }
  // };

  const onInstanceEnter = () => {
    // console.log('onInstanceEnter');
    setHoveringInstance(true);
  };
  const onInstanceLeave = () => {
    // console.log('onInstanceLeave');
    setHoveringInstance(false);
    // setHoveringHandle(null);
  };

  const onHandleEnter = edge => {
    // console.log('onHandleEnter', edge);
    // setHoveringHandle(edge);
  };
  const onHandlePress = (e, edge) => {
    if (!e || !edge) return null;
    console.log('onHandlePress', e, edge);

    // e.persist();
    setDragging(edge);

    // props.setDraggedInstance(props.id);

    // setNewTime(e);
    // props.onHandlePress(edge);
  };
  const onHandleMove = e => {
    if (!dragging) return null;
    console.log('onHandleMove', e);

    // if (e.pageX <= 0) return null;
    // const v = ((e.pageX - rootRect.left) * duration) / rootRect.width;
    // setTime(v < 0 ? 0 : v > duration ? duration : v);
    // props.onChange(v);

    // setNewTime(e);
    // if (dragging) props.onHandleMove(dragging);
  };
  const onHandleRelease = e => {
    console.log('onHandleRelease', e);

    // props.onHandleRelease(dragging);
    // props.updateInstance({
    //   end_seconds: end,
    //   start_seconds: start,
    // });
    // props.setDraggedInstance(null);

    if (!dragging) return null;
    setDragging(null);
  };
  const onHandleLeave = () => {
    if (dragging) return null;
    setHoveringHandle(null);
    // setHoveringInstance(prevState => (prevState ? prevState : null));
  };
  const onHandleShift = (edge, dir) => {
    const prevInstance = _.maxBy(
      _.filter(instances, i => i.end_seconds <= start),
      i => i.end_seconds
    );
    const nextInstance = _.minBy(
      _.filter(instances, i => i.start_seconds >= end),
      i => i.start_seconds
    );

    // TODO: make sure that 'start' can’t go over 'end' - UNIT (and the other way around)
    const RANGE_MAX = nextInstance ? nextInstance.start_seconds : duration;
    const RANGE_MIN = prevInstance ? prevInstance.end_seconds : 0;
    const UNIT = duration / width;

    // TODO: clean the rest of this up
    const val = prevState => {
      if (dir === 'fwd') {
        return prevState + UNIT < RANGE_MAX ? prevState + UNIT : RANGE_MAX;
      } else if (dir === 'bwd') {
        return prevState - UNIT > RANGE_MIN ? prevState - UNIT : RANGE_MIN;
      }
    };

    if (dir === 'fwd') {
      edge === 'end'
        ? setEnd(prevState => val(prevState))
        : setStart(prevState => val(prevState));
    } else if (dir === 'bwd') {
      edge === 'end'
        ? setEnd(prevState => val(prevState))
        : setStart(prevState => val(prevState));
    }

    props.updateInstance({ start_seconds: start, end_seconds: end });
  };

  const classes = useStyles()();

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

  return (
    <>
      <div
        className={classes.instance}
        style={{
          left: `${x1}px`,
          width: `${instanceWidth}px`,
          zIndex: hoveringInstance ? `1000` : `default`,
        }}
        onMouseEnter={!isLocked ? onInstanceEnter : null}
        onMouseLeave={!isLocked ? onInstanceLeave : null}>
        {!isLocked ? (
          <div
            {...bindHover(instancePopupState)}
            style={{ width: `100%`, height: `28px` }}
          />
        ) : null}
      </div>
      {!dragging ? (
        <InstancePopover
          checkInstance={props.checkInstance}
          clipInstance={props.clipInstance}
          deleteInstance={props.deleteInstance}
          extendInstance={props.extendInstance}
          instance={props.instance}
          popupState={instancePopupState}
        />
      ) : null}

      {handles.map(handle => {
        const { edge, value } = handle;

        const isDragged = dragging === edge;
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
                left: edge === 'start' ? `${x1}px` : `${x2}px`,
                opacity: isActive || handlePopupState[edge].isOpen ? '1' : '0',
                transform: edge === 'end' ? 'translateX(-100%)' : 'none',
                width: dragging ? '1px' : '3px',
              }}>
              <Tooltip
                open={isDragged}
                placement="top"
                title={formatSeconds(value)}>
                <div
                  className={classes.handleThumb}
                  {...bindHover(handlePopupState[edge])}
                />
              </Tooltip>
            </div>
            {!dragging ? (
              <HandlePopover
                id={`${edge}HandlePopover`}
                moveBackward={() => onHandleShift(edge, 'bwd')}
                moveForward={() => onHandleShift(edge, 'fwd')}
                popupState={handlePopupState[edge]}
              />
            ) : null}
          </Fragment>
        );
      })}
    </>
  );
}

Instance.propTypes = {
  checkInstance: PropTypes.func,
  clipInstance: PropTypes.func,
  deleteInstance: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  extendInstance: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  instances: PropTypes.array.isRequired,
  isLocked: PropTypes.bool,
  onHandleMove: PropTypes.func.isRequired,
  onHandleRelease: PropTypes.func.isRequired,
  onHandlePress: PropTypes.func.isRequired,
  setDraggedInstance: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  updateInstance: PropTypes.func.isRequired,
  wrapper: PropTypes.object.isRequired,
};

Instance.defaultProps = {
  checkInstance: null,
  clipInstance: null,
  isLocked: null,
};
