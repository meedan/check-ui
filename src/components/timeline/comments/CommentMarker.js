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

import CommentThread from './CommentThread';
import NewThreadPopoover from './NewThreadPopover';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    border: '1px solid white',
  },
}));

export default function CommentPopover(props) {
  const classes = useStyles();

  const { commentData } = props;
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
          <CommentThread
            commentData={commentData}
            closePopup={readPopupState.close}
          />
        </Card>
      </HoverPopover>
      <Popover
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
          <CommentThread
            closePopup={editPopupState.close}
            commentData={commentData}
            isActionable
          />
        </Card>
      </Popover>
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
