import Popover from 'material-ui-popup-state/HoverPopover';
import PropTypes from 'prop-types';
import React from 'react';
import { bindPopover } from 'material-ui-popup-state';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CheckIcon from '../../icons/Check';
import CutIcon from '../../icons/Cut';
import ExpandIcon from '../../icons/Expand';

export default function InstancePopover(props) {
  const {
    checkInstance,
    clipInstance,
    deleteInstance,
    extendInstance,
    instance,
    popupState,
  } = props;
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
}

InstancePopover.propTypes = {
  checkInstance: PropTypes.func,
  clipInstance: PropTypes.func,
  deleteInstance: PropTypes.func.isRequired,
  extendInstance: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  popupState: PropTypes.object.isRequired,
};

InstancePopover.defaultProps = {
  checkInstance: null,
  clipInstance: null,
};
