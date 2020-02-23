import Popover from 'material-ui-popup-state/HoverPopover';
import React, { useState } from 'react';
import {
  usePopupState,
  bindHover,
  bindPopover,
} from 'material-ui-popup-state/hooks';

import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CommentForm from './CommentForm';

const useStyles = makeStyles(theme => ({
  avatar: {
    height: 28,
    width: 28,
  },
  item: {
    width: '240px',
  },
  itemAvatar: {
    minWidth: '40px',
  },
  secondaryAction: {
    top: 8,
    transform: 'none',
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

export default function Comment(props) {
  const classes = useStyles();

  const {
    avatar,
    date,
    fname,
    id,
    isActionable,
    isRoot,
    lname,
    text,
    threadId,
  } = props;

  const [isEditing, setEditingStatus] = useState(false);
  const [isHovering, setHoveringStatus] = useState(false);
  const [isProcessing, setProcessingStatus] = useState(false);

  const popupState = usePopupState({
    popupId: 'MoreMenuItem',
    variant: 'popover',
  });

  const onCommentEditToggle = () => {
    setEditingStatus(true);
    popupState.close();
  };

  const onCommentEdit = text => {
    // TODO: wire this up to save changes to the comment
    // the first comment will have `isRoot` prop set
    // the first comment can be accessed with `id`
    // subsequent comments have also threadId (which is first comment’s id)

    setProcessingStatus(true);
    setEditingStatus(false);
    setTimeout(() => setProcessingStatus(false), 1000); // TODO: make this real

    console.group('onCommentEdit()');
    console.log(isRoot ? { id } : `${id} > ${threadId}`);
    console.log({ text });
    console.groupEnd();
  };
  const onCommentDelete = () => {
    // TODO: wire this up to delete comment
    setProcessingStatus(true);
    setEditingStatus(false);
    setTimeout(() => setProcessingStatus(false), 1000); // TODO: make this real
    popupState.close();
    console.group('onCommentDelete()');
    console.log({ threadId });
    console.log({ id });
    console.groupEnd();
  };

  const displayActions = () => {
    if (!isActionable) return null;
    return (
      <div
        style={{
          visibility: isHovering && !isEditing ? 'visible' : 'hidden',
        }}>
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
            <ListItem button onClick={onCommentEditToggle}>
              <ListItemText>Edit</ListItemText>
            </ListItem>
            {!isRoot ? (
              <ListItem button onClick={onCommentDelete}>
                <ListItemText>Delete</ListItemText>
              </ListItem>
            ) : null}
          </List>
        </Popover>
      </div>
    );
  };

  return (
    <div
      onMouseEnter={() => setHoveringStatus(true)}
      onMouseLeave={() => setHoveringStatus(false)}>
      <ListItem alignItems="flex-start" className={classes.item}>
        <ListItemAvatar className={classes.itemAvatar}>
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
              onSubmit={text => onCommentEdit(text, id)}
              value={text}
            />
          ) : (
            <Typography
              color="textSecondary"
              display="block"
              style={{ fontSize: '13px' }}
              variant="body2">
              {text}
            </Typography>
          )}
        </ListItemText>
        <ListItemSecondaryAction className={classes.secondaryAction}>
          {displayActions()}
        </ListItemSecondaryAction>
        {isProcessing && (
          <div className={classes.mask}>
            <CircularProgress size={22} />
          </div>
        )}
      </ListItem>
    </div>
  );
}
