import Popover from 'material-ui-popup-state/HoverPopover';
import PropTypes from 'prop-types';
import React from 'react';
import { bindPopover } from 'material-ui-popup-state/hooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import CutIcon from '../../icons/Cut';

export default function InstancePopover({ instance, popupState, ...props }) {
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
      disablePortal={true}
      id="instancePopover"
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      {props.permalink ? (
        <Tooltip title="Copy permalink to clipboard">
          <CopyToClipboard text={props.permalink} onCopy={props.onInstanceCopyPermalink}>
            <IconButton>
              <FileCopyIcon fontSize="small" />
            </IconButton>
          </CopyToClipboard>
        </Tooltip>
      ) : null}
      {props.onInstanceClip ? (
        <Tooltip title="Copy to Clips">
          <IconButton onClick={e => fireAction(props.onInstanceClip, e)}>
            <CutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : null}
      <Tooltip title="Delete">
        <IconButton onClick={e => fireAction(props.onInstanceDelete, e)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Popover>
  );
}

InstancePopover.propTypes = {
  onInstanceClip: PropTypes.func,
  onInstanceDelete: PropTypes.func.isRequired,
  instance: PropTypes.object.isRequired,
  popupState: PropTypes.object.isRequired,
};
