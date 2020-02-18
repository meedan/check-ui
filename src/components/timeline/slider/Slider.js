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
  const [dragging, setDragging] = useState(false);
  const [rootRect, setRootRect] = useState(null);

  useEffect(() => {
    setRootRect(sliderRoot.current.getBoundingClientRect());
  }, [sliderRoot]);

  const onHandlePress = args => {
    setDragging(true);
    // console.log('onHandlePress', { args });
    props.onDragStart(args);
  };
  const onHandleMove = args => {
    if (!dragging) return null;
    // console.log('onHandleMove', { args });
    props.onDrag(args);
  };
  const onHandleRelease = args => {
    setDragging(false);
    // console.log('onHandleRelease', { args });
    props.onDragEnd(args);
  };

  return (
    <div className={classes.sliderRoot} ref={sliderRoot}>
      {rootRect
        ? instances.map(instance => {
            const { id, start_seconds, end_seconds } = instance;
            return (
              <Instance
                onHandleMove={onHandleMove}
                onHandlePress={onHandlePress}
                onHandleRelease={onHandleRelease}
                //
                checkInstance={props.checkInstance}
                clipInstance={props.clipInstance}
                deleteInstance={() => props.deleteInstance(id)}
                extendInstance={() => props.extendInstance(id)}
                updateInstance={payload => props.updateInstance(id, payload)}
                //
                duration={duration}
                end={end_seconds}
                instance={instance}
                instances={instances}
                isLocked={draggedInstance && draggedInstance !== id}
                key={id}
                lockSiblings={() => setDraggedInstance(id)}
                start={start_seconds}
                sliderRect={rootRect}
              />
            );
          })
        : null}
    </div>
  );
}

Slider.propTypes = {
  checkInstance: PropTypes.func,
  clipInstance: PropTypes.func,
  deleteInstance: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  extendInstance: PropTypes.func.isRequired,
  instances: PropTypes.array,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  updateInstance: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  checkInstance: null,
  clipInstance: null,
  instances: [],
};
