import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ClearButton from './ClearButton';

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(2),
    width: '90%',
  },
  removeButton: {
    marginTop: '1rem',
    width: '10%',
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}));

function MetadataUrl({
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
  messages,
  disabled,
  required,
}) {
  const _classes = useStyles();
  const mutationPayload = {
    annotation_type: 'task_response_url',
    set_fields: `{"response_url":"${metadataValue}"}`,
  };
  let initialUrls;
  try {
    initialUrls = JSON.parse(node.first_response?.content)[0].value
  } catch {
    initialUrls = [{
      url: '',
      title: '',
    }];
  }
  const [urls, setUrls] = React.useState(initialUrls);

  function handleUrlChange(e, index) {
    const newUrls = [...urls];
    newUrls[index] = {
      url: e.target.value,
      title: urls[index].title,
    };
    setUrls(newUrls);
    setMetadataValue(newUrls);
  }

  function handleUrlBlur(e, index) {
    const newUrls = [...urls];
    let value = e.target.value;
    // if the entered value is not a URL, but it *is* a URL with "http://" prepended, then prepend the "http://"
    if (!isUrl(value) && isUrl(`http://${value}`)) {
      value = `http://${value}`;
      newUrls[index] = {
        url: value,
        title: urls[index].title,
      };
    }
    // if the entered value is not a url, and is invalid without a prepend, and it's not blank, put it in an error state to be rendered by the component
    else if (!isUrl(value) && urls[index].url !== '') {
      newUrls[index] = {
        url: value,
        title: urls[index].title,
        error: true,
      };
    }
    // otherwise it's a url, or it's blank, so remove any error state, we will either save this url or we'll interpret it as a blank/delete
    else {
      delete newUrls[index].error;
    }
    setUrls(newUrls);
  }

  function handleNameChange(e, index) {
    const newUrls = [...urls];
    newUrls[index] = {
      url: urls[index].url,
      title: e.target.value,
    };
    setUrls(newUrls);
    setMetadataValue(newUrls);
  }

  function addUrl() {
    const newUrls = [...urls];
    newUrls.push({
      url: '',
      title: '',
    });
    setUrls(newUrls);
    setMetadataValue(newUrls);
  }

  function removeUrl(index) {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
    setMetadataValue(newUrls);
  }

  function isEveryFieldEmpty() {
    return urls.filter(item => item.url !== '' || item.title !== '').length === 0;
  }

  function cleanup(index) {
    const newUrls = [...urls];
    newUrls[index] = {
      url: '',
      title: '',
    };
    setUrls(newUrls);
    setMetadataValue(newUrls);
  }

  // from https://stackoverflow.com/a/43467144/4869657
  function isUrl(string) {
		let url;
		try {
			url = new URL(string);
		} catch (_) {
			return false;  
		}
		return url.protocol === "http:" || url.protocol === "https:";
  }

  function getInvalidUrls() {
    const invalidUrls = urls.filter(item => !isUrl(item.url));
    return invalidUrls;
  }

  return (
    <>
      <FieldInformation />
      {hasData && !isEditing ? (
        <>
          <Typography variant="body1" className={classes.value}>
            <ul>
              { urls.map((item, index) => (
                <li key={item.url + index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title || item.url}</a>
                </li>
              ))}
            </ul>
          </Typography>
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
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
          { urls.map((item, index) => (
              <>
                <TextField
                  className={_classes.input}
                  label="URL"
                  fullWidth
                  type="url"
                  variant="outlined"
                  value={urls[index].url}
                  onChange={e => handleUrlChange(e, index)}
                  onBlur={e => handleUrlBlur(e, index)}
                  disabled={disabled}
                  error={urls[index].error}
                  helperText={urls[index].error ? messages.helperText : ''}
                />
                { index > 0 && !disabled ? (
                  <IconButton
                    className={_classes.removeButton}
                    aria-label="remove url"
                    onClick={() => removeUrl(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                ) : null }
                <TextField
                  className={_classes.input}
                  label="Link name"
                  fullWidth
                  type="url"
                  variant="outlined"
                  value={urls[index].title}
                  onChange={e => handleNameChange(e, index)}
                  disabled={disabled}
                />
                <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
                  { !disabled && urls.length === 1 ? ( 
                    <Grid item>
                      <ClearButton cleanup={() => cleanup(index)} />
                    </Grid>
                  ) : null }
                </Grid>
                {
                  urls.length > 0 && index < urls.length ? (
                    <Divider className={_classes.divider}/>
                  ) : null
                }
              </>
            ))
          }
          { urls.length < 5 ? (
            <Button
              variant="text"
              startIcon={<AddIcon />}
              onClick={addUrl}
              disabled={disabled}
            >
              Add another URL
            </Button>
          ) : null }
          <Grid container alignItems="flex-end" wrap="nowrap" spacing={0}>
            <Grid item>
              <CancelButton />
            </Grid>
            <Grid item>
              <SaveButton
                {...{ mutationPayload, required }}
                disabled={!metadataValue}
                empty={isEveryFieldEmpty()}
                anyInvalidUrls={!isEveryFieldEmpty() && getInvalidUrls().length > 0}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

MetadataUrl.defaultProps = {
  disabled: false,
};

MetadataUrl.propTypes = {
  node: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  EditButton: PropTypes.element.isRequired,
  DeleteButton: PropTypes.element.isRequired,
  CancelButton: PropTypes.element.isRequired,
  SaveButton: PropTypes.element.isRequired,
  AnnotatorInformation: PropTypes.element.isRequired,
  FieldInformation: PropTypes.element.isRequired,
  hasData: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  messages: PropTypes.object.isRequired,
  metadataValue: PropTypes.string.isRequired,
  setMetadataValue: PropTypes.func.isRequired,
};

export default MetadataUrl;
