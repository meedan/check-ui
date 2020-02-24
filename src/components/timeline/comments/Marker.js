import PropTypes from 'prop-types';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import React from 'react';
import {
  usePopupState,
  bindHover,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Popover from '@material-ui/core/Popover';
import makeStyles from '@material-ui/core/styles/makeStyles';

import NewThread from './NewThread';
import Thread from './Thread';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    border: '1px solid white',
  },
}));

export default function Marker(props) {
  const classes = useStyles();

  const { thread } = props;
  const { isBeingAdded, user } = thread;

  const readPopupState = usePopupState({
    variant: 'popover',
    popupId: 'readMarkerPopup',
  });
  const editPopupState = usePopupState({
    variant: 'popover',
    popupId: 'editMarkerPopup',
  });

  const popoverProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
  };

  const existingThread = (
    <>
      <Avatar
        alt={`${user.first_name} ${user.last_name}`}
        className={classes.avatar}
        src={user.profile_img_url}
        {...bindHover(readPopupState)}
        {...bindTrigger(editPopupState)}
      />
      <HoverPopover
        disableRestoreFocus
        onClick={e => e.stopPropagation()}
        {...bindPopover(readPopupState)}
        {...popoverProps}>
        <Card>
          <Thread
            closePopup={readPopupState.close}
            thread={thread}
            {...props}
          />
        </Card>
      </HoverPopover>
      <Popover
        disableRestoreFocus
        onClick={e => e.stopPropagation()}
        {...bindPopover(editPopupState)}
        {...popoverProps}>
        <Card>
          <Thread
            closePopup={editPopupState.close}
            isActionable
            thread={thread}
            {...props}
          />
        </Card>
      </Popover>
    </>
  );

  const newThread = <NewThread thread={thread} user={user} {...props} />;

  return isBeingAdded ? newThread : existingThread;
}

Marker.propTypes = {
  onCommentCreate: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
  onCommentThreadCreate: PropTypes.func.isRequired,
  onCommentThreadDelete: PropTypes.func.isRequired,
};
