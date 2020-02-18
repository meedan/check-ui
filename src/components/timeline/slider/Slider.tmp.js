import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
  const sliderRoot = React.useRef();

  const { duration, instances } = props;

  const [draggedInstance, setDraggedInstance] = React.useState();
  const [wrapper, setWrapper] = React.useState();

  const updateRef = () => {
    if (!sliderRoot && !sliderRoot.current) return null;
    setWrapper({
      ref: sliderRoot.current,
      rect: sliderRoot.current.getBoundingClientRect(),
    });
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateRef);
    return () => window.removeEventListener('resize', updateRef);
  }, [updateRef]);

  React.useEffect(() => {
    setWrapper(sliderRoot);
  }, [sliderRoot]);

  console.group('Slider');
  console.log(props);
  console.log(wrapper);
  console.log(draggedInstance);
  console.groupEnd();

  return (
    <div className={classes.sliderRoot} ref={sliderRoot}>
      {instances.map(instance => {
        const { id, start_seconds, end_seconds } = instance;
        return (
          <Instance
            checkInstance={props.checkInstance}
            clipInstance={props.clipInstance}
            deleteInstance={() => props.deleteInstance(id)}
            duration={duration}
            end={end_seconds}
            extendInstance={() => props.extendInstance(id)}
            id={id}
            instance={instance}
            instances={instances}
            isLocked={draggedInstance && draggedInstance !== id}
            key={id}
            onDrag={payload => props.onDrag(payload)}
            onDragEnd={payload => props.onDragEnd(payload)}
            onDragStart={payload => props.onDragStart(payload)}
            setDraggedInstance={setDraggedInstance}
            start={start_seconds}
            updateInstance={payload => props.updateInstance(id, payload)}
            wrapper={wrapper}
          />
        );
      })}
    </div>
  );
}

Slider.propTypes = {
  checkInstance: PropTypes.func,
  clipInstance: PropTypes.func,
  deleteInstance: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  extendInstance: PropTypes.func.isRequired,
  instances: PropTypes.array.isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  updateInstance: PropTypes.func.isRequired,
};

Slider.defaultProps = {
  checkInstance: null,
  clipInstance: null,
};
