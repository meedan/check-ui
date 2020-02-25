import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Slider from 'rc-slider';
import _ from 'lodash';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Marker from './Marker';
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

  const { duration, currentTime, user } = props;

  const [threads, setThreads] = useState(props.threads);

  const onStartNewThread = () => {
    // adds a temp object as last to the existing threads array
    // setThreads(...threads, {
    //   key: 'value',
    // });
  };
  const onStopNewThread = () => {
    // removes last object added by result of onStartNewThread()
    setThreads(threads.splice(-1, 1));
  };

  const markers = _.reduce(
    threads,
    (object, param) => ({
      ...object,
      [param.start_seconds]: (
        <Marker
          key={param.id}
          onStopNewThread={onStopNewThread}
          thread={param}
          {...props}
        />
      ),
    }),
    {}
  );

  // console.group('Comments.js');
  // console.log({ props });
  // console.log({ threads });
  // console.log({ markers });
  // console.groupEnd();

  return (
    <TableSection
      title="Comments"
      actions={
        <Tooltip title="New comment">
          <IconButton onClick={onStartNewThread}>
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
            marks={markers}
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
