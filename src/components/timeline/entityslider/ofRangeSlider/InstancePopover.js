import { bindPopover } from 'material-ui-popup-state';
import { func, object } from 'prop-types';
import Popover from 'material-ui-popup-state/HoverPopover';
import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import CheckIcon from '../../../icons/Check';
import CutIcon from '../../../icons/Cut';
import ExpandIcon from '../../../icons/Expand';

const InstancePopover = ({
  checkInstance,
  clipInstance,
  deleteInstance,
  extendInstance,
  instance,
  popupState,
}) => {
  const fireAction = (fn, e) => {
    e.stopPropagation();
    popupState.close();
    fn(instance.id);
  };
  return (
    <Popover
      {...bindPopover(popupState)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id="InstancePopover"
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      {clipInstance ? (
        <Tooltip title="Copy to Clips">
          <IconButton onClick={e => fireAction(clipInstance, e)}>
            <CutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : null}
      {checkInstance ? (
        <Tooltip title="Open in Check">
          <IconButton onClick={e => fireAction(checkInstance, e)}>
            <CheckIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : null}
      <Tooltip title="Extend full-length">
        <IconButton onClick={e => fireAction(extendInstance, e)}>
          <ExpandIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={e => fireAction(deleteInstance, e)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Popover>
  );
};

export default InstancePopover;

InstancePopover.propTypes = {
  checkInstance: func,
  clipInstance: func,
  deleteInstance: func.isRequired,
  extendInstance: func.isRequired,
  instance: object.isRequired,
  popupState: object.isRequired,
};

InstancePopover.defaultProps = {
  checkInstance: null,
  clipInstance: null,
};
