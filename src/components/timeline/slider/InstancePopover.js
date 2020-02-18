import Popover from 'material-ui-popup-state/HoverPopover';
import PropTypes from 'prop-types';
import React from 'react';
import { bindPopover } from 'material-ui-popup-state/hooks';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CutIcon from '../../icons/Cut';

export default function InstancePopover(props) {
  const { clipInstance, deleteInstance, instance, popupState } = props;
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
      id="instancePopover"
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
      <Tooltip title="Delete">
        <IconButton onClick={e => fireAction(deleteInstance, e)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Popover>
  );
}

InstancePopover.propTypes = {
  clipInstance: PropTypes.func,
  deleteInstance: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  popupState: PropTypes.object.isRequired,
};

InstancePopover.defaultProps = {
  clipInstance: null,
};
