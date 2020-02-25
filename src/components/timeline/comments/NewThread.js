import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import React, { useEffect, useRef } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Form from './Form';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 32,
    width: 32,
    border: '1px solid white',
  },
  grid: {
    margin: '16px',
    width: '200px',
  },
}));

export default function NewThreadPopover(props) {
  const avatarRoot = useRef();
  const classes = useStyles();

  const open = Boolean(avatarRoot);
  const { user } = props.thread;

  const thisPopupState = usePopupState({
    variant: 'popover',
    popupId: 'newThreadPopupState',
  });

  const onCommentThreadCreate = text => {
    props.onCommentThreadCreate(text);
  };

  const onCommentThreadStop = () => {
    thisPopupState.close();
  };

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

  useEffect(() => {
    thisPopupState.open();
  }, []);

  if (!open) return null;

  return (
    <>
      <Avatar
        alt={`${user.first_name} ${user.last_name}`}
        className={classes.avatar}
        ref={avatarRoot}
        src={user.profile_img_url}
        {...bindTrigger(popupState)}
      />
      <Popover
        // onBackdropClick={props.stopNewThread}
        // onEscapeKeyDown={props.stopNewThread}
        anchorEl={avatarRoot}
        disableRestoreFocus
        onClick={e => e.stopPropagation()}
        {...bindPopover(thisPopupState)}
        {...popoverProps}>
        <Grid className={classes.grid}>
          <Form
            onCancel={onCommentThreadStop}
            onSubmit={onCommentThreadCreate}
          />
        </Grid>
      </Popover>
    </>
  );
}