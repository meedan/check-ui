import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dropZone: {
    padding: theme.spacing(2),
    border: '2px dashed',
    minHeight: '100px',
  },
}));

function Upload({
  file,
  fileName,
  fileUrl,
  isEditing,
  extensions,
  fileSizeMax,
  errorMessage,
  setMetadataValue,
  setError,
  setFile,
  messages,
}) {
  const classes = useStyles();

  function handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.items.length > 1) {
      setError({ message: messages.errorTooManyFiles });
    } else {
      if (e.dataTransfer.items[0].kind === 'file') {
        const fileData = e.dataTransfer.items[0].getAsFile();
        const fileExtensionMatch = fileData.name?.match(/\.(\w*)$/i);
        const fileExtension =
          fileExtensionMatch?.length > 1 ? fileExtensionMatch[1] : '';
        if (extensions.list.includes(fileExtension.toLowerCase())) {
          if (fileData.size < fileSizeMax) {
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
    return fileName ? (
      <Typography variant="body1">
        <p>{fileName}</p>
      </Typography>
    ) : (
      <Typography variant="body1">{messages.dropFile}</Typography>
    );
  }

  return (
    <>
      {isEditing && !file?.name ? (
        <Box
          className={classes.dropZone}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {errorMessage ? (
            <Typography variant="body1">{errorMessage}</Typography>
          ) : (
            <RenderDrop />
          )}
        </Box>
      ) : (
        <Typography variant="body1" className={classes.value}>
          <a href={fileUrl || '#'}>
            {fileName || file.name}
          </a>
        </Typography>
      )}
    </>
  );
}

Upload.propTypes = {
  file: PropTypes.object,
  fileUrl: PropTypes.string,
  fileName: PropTypes.string,
  fileSizeMax: PropTypes.number,
  errorMessage: PropTypes.string,
  extensions: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  setMetadataValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setFile: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
};

export default Upload;
