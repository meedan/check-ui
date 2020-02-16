import React, { useState } from 'react';
import { func } from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  Grid: {
    width: '200px',
  },
};

function CommentForm(props) {
  const { isCreating, isEditing, value } = props;

  const [comment, setComment] = useState(value);

  const onCancel = () => {
    setComment(value);
    props.onCancel();
  };

  return (
    <Grid container direction="column" spacing={1} wrap="nowrap" className={props.classes.Grid}>
      <Grid item>
        <TextField
          autoFocus
          defaultValue={comment}
          fullWidth
          id="comment"
          inputProps={{
            autoComplete: 'off',
            style: { fontSize: '13px' },
            onKeyPress: e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                return comment.length > 0 ? props.onSubmit(comment) : null;
              }
            },
          }}
          onChange={e => setComment(e.currentTarget.value)}
          placeholder={isEditing ? 'Enter comment' : 'New comment'}
          required
          type="text"
        />
      </Grid>

      <Grid item>
        <Grid container direction="row-reverse" justify="space-between" wrap="nowrap">
          <Grid item>
            <Button
              color="primary"
              disabled={!comment || comment.length === 0}
              mini
              onClick={() => props.onSubmit(comment)}
              size="small">
              {isEditing || isCreating ? 'Save' : 'Reply'}
            </Button>
          </Grid>
          <Grid item>
            <Button mini onClick={onCancel} size="small">
              {isCreating || isCreating ? 'Cancel' : 'Close'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(CommentForm);

CommentForm.propTypes = {
  onCancel: func.isRequired,
  onSubmit: func.isRequired,
};
