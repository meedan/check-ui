import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dropZone: {
    padding: theme.spacing(2),
    border: '2px dashed',
    minHeight: '100px',
  },
}));

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
}) {
  const classes = useStyles();
  const [error, setError] = React.useState({ message: null });
  const [file, setFile] = React.useState({});
  extensions = {
    label: extensions.join(', '),
    list: extensions,
  };

  // 1.0 MB max file size
  const maxFileSize = { bytes: 1048576, label: '1.0 MB' };

  const mutationPayload = {
    response_file_upload: JSON.stringify(metadataValue),
  };

  function handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.items.length > 1) {
      setError({ message: messages.errorTooManyFiles });
    } else {
      if (e.dataTransfer.items[0].kind === 'file') {
        const fileData = e.dataTransfer.items[0].getAsFile();
        const fileExtensionMatch = fileData.name?.match(/\.(\w*)$/);
        const fileExtension =
          fileExtensionMatch?.length > 1 ? fileExtensionMatch[1] : '';
        if (extensions.list.includes(fileExtension)) {
          if (fileData.size < maxFileSize.bytes) {
            setError({ message: null });
            setFile(fileData);
            setMetadataValue(fileData.name);
          } else {
            setError({ message: messages.errorFileTooBig });
          }
        } else {
          setError({ message: messages.errorFileType });
        }
      } else {
        setError({ message: messages.errorInvalidFile });
      }
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function RenderDrop() {
    return file.name ? (
      <Typography variant="body1">
        <p>{file.name}</p>
      </Typography>
    ) : (
      <Typography variant="body1">
        {messages.dropFile}
      </Typography>
    );
  }

  return (
    <>
      <FieldInformation/>
      {hasData && !isEditing ? (
        <>
          <Typography variant="body1" className={classes.value}>
            <a href={node.first_response?.file_data[0]}>
              {node.first_response_value}
            </a>
          </Typography>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={2}>
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
          <Box
            className={classes.dropZone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {error.message ? (
              <Typography variant="body1">{error.message}</Typography>
            ) : (
              <RenderDrop />
            )}
          </Box>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={2}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
              <SaveButton
                {...{ mutationPayload }}
                uploadables={{ 'file[]': file }}
                disabled={error.message !== null}
              />
            </Grid>
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
  messages: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MetadataFile;
