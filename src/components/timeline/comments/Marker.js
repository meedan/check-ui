import PropTypes from 'prop-types';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import React from 'react';
import { anchorRef, bindHover, bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Popover from '@material-ui/core/Popover';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Thread from './Thread';

const useStyles = () =>
  makeStyles(theme => ({
    avatar: {
      height: 32,
      width: 32,
      border: '1px solid white',
    },
    hoverCard: {
      cursor: 'pointer',
    },
  }));

export default function Marker(props) {
  const classes = useStyles()();

  const { thread } = props;
  const { user } = thread;

  const readPopupState = usePopupState({
    variant: 'popover',
    popupId: 'markerReadPopover',
  });
  const editPopupState = usePopupState({
    variant: 'popover',
    popupId: 'markerEditPopover',
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
    disableScrollLock: true,
    hideBackdrop: true,
  };

  const onToggleActionable = e => {
    e.stopPropagation();
    readPopupState.close();
    editPopupState.open();
  };

  return (
    <>
      <Avatar
        {...bindHover(readPopupState)}
        {...bindTrigger(editPopupState)}
        alt={`${user.first_name} ${user.last_name}`}
        className={classes.avatar}
        ref={anchorRef(editPopupState)}
        src={user.profile_img_url}
      />
      <HoverPopover {...bindPopover(readPopupState)} {...popoverProps} disableRestoreFocus onClick={onToggleActionable}>
        <Card className={classes.hoverCard}>
          <Thread
            {...props}
            onClose={readPopupState.close}
            thread={thread}
            onCommentThreadDelete={threadId => {
              props.onCommentThreadDelete(threadId, readPopupState.close);
            }}
          />
        </Card>
      </HoverPopover>
      <Popover
        {...bindPopover(editPopupState)}
        {...popoverProps}
        disableRestoreFocus
        onClick={e => e.stopPropagation()}>
        <Card>
          <Thread
            {...props}
            isActionable={true}
            onClose={editPopupState.close}
            onCommentThreadDelete={threadId => {
              props.onCommentThreadDelete(threadId, editPopupState.close);
            }}
            thread={thread}
          />
        </Card>
      </Popover>
    </>
  );
}

Marker.propTypes = {
  onCommentCreate: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
  onCommentThreadDelete: PropTypes.func.isRequired,
};
