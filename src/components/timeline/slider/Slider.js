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

export default function Slider(props) {
  const classes = useStyles();
  const sliderRoot = useRef();

  const { duration, instances } = props;

  const [draggedInstance, setDraggedInstance] = useState();
  const [rootRect, setRootRect] = useState(null);

  const updateRootRect = () => {
    setRootRect(sliderRoot.current.getBoundingClientRect());
  };

  useEffect(() => {
    updateRootRect();
  }, [sliderRoot]);

  useEffect(() => {
    window.addEventListener('resize', updateRootRect);
    return () => window.removeEventListener('resize', updateRootRect);
  });

  return (
    <div className={classes.sliderRoot} ref={sliderRoot}>
      {rootRect
        ? instances.map(instance => {
            const { id, start_seconds, end_seconds } = instance;
            return (
              <Instance
                clipInstance={props.clipInstance}
                deleteInstance={() => props.deleteInstance(id)}
                updateInstance={payload => props.updateInstance(id, payload)}
                //
                duration={duration}
                end={end_seconds}
                instance={instance}
                instances={instances}
                isLocked={draggedInstance && draggedInstance !== id}
                key={id}
                lockSiblings={() => setDraggedInstance(id)}
                onHandleMove={props.onDrag}
                onHandlePress={props.onDragStart}
                onHandleRelease={props.onDragEnd}
                sliderRect={rootRect}
                start={start_seconds}
              />
            );
          })
        : null}
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
  updateInstance: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  clipInstance: null,
  instances: [],
};
