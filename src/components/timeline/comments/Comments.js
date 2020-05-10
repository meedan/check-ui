import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import _ from 'lodash';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Marker from './Marker';
import NewMarker from './NewMarker';
import TableSection from '../elements/TableSection';

const useStyles = makeStyles(theme => ({
  sliderRoot: {
    '& .rc-slider-mark-text': {
      height: '32px',
      width: '32px',
      transform: 'translateY(-27px) !important',
      zIndex: 600,
    },
    '& .rc-slider-disabled, & .rc-slider-disabled .rc-slider-rail': {
      background: 'transparent',
    },
    '& .rc-slider-disabled .rc-slider-mark-text': {
      cursor: 'pointer !important',
    },
    '& .rc-slider-dot': {
      visibility: 'hidden',
    },
  },
}));

export default function Comments(props) {
  const classes = useStyles();

  const { duration, currentTime, threads, user } = props;

  const [newTime, setNewTime] = useState(0);
  const [isCreating, setCreatingState] = useState(false);

  const onCommentThreadStart = () => {
    setCreatingState(true);
  };
  const onCommentThreadStop = () => {
    setCreatingState(false);
  };
  const onCommentThreadCreate = (text, popupCallback) => {
    const callback = () => {
      popupCallback();
      setCreatingState(false);
    };
    props.onCommentThreadCreate(newTime, text, callback);
  };

  const markers = _.reduce(
    threads,
    (object, param) => ({
      ...object,
      [param.start_seconds]: <Marker {...props} key={param.id} thread={param} />,
    }),
    {}
  );

  const newThread = {
    id: Date.now() + Math.random(),
    replies: [],
    start_seconds: newTime,
    text: '',
    user: user,
  };

  const newMarker = (
    <NewMarker
      key={newThread.id}
      onCommentThreadCreate={onCommentThreadCreate}
      onCommentThreadStop={onCommentThreadStop}
      thread={newThread}
    />
  );

  useEffect(() => {
    if (isCreating) return null;
    setNewTime(currentTime);
  }, [currentTime]);

  return (
    <TableSection
      title="Comments"
      actions={
        <Tooltip title="New comment">
          <IconButton onClick={onCommentThreadStart} data-testid="new-comment-thread-button">
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      firstRowContent={
        <div className={classes.sliderRoot}>
          <Slider
            defaultValue={null}
            disabled
            included={false}
            marks={isCreating ? { ...markers, [newTime]: newMarker } : markers}
            max={duration}
            min={0}
            value={null}
          />
        </div>
      }
    />
  );
}

Comments.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number.isRequired,
  onCommentCreate: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
  onCommentThreadCreate: PropTypes.func.isRequired,
  onCommentThreadDelete: PropTypes.func.isRequired,
  threads: PropTypes.array,
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    last_name: PropTypes.string.isRequired,
    profile_img_url: PropTypes.string.isRequired,
  }).isRequired,
};

Comments.defaultProps = {
  currentTime: 0,
  threads: [],
};
