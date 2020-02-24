import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Comment from './Comment';
import Form from './Form';
import formatTime from '../utils/formatTime';

const useStyles = makeStyles(theme => ({
  List: {
    maxHeight: '300px',
    overflowY: 'auto',
  },
  ListSubheader: {
    background: grey[200],
  },
  buttonProgress: {
    marginRight: 8,
  },
}));

export default function Thread(props) {
  const classes = useStyles();
  const {
    c_pretty_created_date,
    replies,
    start_seconds,
    text,
    user,
  } = props.thread;

  // make clear what is what
  const threadId = props.thread.id;

  const [isActionable, setActionableState] = useState(props.isActionable);
  const [isProcessing, setProcessingState] = useState(false);

  const onCommentCreate = text => {
    setProcessingState(true);
    props.onCommentCreate(threadId, text, setProcessingState(false));
  };

  const onCommentThreadDelete = () => {
    setProcessingState(true);
    props.onCommentThreadDelete(threadId);
  };

  return (
    <List
      onClick={!isActionable ? () => setActionableState(true) : null}
      dense
      component="div"
      subheader={
        <>
          <ListItem component="div" className={classes.ListSubheader}>
            <ListItemText>
              <Typography color="textSecondary" variant="overline">
                {formatTime(start_seconds)}
              </Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              {isActionable ? (
                isProcessing ? (
                  <CircularProgress
                    size={16}
                    className={classes.buttonProgress}
                  />
                ) : (
                  <IconButton
                    aria-label="Delete thread"
                    onClick={onCommentThreadDelete}>
                    <Tooltip title="Delete thread">
                      <DeleteIcon fontSize="small" />
                    </Tooltip>
                  </IconButton>
                )
              ) : null}
            </ListItemSecondaryAction>
          </ListItem>
        </>
      }
      style={{ cursor: isActionable ? 'pointer' : 'inherit' }}
      className={classes.List}>
      <Comment
        avatar={user.profile_img_url}
        date={c_pretty_created_date}
        fname={user.first_name}
        id={threadId}
        isActionable={isActionable}
        isRoot
        lname={user.last_name}
        text={text}
        threadId={threadId}
        {...props}
      />
      {replies.map((reply, i) => {
        return (
          <Comment
            avatar={reply.user.profile_img_url}
            date={reply.c_pretty_created_date}
            fname={reply.user.first_name}
            id={reply.id}
            isActionable={isActionable}
            key={reply.id}
            lname={reply.user.last_name}
            text={reply.text}
            threadId={reply.thread_id}
            {...props}
          />
        );
      })}
      {isActionable ? (
        <ListItem>
          <ListItemText>
            <Form onCancel={props.onClose} onSubmit={onCommentCreate} />
          </ListItemText>
        </ListItem>
      ) : null}
    </List>
  );
}

Thread.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCommentThreadDelete: PropTypes.func.isRequired,
  thread: PropTypes.object.isRequired,
  // isActionable: PropTypes.bool,
  // onCommentCreate: PropTypes.func.isRequired,
};

Thread.defaultProps = {
  isActionable: null,
  thread: null,
};
