import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  grid: {
    width: '200px',
  },
}));

export default function CommentForm(props) {
  const classes = useStyles();
  const { isCreating, isEditing, value } = props;

  const [comment, setComment] = useState(value);

  const onCancel = () => {
    setComment(value);
    props.onCancel();
  };

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      wrap="nowrap"
      className={classes.Grid}>
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
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
          wrap="nowrap">
          <Grid item>
            <Button
              color="primary"
              disabled={!comment || comment.length === 0}
              onClick={() => props.onSubmit(comment)}
              size="small">
              {isEditing || isCreating ? 'Save' : 'Reply'}
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={onCancel} size="small">
              {isCreating || isCreating ? 'Cancel' : 'Close'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

CommentForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
