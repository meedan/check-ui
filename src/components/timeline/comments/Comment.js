import Popover from 'material-ui-popup-state/HoverPopover';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  usePopupState,
  bindHover,
  bindPopover,
} from 'material-ui-popup-state/hooks';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Avatar,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CommentForm from './CommentForm';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 28,
    width: 28,
  },
  ListItem: {
    width: '240px',
  },
  listItemSecondaryAction: {
    top: 8,
    transform: 'none',
  },
  ListItemAvatar: {
    minWidth: '40px',
  },
  mask: {
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.66)',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    left: '0',
    position: 'absolute',
    right: '0',
    top: '0',
    zIndex: '2',
  },
}));

const ElSideControls = styled.div`
  visibility: hidden;
`;

const El = styled.div`
  ${({ hasAddornment }) =>
    hasAddornment
      ? `
  ${ElSideControls} {
    visibility: visible;
  }
`
      : ''};
`;

export default function Comment(props) {
  const classes = useStyles();

  const {
    isRoot,
    isActionable,
    id,
    threadId,
    fname,
    lname,
    avatar,
    date,
    text,
  } = props;

  const [isEditing, setEditingStatus] = useState(false);
  const [isProcessing, setProcessingStatus] = useState(false);
  const [isHovering, setHoveringStatus] = useState(false);

  const popupState = usePopupState({
    popupId: 'MoreMenuItem',
    variant: 'popover',
  });

  const toggleCommentEdit = () => {
    setEditingStatus(true);
    popupState.close();
  };
  const handleCommentEdit = text => {
    // TODO: wire this up to save changes to the comment
    // the first comment will have `isRoot` prop set
    // the first comment can be accessed with `id`
    // subsequent comments have also threadId (which is first comment’s id)

    setProcessingStatus(true);
    setEditingStatus(false);
    setTimeout(() => setProcessingStatus(false), 1000); // TODO: make this real

    console.group('handleCommentEdit()');
    console.log(isRoot ? { id } : `${id} > ${threadId}`);
    console.log({ text });
    console.groupEnd();
  };
  const handleCommentDelete = () => {
    // TODO: wire this up to delete comment
    setProcessingStatus(true);
    setEditingStatus(false);
    setTimeout(() => setProcessingStatus(false), 1000); // TODO: make this real
    popupState.close();
    console.group('handleCommentDelete()');
    console.log({ threadId });
    console.log({ id });
    console.groupEnd();
  };

  const displayActions = () => {
    if (isActionable) {
      return (
        <>
          <ElSideControls>
            <IconButton {...bindHover(popupState)}>
              <MoreVertIcon />
            </IconButton>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              disableRestoreFocus>
              <List dense>
                <ListItem button onClick={toggleCommentEdit}>
                  <ListItemText>Edit</ListItemText>
                </ListItem>
                {!isRoot ? (
                  <ListItem button onClick={handleCommentDelete}>
                    <ListItemText>Delete</ListItemText>
                  </ListItem>
                ) : null}
              </List>
            </Popover>
          </ElSideControls>
        </>
      );
    }
    return null;
  };

  return (
    <El
      hasAddornment={isHovering && !isEditing}
      onMouseEnter={() => setHoveringStatus(true)}
      onMouseLeave={() => setHoveringStatus(false)}>
      <ListItem alignItems="flex-start" className={classes.ListItem} key={id}>
        <ListItemAvatar className={classes.ListItemAvatar}>
          <Tooltip
            title={
              <Typography align="center" color="inherit" variant="caption">
                {date}
              </Typography>
            }>
            <Avatar
              alt={`${fname} ${lname}`}
              src={avatar}
              className={classes.avatar}
            />
          </Tooltip>
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="body2">{`${fname} ${lname}`}</Typography>
          {isEditing ? (
            <CommentForm
              isEditing
              onCancel={() => setEditingStatus(false)}
              onSubmit={text => handleCommentEdit(text, id)}
              value={text}
            />
          ) : (
            <Typography
              color="textSecondary"
              display="block"
              variant="body2"
              style={{ fontSize: '13px' }}>
              {text}
            </Typography>
          )}
        </ListItemText>
        <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
          {displayActions()}
        </ListItemSecondaryAction>
        {isProcessing && (
          <div className={classes.mask}>
            <CircularProgress size={22} />
          </div>
        )}
      </ListItem>
    </El>
  );
}
