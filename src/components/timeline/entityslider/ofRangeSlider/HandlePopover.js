import { bindPopover } from 'material-ui-popup-state';
import { func, object, string } from 'prop-types';
import Popover from 'material-ui-popup-state/HoverPopover';
import React from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const HandlePopover = ({ moveBackward, moveForward, id, popupState }) => (
  <Popover
    {...bindPopover(popupState)}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    id={id}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}>
    <Tooltip placement="bottom" title="Move backward">
      <IconButton
        onClick={e => {
          e.stopPropagation();
          moveBackward();
        }}>
        <ArrowBackIcon fontSize="small" />
      </IconButton>
    </Tooltip>
    <Tooltip placement="bottom" title="Move forward">
      <IconButton
        onClick={e => {
          e.stopPropagation();
          moveForward();
        }}>
        <ArrowForwardIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Popover>
);

export default HandlePopover;

HandlePopover.propTypes = {
  moveBackward: func.isRequired,
  moveForward: func.isRequired,
  popupState: object.isRequired,
  id: string.isRequired,
};
