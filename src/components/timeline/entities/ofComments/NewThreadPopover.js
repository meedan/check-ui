/** @format */

import React, { Component } from 'react'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Popover from '@material-ui/core/Popover'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

import CommentForm from './CommentForm'

const styles = {
  avatar: {
    height: 32,
    width: 32,
    border: '1px solid white',
  },
  Grid: {
    margin: '16px',
    width: '200px',
  },
}

class NewCommentThreadPopover extends Component {
  constructor(props) {
    super(props)
    this.avatarRef = null
    this.state = {
      hasPopover: false,
    }
  }

  componentDidMount() {
    this.setState({ hasPopover: true })
  }

  handleStartNewThread(text) {
    console.group('handleStartNewThread()')
    console.log({ text })
    console.groupEnd()
  }

  render() {
    const { classes, commentData } = this.props
    const { user } = commentData
    const open = Boolean(this.avatarRef)
    return (
      <div ref={el => (this.avatarRef = el)}>
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
                  onEscapeKeyDown={this.props.stopNewCommentThread}
                  onBackdropClick={this.props.stopNewCommentThread}
                  onClick={e => e.stopPropagation()}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}>
                  <Grid className={classes.Grid}>
                    <CommentForm
                      isCreating
                      onCancel={() => {
                        this.setState({ hasPopover: false }, () => this.props.stopNewCommentThread())
                      }}
                      onSubmit={text => {
                        this.setState({ hasPopover: false }, () => this.props.saveNewCommentThread(text))
                      }}
                    />
                  </Grid>
                </Popover>
              </>
            )}
          </PopupState>
        ) : null}
      </div>
    )
  }
}

export default withStyles(styles)(NewCommentThreadPopover)
