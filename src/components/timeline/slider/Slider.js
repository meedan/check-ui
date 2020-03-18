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

export default function Slider({ duration, instances = [], ...props }) {
  const classes = useStyles();
  const sliderRoot = useRef();

  const [draggedInstance, setDraggedInstance] = useState();
  const [rootRect, setRootRect] = useState(null);

  //
  const getRootRect = () => {
    setRootRect(sliderRoot.current.getBoundingClientRect());
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
    return instances.map(
      ({ end_seconds, id, isProcessing, start_seconds, ...instance }) => {
        return (
          <Instance
            clipInstance={props.clipInstance}
            deleteInstance={() => props.deleteInstance(id)}
            duration={duration}
            end={end_seconds}
            instance={instance}
            instances={instances}
            isLocked={draggedInstance && draggedInstance !== id}
            isProcessing={isProcessing}
            key={id}
            lockSiblings={() => setDraggedInstance(id)}
            onHandleMove={props.onDrag}
            onHandlePress={props.onDragStart}
            onHandleRelease={props.onDragEnd}
            sliderRect={rootRect}
            start={start_seconds}
            updateInstance={payload => props.updateInstance(id, payload)}
          />
        );
      }
    );
  };

  return (
    <div className={classes.sliderRoot} ref={sliderRoot}>
      {renderInstances()}
    </div>
  );
}

Slider.propTypes = {
  clipInstance: PropTypes.func,
  deleteInstance: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  instances: PropTypes.array,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  returnSliderRect: PropTypes.func,
  updateInstance: PropTypes.func.isRequired,
};
