import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import React, { useRef } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CommentForm from './CommentForm';

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

export default function NewCommentThreadPopover(props) {
  const classes = useStyles();
  const popoverRoot = useRef();

  const { user } = props.commentData;

  const onNewThreadStart = () => {
    console.group('onNewThreadStart()');
    console.log({ text });
    console.groupEnd();
  };

  return (
    <div ref={popoverRoot}>
      {open ? (
        <PopupState variant="popover" popupId="newCommentThread">
          {popupState => (
            <>
              <Avatar
                {...bindTrigger(popupState)}
                alt={`${user.first_name} ${user.last_name}`}
                className={classes.avatar}
                src={user.profile_img_url}
              />
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                anchorEl={this.avatarRef}
                disableRestoreFocus
                open={this.state.hasPopover}
                onEscapeKeyDown={props.stopNewCommentThread}
                onBackdropClick={props.stopNewCommentThread}
                onClick={e => e.stopPropagation()}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}>
                <Grid className={classes.grid}>
                  <CommentForm
                    isCreating
                    onCancel={() => {
                      this.setState({ hasPopover: false }, () =>
                        props.stopNewCommentThread()
                      );
                    }}
                    onSubmit={text => {
                      this.setState({ hasPopover: false }, () =>
                        props.saveNewCommentThread(text)
                      );
                    }}
                  />
                </Grid>
              </Popover>
            </>
          )}
        </PopupState>
      ) : null}
    </div>
  );
}

// class NewCommentThreadPopover extends Component {
//     this.state = {
//       hasPopover: false,
//     };
//   }

//   componentDidMount() {
//     this.setState({ hasPopover: true });
//   }

//   render() {
//     const open = Boolean(this.avatarRef);
//   }
// }
