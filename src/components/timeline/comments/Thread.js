import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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

const useStyles = isActionable =>
  makeStyles(theme => ({
    list: {
      cursor: isActionable ? 'pointer' : 'inherit',
      maxHeight: '300px',
      overflowY: 'auto',
    },
    subheader: {
      background: grey[200],
    },
    buttonProgress: {
      marginRight: 8,
    },
    formWrapper: {
      margin: theme.spacing(2),
    },
  }));

export default function Thread(props) {
  const classes = useStyles(props.isActionable)();
  const { isActionable, thread } = props;
  const { c_pretty_created_date, replies, start_seconds, text, user } = thread;

  // make clear what is what
  const threadId = thread.id;

  const [isProcessing, setProcessingState] = useState(false);

  const onCommentCreate = (text, formCallback) => {
    setProcessingState(true);
    const callback = () => {
      formCallback();
      setProcessingState(false);
    };
    props.onCommentCreate(threadId, text, callback);
  };

  const onCommentThreadDelete = () => {
    setProcessingState(true);
    props.onCommentThreadDelete(threadId);
  };

  return (
    <>
      <List
        dense
        component="ul"
        subheader={
          <ListItem component="div" className={classes.subheader}>
            <ListItemText>
              <Typography color="textSecondary" variant="overline">
                {formatTime(start_seconds)}
              </Typography>
            </ListItemText>
            {isActionable ? (
              <ListItemSecondaryAction>
                {isProcessing ? (
                  <CircularProgress size={16} className={classes.buttonProgress} />
                ) : (
                  <IconButton aria-label="Delete thread" onClick={onCommentThreadDelete}>
                    <Tooltip
                      title={
                        <FormattedMessage
                          id="thread.tooltipDelete"
                          defaultMessage="Delete thread"
                        />
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </Tooltip>
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            ) : null}
          </ListItem>
        }
        className={classes.list}>
        <Comment
          {...props}
          avatar={user.profile_img_url}
          date={c_pretty_created_date}
          fname={user.first_name}
          id={threadId}
          isActionable={isActionable}
          isRoot
          lname={user.last_name}
          text={text}
          threadId={threadId}
        />
        {replies?.length > 0
          ? replies.map((reply, i) => {
              return (
                <Comment
                  {...props}
                  avatar={reply.user.profile_img_url}
                  date={reply.c_pretty_created_date}
                  fname={reply.user.first_name}
                  id={reply.id}
                  isActionable={isActionable}
                  key={reply.id}
                  lname={reply.user.last_name}
                  text={reply.text}
                  threadId={reply.thread_id}
                />
              );
            })
          : null}
      </List>

      {isActionable ? (
        <div className={classes.formWrapper}>
          <Form onCancel={props.onClose} onSubmit={onCommentCreate} />
        </div>
      ) : null}
    </>
  );
}

Thread.propTypes = {
  onClose: PropTypes.func.isRequired,
  onCommentCreate: PropTypes.func.isRequired,
  onCommentThreadDelete: PropTypes.func.isRequired,
  thread: PropTypes.object.isRequired,
  isActionable: PropTypes.bool,
};

Thread.defaultProps = {
  isActionable: null,
  thread: null,
};
