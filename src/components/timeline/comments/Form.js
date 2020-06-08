import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function Form(props) {
  const { isEditing, value } = props;

  const [comment, setComment] = useState(value);
  const [saving, setSaving] = useState(false);

  const onChange = e => {
    setComment(e.target.value);
  };

  const onCancel = () => {
    setComment(value);
    props.onCancel();
  };

  const onSubmit = () => {
    setSaving(true);
    if (comment.length > 0) props.onSubmit(comment, () => setSaving(false));
  };

  const isCreating = !value || value.length === 0;

  return (
    <Grid container direction="column" spacing={1} wrap="nowrap">
      <Grid item>
        <TextField
          autoFocus
          defaultValue={comment}
          disabled={saving}
          fullWidth
          id="comment"
          inputProps={{
            autoComplete: 'off',
            style: { fontSize: '13px' },
            onKeyPress: e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
              }
            },
          }}
          onChange={onChange}
          placeholder={isCreating ? 'New comment' : 'Enter comment'}
          required
          type="text"
        />
      </Grid>
      <Grid item>
        <Grid container direction="row-reverse" justify="space-between" wrap="nowrap">
          <Grid item>
            <Button
              color="primary"
              disabled={!comment || comment.length === 0 || saving}
              onClick={onSubmit}
              size="small">
              {isCreating || isEditing ? 'Save' : 'Reply'}
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={saving} onClick={onCancel} size="small">
              {isCreating || isEditing ? 'Cancel' : 'Close'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Form.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

Form.defaultProps = {
  isEditing: null,
  value: null,
};
