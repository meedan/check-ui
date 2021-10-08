import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Upload from '../upload/Upload';
import ClearButton from './ClearButton';

function MetadataFile({
  node,
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
  extensions,
  messages,
  fileSizeMax,
  disabled,
  required,
}) {
  const [error, setError] = React.useState({ message: null });
  const [file, setFile] = React.useState({});
  extensions = {
    label: extensions.join(', '),
    list: extensions,
  };

  const mutationPayload = {
    response_file_upload: JSON.stringify(metadataValue),
  };

  function cleanup() {
    setMetadataValue('');
    setFile({});
  }

  return (
    <>
      <FieldInformation />
      {hasData && !isEditing ? (
        <>
          <Upload
            disabled={disabled}
            fileUrl={node.first_response?.file_data[0]}
            fileName={node.first_response_value}
            errorMessage={error.message}
            {...{ extensions, messages, setMetadataValue, setError, setFile, fileSizeMax}}
          />
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
            <Grid item>
              <EditButton />
            </Grid>
            <Grid item>
              <DeleteButton />
            </Grid>
            <Grid item xs>
              <AnnotatorInformation />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Upload
            disabled={disabled}
            isEditing
            errorMessage={error.message}
            {...{ file, extensions, messages, setMetadataValue, setError, setFile, fileSizeMax }}
          />
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
              <SaveButton
                {...{ mutationPayload, required }}
                uploadables={{ 'file[]': file }}
                disabled={error.message !== null}
                empty={file.name === undefined}
              />
            </Grid>
            { disabled ? null :
              <Grid item>
                <ClearButton cleanup={cleanup} />
              </Grid>
            }
          </Grid>
        </>
      )}
    </>
  );
}

MetadataFile.propTypes = {
  node: PropTypes.object.isRequired,
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
  extensions: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  fileSizeMax: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

export default MetadataFile;
