import PropTypes from 'prop-types';
import Popover from 'material-ui-popup-state/HoverPopover';
import React, { useState } from 'react';
import { usePopupState, bindHover, bindPopover } from 'material-ui-popup-state/hooks';

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

import Form from './Form';

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

  const { avatar, date, fname, isActionable, isRoot, lname, text, threadId } = props;

  const [isEditing, setEditingState] = useState(false);
  const [isHovering, setHoveringState] = useState(false);
  const [isProcessing, setProcessingState] = useState(false);

  // make obvious what is what
  const commentId = props.id;

  const popupState = usePopupState({
    popupId: 'replyActionsPopover',
    variant: 'popover',
  });

  const onCommentStop = () => {
    setEditingState(false);
    popupState.close();
  };

  const onCommentEditToggle = () => {
    setEditingState(true);
    popupState.close();
  };

  const onCommentEdit = text => {
    setProcessingState(true);
    setEditingState(false);
    props.onCommentEdit(threadId, commentId, text, () => {
      setProcessingState(false);
      setEditingState(false);
    });
  };

  const onCommentDelete = () => {
    setProcessingState(true);
    props.onCommentDelete(threadId, commentId);
  };

  const displayActions = () => {
    if (!isActionable) return null;
    return (
      <div
        style={{
          visibility: isHovering && !isEditing ? 'visible' : 'hidden',
        }}>
        <IconButton {...bindHover(popupState)} data-testid="comment-toggle-actions">
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
      onMouseEnter={() => setHoveringState(true)}
      onMouseLeave={() => setHoveringState(false)}
      data-testid="thread-reply">
      <ListItem alignItems="flex-start" className={classes.item}>
        <ListItemAvatar className={classes.itemAvatar}>
          <Tooltip
            title={
              <Typography align="center" color="inherit" variant="caption">
                {date}
              </Typography>
            }>
            <Avatar alt={`${fname} ${lname}`} src={avatar} className={classes.avatar} />
          </Tooltip>
        </ListItemAvatar>
        <ListItemText>
          <Typography variant="body2">{`${fname} ${lname}`}</Typography>
          {isEditing ? (
            <Form
              onCancel={onCommentStop}
              onSubmit={text.length > 0 ? onCommentEdit : onCommentStop}
              value={text}
              isEditing={isEditing}
            />
          ) : (
            <Typography color="textSecondary" display="block" style={{ fontSize: '13px' }} variant="body2">
              {text}
            </Typography>
          )}
        </ListItemText>
        {isProcessing && (
          <div className={classes.mask}>
            <CircularProgress size={22} />
          </div>
        )}
        <ListItemSecondaryAction className={classes.secondaryAction}>{displayActions()}</ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}

Comment.propTypes = {
  isActionable: PropTypes.bool,
  onCommentCreate: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  isActionable: false,
};
