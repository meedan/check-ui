import React from 'react';
import PropTypes from 'prop-types';
import { Typography, TextField, Grid } from '@material-ui/core';

function MetadataNumber({
  node,
  classes,
  EditButton,
  DeleteButton,
  CancelButton,
  SaveButton,
  AnnotatorInformation,
  FieldInformation,
  hasData,
  isEditing,
  metadataValue,
  setMetadataValue,
}) {
  const mutationPayload = {
    annotation_type: 'task_response_number',
    set_fields: `{"response_number":"${metadataValue}"}`,
  };

  function handleChange(e) {
    setMetadataValue(e.target.value);
  }

  function cleanup() {
    setMetadataValue('');
  }

  function isNumeric(value) {
    return !isNaN(+value) && isFinite(+value);
  }

  return (
    <>
      <FieldInformation/>
      {hasData && !isEditing ? (
        <>
          <Typography variant="body1" className={classes.value}>
            {node.first_response_value}
          </Typography>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={2}>
            <Grid item>
              <EditButton />
            </Grid>
            <Grid item>
              <DeleteButton onClick={cleanup} />
            </Grid>
            <Grid item xs>
              <AnnotatorInformation />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <TextField
            label="Answer here"
            fullWidth
            type="number"
            variant="outlined"
            value={metadataValue}
            onChange={handleChange}
          />
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={2}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
            <SaveButton
              {...{ mutationPayload }}
              disabled={!metadataValue || !isNumeric(metadataValue)}
            />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

MetadataNumber.propTypes = {
  node: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  EditButton: PropTypes.element.isRequired,
  DeleteButton: PropTypes.element.isRequired,
  CancelButton: PropTypes.element.isRequired,
  SaveButton: PropTypes.element.isRequired,
  AnnotatorInformation: PropTypes.element.isRequired,
  FieldInformation: PropTypes.element.isRequired,
  hasData: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  metadataValue: PropTypes.string.isRequired,
  setMetadataValue: PropTypes.func.isRequired,
};

export default MetadataNumber;
