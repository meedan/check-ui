/** @format */

import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';

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
import { withStyles } from '@material-ui/core/styles';

import Comment from './Comment';
import CommentForm from './CommentForm';

import formatTime from '../formatTime';

const styles = {
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
};

class CommentThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      processing: null,
      isActionable: this.props.isActionable,
    };
  }

  handleThreadReply = comment => {
    // TODO: wire adding new comments here, also log user data
    console.group('handleThreadReply()');
    console.log({ comment });
    console.groupEnd();
  };
  handleThreadDelete = threadId => {
    // TODO: wire deleting comment thread here
    console.group('handleThreadDelete()');
    console.log({ threadId });
    console.groupEnd();
    this.setState({ processing: true });
    setTimeout(() => this.props.closePopup(), 1000);
  };

  render() {
    const { classes, commentData } = this.props;
    const { isActionable } = this.state;
    const { c_pretty_created_date, replies, start_seconds, text, user, id } = commentData;
    const threadId = id;

    return (
      <List
        onClick={!isActionable ? () => this.setState({ isActionable: true }) : null}
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
                  this.state.isProcessing ? (
                    <CircularProgress size={16} className={classes.buttonProgress} />
                  ) : (
                    <IconButton aria-label="Delete thread" onClick={() => this.handleThreadDelete(threadId)}>
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
            />
          );
        })}
        {isActionable ? (
          <ListItem>
            <ListItemText>
              <CommentForm onCancel={this.props.closePopup} onSubmit={this.handleThreadReply} />
            </ListItemText>
          </ListItem>
        ) : null}
      </List>
    );
  }
}

export default withStyles(styles)(CommentThread);

CommentThread.propTypes = {
  closePopup: func.isRequired,
  isActionable: bool,
  commentData: object,
};

CommentThread.defaultProps = {
  isActionable: null,
  commentData: null,
};
