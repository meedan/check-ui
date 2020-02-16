import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

function EntityDeleteModal(props) {
  const { onCancel, onConfirm, name, title } = props;
  return (
    <Dialog
      aria-describedby={`Confirm removal of all instances of ${name}`}
      aria-labelledby={title}
      maxWidth="xs"
      onClick={e => e.stopPropagation()}
      onClose={onCancel}
      open
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1">
            Do you wish to remove all instances of <strong>{name}</strong>? This
            can’t be undone.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="large" color="primary" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EntityDeleteModal;
