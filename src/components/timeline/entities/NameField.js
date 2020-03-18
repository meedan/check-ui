import PropTypes from 'prop-types';
import React from 'react';
import orderBy from 'lodash/orderBy';

import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    ...theme.typography.body2,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  adornmentIcon: {
    position: 'relative',
    top: `${theme.spacing(0.25) * -1}px`,
  },
}));

export default function NameField({ name, suggestions = [], type, ...props }) {
  const classes = useStyles();

  // order and flatten suggestions’ array
  const options = orderBy(suggestions, [`${type}instance_count`], ['desc']).map(
    o => o.name
  );

  return (
    <Autocomplete
      autoComplete
      blurOnSelect
      disableOpenOnFocus
      freeSolo
      id={`${type}-suggestions`}
      onChange={(e, str) => props.onSubmit(str)}
      options={options}
      renderInput={params => (
        <TextField
          {...params}
          autoFocus
          inputProps={{
            ...params.inputProps,
            onKeyPress: e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                props.onSubmit(e.target.value);
              }
            },
          }}
          placeholder={name}
          InputProps={{
            className: classes.inputRoot,
            ref: params.InputProps.ref,
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Cancel">
                  <IconButton
                    size="small"
                    onClick={props.onCancel}
                    className={classes.adornmentIcon}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={str => (
        <Typography component="span" display="block" noWrap variant="body2">
          {str}
        </Typography>
      )}
      size="small"
    />
  );
}

NameField.propTypes = {
  name: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
  type: PropTypes.string.isRequired,
};
