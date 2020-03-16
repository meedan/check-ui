import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';

export default function DeleteModal(props) {
  const { entityName, entityType } = props;
  return (
    <Dialog
      aria-describedby={`Confirm removal of all instances of ${entityName}`}
      aria-labelledby={`Delete ${entityType}`}
      maxWidth="xs"
      onClick={e => e.stopPropagation()}
      onClose={props.onCancel}
      open>
      <DialogTitle>Delete {entityType}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1">
            Do you wish to remove all instances of <strong>{entityName}</strong>
            ? This can’t be undone.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button size="large" color="primary" onClick={props.onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteModal.PropTypes = {
  entityName: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
