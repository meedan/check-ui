import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Instance from './Instance';

const useStyles = makeStyles(theme => ({
  sliderRoot: {
    height: '28px',
    position: 'relative',
    userSelect: 'none',
    width: '100%',
  },
}));

export default function Slider({ activeInstanceId = null, duration, instances = [], ...props }) {
  const classes = useStyles();
  const sliderRoot = useRef();

  const [draggedInstance, setDraggedInstance] = useState();
  const [rootRect, setRootRect] = useState(null);

  //
  const getRootRect = () => {
    if (sliderRoot?.current) setRootRect(sliderRoot.current.getBoundingClientRect());
  };

  // get rootRect on component mount
  useEffect(() => {
    getRootRect();
  }, [sliderRoot]);

  // recalc rootRect on window resize
  useEffect(() => {
    window.addEventListener('resize', getRootRect);
    return () => window.removeEventListener('resize', getRootRect);
  });

  // pass rootRect up to Entities where it’s needed to calc new instance default width
  useEffect(() => {
    if (props.returnSliderRect) props.returnSliderRect(rootRect);
  }, [rootRect]);

  const renderInstances = () => {
    if (!rootRect) return null;
    return instances.map(({ end_seconds, id, isLocal, start_seconds, url, ...instance }) => {
      return (
        <Instance
          duration={duration}
          end={end_seconds}
          entityType={props.entityType}
          id={id}
          instance={instance}
          instances={instances}
          isLocal={isLocal}
          isLocked={draggedInstance && draggedInstance !== id}
          isSelected={activeInstanceId === id}
          key={id}
          lockSiblings={() => setDraggedInstance(id)}
          onHandleMove={props.onDrag}
          onHandlePress={props.onDragStart}
          onHandleRelease={props.onDragEnd}
          onInstanceClip={props.onInstanceClip ? () => props.onInstanceClip(id) : null}
          onInstanceDelete={() => props.onInstanceDelete(id)}
          onInstanceUpdate={payload => props.onInstanceUpdate(id, payload)}
          onScrub={props.onScrub}
          permalink={url}
          sliderRect={rootRect}
          start={start_seconds}
        />
      );
    });
  };

  return (
    <div className={classes.sliderRoot} ref={sliderRoot}>
      {renderInstances()}
    </div>
  );
}

Slider.propTypes = {
  activeInstanceId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  duration: PropTypes.number.isRequired,
  instances: PropTypes.array,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onInstanceClip: PropTypes.func,
  onInstanceDelete: PropTypes.func.isRequired,
  onInstanceUpdate: PropTypes.func.isRequired,
  returnSliderRect: PropTypes.func,
};
