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

  useEffect(() => {
    setRootRect(sliderRoot.current.getBoundingClientRect());
  }, [sliderRoot]);

  // const onHandlePress = time => {
  //   console.log('onHandlePress', { time });
  // };
  // const onHandleMove = time => {
  //   props.onDrag(time)
  // };
  // const onHandleRelease = time => {
  //   console.log('onHandleRelease', { time });
  // };

  return (
    <div className={classes.sliderRoot} ref={sliderRoot}>
      {rootRect
        ? instances.map(instance => {
            const { id, start_seconds, end_seconds } = instance;
            return (
              <Instance
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
