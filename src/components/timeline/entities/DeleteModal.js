import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteModal({ entityName, entityType, ...props }) {
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
        <DialogContentText variant="body1">
          Do you wish to remove all instances of <strong>{entityName}</strong>?
          This can’t be undone.
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

DeleteModal.propTypes = {
  entityName: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
