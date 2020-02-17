import Popover from 'material-ui-popup-state/HoverPopover';
import PropTypes from 'prop-types';
import React from 'react';
import { bindPopover } from 'material-ui-popup-state';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function HandlePopover({
  id,
  moveBackward,
  moveForward,
  popupState,
}) {
  return (
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
}

HandlePopover.propTypes = {
  id: PropTypes.string.isRequired,
  moveBackward: PropTypes.func.isRequired,
  moveForward: PropTypes.func.isRequired,
  popupState: PropTypes.object.isRequired,
};
