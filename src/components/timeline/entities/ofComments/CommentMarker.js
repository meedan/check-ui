/** @format */

import React from 'react';
import { usePopupState, bindHover, bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';
import HoverPopover from 'material-ui-popup-state/HoverPopover';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import TriggerPopover from '@material-ui/core/Popover';

import CommentThread from './CommentThread';
import NewThreadPopoover from './NewThreadPopover';

const styles = {
  avatar: {
    height: 32,
    width: 32,
    border: '1px solid white',
  },
};

function CommentPopover(props) {
  const { classes, commentData } = props;
  const { isBeingAdded, user } = commentData;

  const readPopupState = usePopupState({
    variant: 'popover',
    popupId: 'readCommentPopoverPopup',
  });
  const editPopupState = usePopupState({
    variant: 'popover',
    popupId: 'editCommentPopoverPopup',
  });

  const existingThread = (
    <>
      <Avatar
        {...bindHover(readPopupState)}
        {...bindTrigger(editPopupState)}
        alt={`${user.first_name} ${user.last_name}`}
        className={classes.avatar}
        src={user.profile_img_url}
      />
      <HoverPopover
        {...bindPopover(readPopupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
        onClick={e => e.stopPropagation()}>
        <Card>
          <CommentThread commentData={commentData} closePopup={readPopupState.close} />
        </Card>
      </HoverPopover>
      <TriggerPopover
        {...bindPopover(editPopupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
        onClick={e => e.stopPropagation()}>
        <Card>
          <CommentThread closePopup={editPopupState.close} commentData={commentData} isActionable />
        </Card>
      </TriggerPopover>
    </>
  );

  return (
    <div>
      {isBeingAdded ? (
        <NewThreadPopoover
          commentData={commentData}
          saveNewCommentThread={props.saveNewCommentThread}
          stopNewCommentThread={props.stopNewCommentThread}
          user={user}
        />
      ) : (
        existingThread
      )}
    </div>
  );
}

export default withStyles(styles)(CommentPopover);
